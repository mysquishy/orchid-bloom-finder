
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { 
  Ticket, 
  Search, 
  Filter, 
  Clock,
  User,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  user_id: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

const SupportTicketManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const { data: tickets, isLoading, refetch } = useQuery({
    queryKey: ['support-tickets', statusFilter, priorityFilter],
    queryFn: async () => {
      let query = supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (priorityFilter !== 'all') {
        query = query.eq('priority', priorityFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as SupportTicket[];
    },
    refetchInterval: 30000,
  });

  const filteredTickets = tickets?.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle2 className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    const { error } = await supabase
      .from('support_tickets')
      .update({ 
        status: newStatus,
        resolved_at: newStatus === 'resolved' ? new Date().toISOString() : null
      })
      .eq('id', ticketId);

    if (!error) {
      refetch();
    }
  };

  if (isLoading) return <LoadingSpinner text="Loading support tickets..." />;

  // Calculate metrics
  const totalTickets = tickets?.length || 0;
  const openTickets = tickets?.filter(t => t.status === 'open').length || 0;
  const urgentTickets = tickets?.filter(t => t.priority === 'urgent').length || 0;
  const avgResolutionTime = 2.3; // Mock data - would calculate from actual data

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold">{totalTickets}</p>
              </div>
              <Ticket className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-red-600">{openTickets}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-orange-600">{urgentTickets}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
                <p className="text-2xl font-bold text-green-600">{avgResolutionTime}d</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            Support Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets?.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{ticket.subject}</h3>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {ticket.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        User ID: {ticket.user_id.slice(0, 8)}...
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </div>
                      {ticket.tags.length > 0 && (
                        <div className="flex gap-1">
                          {ticket.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {ticket.status === 'open' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateTicketStatus(ticket.id, 'in_progress')}
                      >
                        Start Work
                      </Button>
                    )}
                    {ticket.status === 'in_progress' && (
                      <Button 
                        size="sm"
                        onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                      >
                        Resolve
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTickets?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Ticket className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No tickets found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTicketManager;
