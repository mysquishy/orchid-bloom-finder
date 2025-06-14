
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, DollarSign, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { format, addDays, startOfDay } from 'date-fns';

interface ConsultationBookingProps {
  expertId: string;
  onClose?: () => void;
}

const ConsultationBooking: React.FC<ConsultationBookingProps> = ({ expertId, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<string>();
  const [consultationType, setConsultationType] = useState<string>('health_assessment');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: expert } = useQuery({
    queryKey: ['expert', expertId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .eq('id', expertId)
        .single();
      if (error) throw error;
      return data;
    }
  });

  const { data: availableSlots = [] } = useQuery({
    queryKey: ['available-slots', expertId, selectedDate],
    queryFn: async () => {
      if (!selectedDate) return [];
      
      const dateStart = format(selectedDate, 'yyyy-MM-dd');
      const dateEnd = format(selectedDate, 'yyyy-MM-dd');
      
      const { data, error } = await supabase.rpc('get_available_slots', {
        expert_id_param: expertId,
        date_start: dateStart,
        date_end: dateEnd
      });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedDate
  });

  const bookConsultationMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const { data, error } = await supabase
        .from('consultations')
        .insert([{
          user_id: user?.id,
          expert_id: expertId,
          title,
          description,
          consultation_type: consultationType,
          scheduled_at: bookingData.scheduledAt,
          price_cents: expert?.hourly_rate_cents || 0,
          duration_minutes: 30
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Consultation Booked!",
        description: "Your consultation has been successfully scheduled.",
      });
      queryClient.invalidateQueries({ queryKey: ['consultations'] });
      onClose?.();
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your consultation. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot || !title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a time slot.",
        variant: "destructive",
      });
      return;
    }

    const scheduledAt = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedSlot}`);
    bookConsultationMutation.mutate({ scheduledAt });
  };

  const consultationTypes = [
    { value: 'identification', label: 'Plant Identification', description: 'Help identifying your orchid species' },
    { value: 'health_assessment', label: 'Health Assessment', description: 'Diagnose plant health issues' },
    { value: 'care_plan', label: 'Care Plan', description: 'Personalized care recommendations' },
    { value: 'collection_review', label: 'Collection Review', description: 'Overall collection assessment' }
  ];

  if (!expert) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Book Consultation with {expert.name}
          </CardTitle>
          <p className="text-gray-600">{expert.title}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Expert Info */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium">{expert.name}</p>
              <p className="text-sm text-gray-600">{expert.years_experience} years experience</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <DollarSign className="w-4 h-4" />
                {(expert.hourly_rate_cents / 100).toFixed(0)}/hour
              </div>
              <p className="text-sm text-gray-600">30-minute session</p>
            </div>
          </div>

          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Type *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {consultationTypes.map((type) => (
                <label
                  key={type.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    consultationType === type.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="consultationType"
                    value={type.value}
                    checked={consultationType === type.value}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className="sr-only"
                  />
                  <div className="font-medium">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Title *
            </label>
            <Input
              placeholder="Brief title for your consultation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              placeholder="Describe your orchid concerns, questions, or what you'd like to discuss..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date *
            </label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < startOfDay(new Date()) || date > addDays(new Date(), 30)}
              className="rounded-md border"
            />
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Time Slots *
              </label>
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {availableSlots.map((slot) => {
                    const time = new Date(slot.slot_datetime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    
                    return (
                      <Button
                        key={slot.slot_datetime}
                        variant={selectedSlot === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSlot(time)}
                        className="justify-center"
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No available slots for this date.</p>
              )}
            </div>
          )}

          {/* Booking Summary */}
          {selectedDate && selectedSlot && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Booking Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>30 minutes</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-1">
                  <span>Total:</span>
                  <span>${((expert.hourly_rate_cents / 100) * 0.5).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedSlot || !title.trim() || bookConsultationMutation.isPending}
              className="flex-1"
            >
              {bookConsultationMutation.isPending ? 'Booking...' : 'Book Consultation'}
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationBooking;
