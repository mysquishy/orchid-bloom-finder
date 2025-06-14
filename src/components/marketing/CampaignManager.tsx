import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Mail, 
  Users, 
  Calendar, 
  BarChart3, 
  Play, 
  Pause, 
  Edit, 
  Trash2,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { marketingAnalytics, MarketingCampaign } from '@/utils/marketingAnalytics';
import { useToast } from '@/hooks/use-toast';

const CampaignManager: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    campaignType: 'email' as MarketingCampaign['campaignType'],
    content: {
      subject: '',
      body: '',
      cta: ''
    },
    targetAudience: {
      segments: [] as string[]
    }
  });

  useEffect(() => {
    if (user) {
      loadCampaigns();
    }
  }, [user]);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const campaignData = await marketingAnalytics.getCampaigns();
      setCampaigns(campaignData);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name.trim()) {
      toast({
        title: "Error",
        description: "Campaign name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      const campaignId = await marketingAnalytics.createCampaign({
        ...newCampaign,
        status: 'draft',
        metrics: { sent: 0, opened: 0, clicked: 0, converted: 0 },
        createdBy: user!.id
      });

      if (campaignId) {
        toast({
          title: "Success",
          description: "Campaign created successfully",
        });
        setCreateDialogOpen(false);
        setNewCampaign({
          name: '',
          campaignType: 'email',
          content: { subject: '', body: '', cta: '' },
          targetAudience: { segments: [] }
        });
        loadCampaigns();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: MarketingCampaign['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCampaignTypeIcon = (type: MarketingCampaign['campaignType']) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      case 'content': return <BarChart3 className="w-4 h-4" />;
      case 'paid': return <Users className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaign Manager</h2>
          <p className="text-gray-600">Create and manage marketing campaigns</p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name"
                />
              </div>

              <div>
                <Label htmlFor="campaignType">Campaign Type</Label>
                <Select 
                  value={newCampaign.campaignType} 
                  onValueChange={(value) => setNewCampaign(prev => ({ 
                    ...prev, 
                    campaignType: value as MarketingCampaign['campaignType'] 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Marketing</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="content">Content Marketing</SelectItem>
                    <SelectItem value="paid">Paid Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newCampaign.campaignType === 'email' && (
                <>
                  <div>
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input
                      id="subject"
                      value={newCampaign.content.subject}
                      onChange={(e) => setNewCampaign(prev => ({
                        ...prev,
                        content: { ...prev.content, subject: e.target.value }
                      }))}
                      placeholder="Enter email subject"
                    />
                  </div>

                  <div>
                    <Label htmlFor="body">Email Body</Label>
                    <Textarea
                      id="body"
                      value={newCampaign.content.body}
                      onChange={(e) => setNewCampaign(prev => ({
                        ...prev,
                        content: { ...prev.content, body: e.target.value }
                      }))}
                      placeholder="Enter email content"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cta">Call to Action</Label>
                    <Input
                      id="cta"
                      value={newCampaign.content.cta}
                      onChange={(e) => setNewCampaign(prev => ({
                        ...prev,
                        content: { ...prev.content, cta: e.target.value }
                      }))}
                      placeholder="Enter call to action"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>
                  Create Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{campaigns.length}</p>
              <p className="text-sm text-gray-600">Total Campaigns</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active Campaigns</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {campaigns.filter(c => c.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">24.5%</p>
              <p className="text-sm text-gray-600">Avg. Open Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getCampaignTypeIcon(campaign.campaignType)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{campaign.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      <span className="text-sm text-gray-500 capitalize">
                        {campaign.campaignType}
                      </span>
                      {campaign.scheduledAt && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {campaign.scheduledAt.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Campaign Metrics */}
                  <div className="text-right text-sm">
                    <p className="font-medium">{campaign.metrics.sent || 0} sent</p>
                    <p className="text-gray-500">
                      {((campaign.metrics.opened || 0) / Math.max(campaign.metrics.sent || 1, 1) * 100).toFixed(1)}% opened
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {campaign.status === 'active' ? (
                      <Button variant="outline" size="sm">
                        <Pause className="w-3 h-3 mr-1" />
                        Pause
                      </Button>
                    ) : campaign.status === 'paused' ? (
                      <Button variant="outline" size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Resume
                      </Button>
                    ) : null}
                    
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Campaign Content Preview */}
              {campaign.content.subject && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Subject: {campaign.content.subject}</p>
                  {campaign.content.body && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{campaign.content.body}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {campaigns.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-600 mb-4">Create your first marketing campaign to start engaging with users</p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Campaign
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CampaignManager;
