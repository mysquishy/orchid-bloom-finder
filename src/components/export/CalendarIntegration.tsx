
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Download, 
  Smartphone, 
  Globe, 
  Clock,
  Droplets,
  Flower,
  Scissors
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface CalendarIntegrationProps {
  onProgress: (progress: number) => void;
}

const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({ onProgress }) => {
  const { user } = useAuth();
  const [calendarFormat, setCalendarFormat] = useState<'ics' | 'google' | 'outlook'>('ics');
  const [reminderTypes, setReminderTypes] = useState({
    watering: true,
    fertilizing: true,
    repotting: false,
    blooming: true,
    general: false
  });
  const [reminderFrequency, setReminderFrequency] = useState<'daily' | 'weekly' | 'custom'>('weekly');
  const [advanceNotice, setAdvanceNotice] = useState<'1h' | '1d' | '3d' | '1w'>('1d');
  const [generating, setGenerating] = useState(false);

  // Mock care schedule data
  const mockCareEvents = [
    {
      id: '1',
      plant: 'Purple Phalaenopsis',
      type: 'watering',
      date: new Date(Date.now() + 86400000 * 2),
      description: 'Weekly watering schedule'
    },
    {
      id: '2',
      plant: 'White Dendrobium',
      type: 'fertilizing',
      date: new Date(Date.now() + 86400000 * 7),
      description: 'Monthly fertilizing'
    },
    {
      id: '3',
      plant: 'Purple Phalaenopsis',
      type: 'blooming',
      date: new Date(Date.now() + 86400000 * 14),
      description: 'Expected bloom period'
    }
  ];

  const handleReminderToggle = (type: keyof typeof reminderTypes) => {
    setReminderTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const generateCalendarFile = async () => {
    try {
      setGenerating(true);
      onProgress(0);

      // Simulate calendar generation
      const steps = [
        'Processing care schedules...',
        'Creating calendar events...',
        'Setting up reminders...',
        'Generating calendar file...'
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        onProgress(((i + 1) / steps.length) * 100);
      }

      // Generate ICS file content
      const icsContent = generateICSContent();
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orchid-care-schedule.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onProgress(100);
    } catch (error) {
      console.error('Calendar generation error:', error);
    } finally {
      setGenerating(false);
      setTimeout(() => onProgress(0), 2000);
    }
  };

  const generateICSContent = () => {
    const filteredEvents = mockCareEvents.filter(event => 
      reminderTypes[event.type as keyof typeof reminderTypes]
    );

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//OrchidAI//Plant Care Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    filteredEvents.forEach((event, index) => {
      const startDate = event.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const uid = `orchid-care-${event.id}-${Date.now()}@orchidai.com`;
      
      icsContent.push(
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTART:${startDate}`,
        `DTEND:${startDate}`,
        `SUMMARY:${event.plant} - ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}`,
        `DESCRIPTION:${event.description}`,
        `CATEGORIES:Plant Care,OrchidAI`,
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');
    return icsContent.join('\r\n');
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'watering': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'fertilizing': return <Flower className="w-4 h-4 text-green-500" />;
      case 'repotting': return <Scissors className="w-4 h-4 text-orange-500" />;
      case 'blooming': return <Flower className="w-4 h-4 text-pink-500" />;
      default: return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Format Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['ics', 'google', 'outlook'] as const).map((format) => (
              <div
                key={format}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  calendarFormat === format 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setCalendarFormat(format)}
              >
                <div className="flex items-center gap-3">
                  {format === 'ics' && <Calendar className="w-6 h-6 text-blue-600" />}
                  {format === 'google' && <Globe className="w-6 h-6 text-red-600" />}
                  {format === 'outlook' && <Smartphone className="w-6 h-6 text-blue-600" />}
                  <div>
                    <div className="font-medium">
                      {format === 'ics' && 'Universal ICS'}
                      {format === 'google' && 'Google Calendar'}
                      {format === 'outlook' && 'Outlook Calendar'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format === 'ics' && 'Works with all calendar apps'}
                      {format === 'google' && 'Direct Google integration'}
                      {format === 'outlook' && 'Microsoft Outlook/365'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reminder Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reminder Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(reminderTypes).map(([type, enabled]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={type}
                    checked={enabled}
                    onCheckedChange={() => handleReminderToggle(type as keyof typeof reminderTypes)}
                  />
                  {getIconForType(type)}
                  <label htmlFor={type} className="text-sm font-medium capitalize cursor-pointer">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
                <Badge variant={enabled ? "default" : "outline"}>
                  {enabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Reminder Frequency</label>
              <Select value={reminderFrequency} onValueChange={(value: any) => setReminderFrequency(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Check</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="custom">Custom Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Advance Notice</label>
              <Select value={advanceNotice} onValueChange={(value: any) => setAdvanceNotice(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select notice time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour Before</SelectItem>
                  <SelectItem value="1d">1 Day Before</SelectItem>
                  <SelectItem value="3d">3 Days Before</SelectItem>
                  <SelectItem value="1w">1 Week Before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Care Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockCareEvents
              .filter(event => reminderTypes[event.type as keyof typeof reminderTypes])
              .map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getIconForType(event.type)}
                    <div>
                      <div className="font-medium">{event.plant}</div>
                      <div className="text-sm text-gray-600">{event.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {event.date.toLocaleDateString()}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Export Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(reminderTypes).filter(Boolean).length}
              </div>
              <div className="text-sm text-gray-600">Event Types</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {mockCareEvents.filter(event => 
                  reminderTypes[event.type as keyof typeof reminderTypes]
                ).length}
              </div>
              <div className="text-sm text-gray-600">Events</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 uppercase">
                {calendarFormat}
              </div>
              <div className="text-sm text-gray-600">Format</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                <Clock className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-sm text-gray-600">{advanceNotice} Notice</div>
            </div>
          </div>

          <Button 
            onClick={generateCalendarFile}
            disabled={generating || !Object.values(reminderTypes).some(Boolean)}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {generating ? 'Generating Calendar...' : 'Export Care Calendar'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarIntegration;
