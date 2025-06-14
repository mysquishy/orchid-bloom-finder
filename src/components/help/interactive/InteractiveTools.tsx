
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Calculator, FileText, Search, Download, Flower } from 'lucide-react';

const InteractiveTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('reminder');

  // Care Reminder Calculator
  const [orchidType, setOrchidType] = useState('phalaenopsis');
  const [environment, setEnvironment] = useState('indoor');
  const [careSchedule, setCareSchedule] = useState<any>(null);

  // Symptom Checker
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<any>(null);

  const generateCareSchedule = () => {
    const schedules = {
      phalaenopsis: {
        watering: 'Every 7-10 days',
        fertilizing: 'Every 2 weeks (diluted)',
        repotting: 'Every 1-2 years',
        humidity: '50-70%',
        temperature: '65-80°F',
        light: '12-14 hours indirect'
      },
      cattleya: {
        watering: 'Every 10-14 days',
        fertilizing: 'Weekly during growing season',
        repotting: 'Every 2-3 years',
        humidity: '50-80%',
        temperature: '60-85°F',
        light: '14-16 hours bright light'
      }
    };

    setCareSchedule(schedules[orchidType as keyof typeof schedules] || schedules.phalaenopsis);
  };

  const symptomOptions = [
    'Yellow leaves',
    'Brown leaf tips',
    'Wilting leaves',
    'No blooms',
    'Root rot',
    'White cottony spots',
    'Brown bumps on leaves',
    'Wrinkled leaves',
    'Dropping buds',
    'Slow growth'
  ];

  const runSymptomChecker = () => {
    const diagnoses = {
      'Yellow leaves': {
        likely: 'Natural aging or overwatering',
        action: 'Check watering schedule and root health',
        severity: 'medium'
      },
      'No blooms': {
        likely: 'Insufficient light or wrong temperature',
        action: 'Increase light and provide temperature differential',
        severity: 'low'
      },
      'Root rot': {
        likely: 'Overwatering and poor drainage',
        action: 'Immediate repotting and root trimming required',
        severity: 'high'
      }
    };

    const primarySymptom = symptoms[0];
    setDiagnosis(diagnoses[primarySymptom as keyof typeof diagnoses] || {
      likely: 'Multiple factors may be involved',
      action: 'Consult comprehensive troubleshooting guide',
      severity: 'medium'
    });
  };

  const tools = [
    {
      id: 'reminder',
      title: 'Care Reminder Calculator',
      description: 'Generate personalized care schedules based on your orchid type',
      icon: <Calculator className="w-6 h-6 text-blue-500" />
    },
    {
      id: 'symptoms',
      title: 'Symptom Checker',
      description: 'Diagnose problems using our interactive flowchart tool',
      icon: <Search className="w-6 h-6 text-green-500" />
    },
    {
      id: 'schedule',
      title: 'Care Schedule Generator',
      description: 'Create printable care calendars for your specific orchids',
      icon: <Calendar className="w-6 h-6 text-purple-500" />
    },
    {
      id: 'cheatsheet',
      title: 'Printable Care Sheets',
      description: 'Download quick reference guides for different orchid types',
      icon: <FileText className="w-6 h-6 text-orange-500" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Interactive Tools</h1>
        <p className="text-xl text-gray-600">
          Smart tools to help you provide the best care for your orchids
        </p>
      </div>

      <Tabs value={selectedTool} onValueChange={setSelectedTool} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {tools.map((tool) => (
            <TabsTrigger key={tool.id} value={tool.id} className="flex items-center gap-2">
              {tool.icon}
              <span className="hidden md:inline">{tool.title.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Care Reminder Calculator */}
        <TabsContent value="reminder">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-blue-500" />
                Care Reminder Calculator
              </CardTitle>
              <p className="text-gray-600">
                Get personalized care schedules based on your orchid type and environment
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orchid Type
                  </label>
                  <select
                    value={orchidType}
                    onChange={(e) => setOrchidType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="phalaenopsis">Phalaenopsis (Moth Orchid)</option>
                    <option value="cattleya">Cattleya (Corsage Orchid)</option>
                    <option value="dendrobium">Dendrobium</option>
                    <option value="oncidium">Oncidium (Dancing Lady)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Environment
                  </label>
                  <select
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="indoor">Indoor (Home/Office)</option>
                    <option value="greenhouse">Greenhouse</option>
                    <option value="outdoor">Outdoor (Seasonal)</option>
                  </select>
                </div>
              </div>

              <Button onClick={generateCareSchedule} className="w-full bg-blue-600 hover:bg-blue-700">
                Generate Care Schedule
              </Button>

              {careSchedule && (
                <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Your Personalized Care Schedule
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(careSchedule).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium text-blue-800 capitalize">{key}:</span>
                        <span className="text-blue-700">{value as string}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download as PDF
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Symptom Checker */}
        <TabsContent value="symptoms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Search className="w-6 h-6 text-green-500" />
                Symptom Checker
              </CardTitle>
              <p className="text-gray-600">
                Select symptoms to get an instant diagnosis and treatment recommendations
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select all symptoms you observe:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {symptomOptions.map((symptom) => (
                    <label key={symptom} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={symptoms.includes(symptom)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSymptoms([...symptoms, symptom]);
                          } else {
                            setSymptoms(symptoms.filter(s => s !== symptom));
                          }
                        }}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{symptom}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button 
                onClick={runSymptomChecker} 
                disabled={symptoms.length === 0}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Analyze Symptoms
              </Button>

              {diagnosis && (
                <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">
                    Diagnosis Results
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-green-800">Likely Cause:</span>
                      <p className="text-green-700">{diagnosis.likely}</p>
                    </div>
                    <div>
                      <span className="font-medium text-green-800">Recommended Action:</span>
                      <p className="text-green-700">{diagnosis.action}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-800">Severity:</span>
                      <Badge className={
                        diagnosis.severity === 'high' ? 'bg-red-100 text-red-800' :
                        diagnosis.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {diagnosis.severity}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Care Schedule Generator */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-purple-500" />
                Care Schedule Generator
              </CardTitle>
              <p className="text-gray-600">
                Create customized care calendars for your orchid collection
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-gray-600">
                  Interactive calendar generator is currently in development
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Printable Care Sheets */}
        <TabsContent value="cheatsheet">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-orange-500" />
                Printable Care Sheets
              </CardTitle>
              <p className="text-gray-600">
                Download quick reference guides for different orchid types
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Phalaenopsis', 'Cattleya', 'Dendrobium', 'Oncidium', 'Vanda', 'Paphiopedilum'].map((type) => (
                  <Card key={type} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Flower className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900 mb-2">{type} Care Sheet</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Complete care guide with watering, light, and temperature requirements
                      </p>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveTools;
