
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mic, 
  Smartphone, 
  Volume2, 
  Bell, 
  Settings,
  Play,
  MessageSquare,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  isActive: boolean;
}

interface SmartHomeIntegrationProps {
  integrations: Integration[];
  onToggle: (id: string) => void;
}

interface VoiceCommand {
  phrase: string;
  action: string;
  response: string;
  enabled: boolean;
}

export const SmartHomeIntegration: React.FC<SmartHomeIntegrationProps> = ({
  integrations,
  onToggle
}) => {
  const [alexaAccountId, setAlexaAccountId] = useState('');
  const [googleHomeLinked, setGoogleHomeLinked] = useState(false);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminderFrequency, setReminderFrequency] = useState('daily');
  const [voiceCommands, setVoiceCommands] = useState<VoiceCommand[]>([
    {
      phrase: "Alexa, ask OrchidAI about my plants",
      action: "Get plant status summary",
      response: "You have 3 plants that need watering today",
      enabled: true
    },
    {
      phrase: "Alexa, tell OrchidAI I watered my orchid",
      action: "Log watering activity",
      response: "I've recorded that you watered your orchid",
      enabled: true
    },
    {
      phrase: "Hey Google, ask OrchidAI for care tips",
      action: "Get care recommendations",
      response: "Here are today's care recommendations for your orchids",
      enabled: true
    },
    {
      phrase: "Alexa, ask OrchidAI when to repot",
      action: "Check repotting schedule",
      response: "Your Purple Phalaenopsis needs repotting in 2 weeks",
      enabled: false
    }
  ]);

  const { toast } = useToast();

  const linkAlexaAccount = async () => {
    if (!alexaAccountId.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Alexa account ID",
        variant: "destructive"
      });
      return;
    }

    // Simulate linking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onToggle('alexa');
    toast({
      title: "Alexa Connected",
      description: "Your Alexa account has been linked successfully",
    });
  };

  const linkGoogleHome = async () => {
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setGoogleHomeLinked(true);
    onToggle('google-home');
    toast({
      title: "Google Home Connected",
      description: "Your Google Home has been linked successfully",
    });
  };

  const testVoiceCommand = (command: VoiceCommand) => {
    toast({
      title: "Voice Command Test",
      description: `Response: "${command.response}"`,
    });
  };

  const toggleCommand = (index: number) => {
    setVoiceCommands(prev => prev.map((cmd, i) => 
      i === index ? { ...cmd, enabled: !cmd.enabled } : cmd
    ));
  };

  const alexa = integrations.find(i => i.id === 'alexa');
  const googleHome = integrations.find(i => i.id === 'google-home');

  return (
    <div className="space-y-6">
      {/* Amazon Alexa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Amazon Alexa Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${alexa?.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
              <div>
                <p className="font-medium">Alexa Skill Status</p>
                <p className="text-sm text-gray-600">
                  {alexa?.isActive ? 'Connected and active' : 'Not connected'}
                </p>
              </div>
            </div>
            <Badge variant={alexa?.isActive ? "default" : "outline"}>
              {alexa?.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {!alexa?.isActive ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="alexaId">Alexa Account ID</Label>
                <Input
                  id="alexaId"
                  value={alexaAccountId}
                  onChange={(e) => setAlexaAccountId(e.target.value)}
                  placeholder="Enter your Alexa account ID"
                />
              </div>
              <Button onClick={linkAlexaAccount} className="w-full">
                Link Alexa Account
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Alexa Skill Enabled</h4>
                <p className="text-sm text-green-700">
                  Say "Alexa, open OrchidAI" to start using voice commands for plant care.
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => onToggle('alexa')}
                className="w-full"
              >
                Disconnect Alexa
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Google Home */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Google Home Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${googleHome?.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
              <div>
                <p className="font-medium">Google Assistant Status</p>
                <p className="text-sm text-gray-600">
                  {googleHome?.isActive ? 'Connected and active' : 'Not connected'}
                </p>
              </div>
            </div>
            <Badge variant={googleHome?.isActive ? "default" : "outline"}>
              {googleHome?.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {!googleHome?.isActive ? (
            <Button onClick={linkGoogleHome} className="w-full">
              Connect Google Home
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Google Assistant Connected</h4>
                <p className="text-sm text-blue-700">
                  Say "Hey Google, talk to OrchidAI" to access your plant care assistant.
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => onToggle('google-home')}
                className="w-full"
              >
                Disconnect Google Home
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Commands */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Voice Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {voiceCommands.map((command, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-sm">{command.phrase}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={command.enabled}
                      onCheckedChange={() => toggleCommand(index)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testVoiceCommand(command)}
                      disabled={!command.enabled}
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Action: {command.action}</p>
                <p className="text-sm text-blue-600">Response: "{command.response}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reminder Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Smart Reminder Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reminderTime">Daily Reminder Time</Label>
              <Input
                id="reminderTime"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="frequency">Reminder Frequency</Label>
              <Select value={reminderFrequency} onValueChange={setReminderFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Reminder Preview</h4>
            <p className="text-sm text-gray-600">
              "Good morning! You have 2 plants that need watering today: Purple Phalaenopsis and White Dendrobium."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
