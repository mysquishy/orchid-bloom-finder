
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, TrendingUp, Camera, Droplets } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PlantReportGeneratorProps {
  onProgress: (progress: number) => void;
}

const PlantReportGenerator: React.FC<PlantReportGeneratorProps> = ({ onProgress }) => {
  const { user } = useAuth();
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);
  const [reportSections, setReportSections] = useState({
    overview: true,
    careHistory: true,
    healthAnalytics: true,
    photos: true,
    recommendations: true,
    bloomHistory: false,
    growthData: false
  });
  const [reportType, setReportType] = useState<'individual' | 'collection' | 'summary'>('collection');
  const [dateRange, setDateRange] = useState<'month' | 'quarter' | 'year' | 'all'>('quarter');
  const [generating, setGenerating] = useState(false);

  const { data: plants = [] } = useQuery({
    queryKey: ['user-plants-for-export', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_orchid_collection')
        .select(`
          *,
          orchid_species:orchid_species_id (
            scientific_name,
            common_name,
            care_difficulty
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const handlePlantSelection = (plantId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlants([...selectedPlants, plantId]);
    } else {
      setSelectedPlants(selectedPlants.filter(id => id !== plantId));
    }
  };

  const handleSectionToggle = (section: keyof typeof reportSections) => {
    setReportSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const generateReport = async () => {
    try {
      setGenerating(true);
      onProgress(0);

      // Simulate report generation progress
      const steps = [
        'Collecting plant data...',
        'Analyzing care history...',
        'Generating health analytics...',
        'Processing photos...',
        'Creating recommendations...',
        'Finalizing PDF...'
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        onProgress(((i + 1) / steps.length) * 100);
      }

      // Generate PDF report
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Title page
      pdf.setFontSize(24);
      pdf.text('OrchidAI Plant Care Report', pageWidth / 2, 30, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 50, { align: 'center' });
      pdf.text(`Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`, pageWidth / 2, 65, { align: 'center' });
      pdf.text(`Date Range: ${dateRange.charAt(0).toUpperCase() + dateRange.slice(1)}`, pageWidth / 2, 80, { align: 'center' });

      let yPosition = 120;

      // Plant collection overview
      if (reportSections.overview) {
        pdf.setFontSize(16);
        pdf.text('Collection Overview', 20, yPosition);
        yPosition += 20;

        pdf.setFontSize(12);
        pdf.text(`Total Plants: ${plants.length}`, 30, yPosition);
        yPosition += 15;
        pdf.text(`Selected for Report: ${selectedPlants.length || plants.length}`, 30, yPosition);
        yPosition += 15;

        const difficultyCount = plants.reduce((acc, plant) => {
          const difficulty = plant.orchid_species?.care_difficulty || 'unknown';
          acc[difficulty] = (acc[difficulty] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        Object.entries(difficultyCount).forEach(([difficulty, count]) => {
          pdf.text(`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}: ${count}`, 30, yPosition);
          yPosition += 15;
        });

        yPosition += 20;
      }

      // Individual plant sections
      const plantsToReport = selectedPlants.length > 0 
        ? plants.filter(plant => selectedPlants.includes(plant.id))
        : plants;

      plantsToReport.forEach((plant, index) => {
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = 30;
        }

        pdf.setFontSize(14);
        pdf.text(`${plant.orchid_species?.common_name || 'Unknown'} (${plant.orchid_species?.scientific_name || 'Unknown'})`, 20, yPosition);
        yPosition += 20;

        pdf.setFontSize(10);
        if (plant.care_notes) {
          pdf.text(`Care Notes: ${plant.care_notes}`, 30, yPosition);
          yPosition += 15;
        }
        
        if (plant.current_bloom_status) {
          pdf.text(`Bloom Status: ${plant.current_bloom_status}`, 30, yPosition);
          yPosition += 15;
        }

        if (plant.last_watered) {
          pdf.text(`Last Watered: ${new Date(plant.last_watered).toLocaleDateString()}`, 30, yPosition);
          yPosition += 15;
        }

        yPosition += 20;
      });

      // Save PDF
      const fileName = `orchid-care-report-${reportType}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      onProgress(100);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setGenerating(false);
      setTimeout(() => onProgress(0), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual Plant Reports</SelectItem>
                <SelectItem value="collection">Collection Summary</SelectItem>
                <SelectItem value="summary">Executive Summary</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={generateReport} 
              disabled={generating}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              {generating ? 'Generating...' : 'Generate Report'}
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Report Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Report Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(reportSections).map(([section, enabled]) => (
              <div key={section} className="flex items-center space-x-2">
                <Checkbox
                  id={section}
                  checked={enabled}
                  onCheckedChange={() => handleSectionToggle(section as keyof typeof reportSections)}
                />
                <label htmlFor={section} className="text-sm font-medium capitalize cursor-pointer">
                  {section.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plant Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Plants (Optional)</CardTitle>
          <p className="text-sm text-gray-600">Leave empty to include all plants</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plants.map((plant) => (
              <div key={plant.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={plant.id}
                  checked={selectedPlants.includes(plant.id)}
                  onCheckedChange={(checked) => handlePlantSelection(plant.id, checked as boolean)}
                />
                <div className="flex-1">
                  <label htmlFor={plant.id} className="text-sm font-medium cursor-pointer">
                    {plant.orchid_species?.common_name || 'Unknown Species'}
                  </label>
                  <p className="text-xs text-gray-500">
                    {plant.orchid_species?.scientific_name}
                  </p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {plant.orchid_species?.care_difficulty || 'unknown'}
                    </Badge>
                    {plant.current_bloom_status && (
                      <Badge variant="outline" className="text-xs">
                        {plant.current_bloom_status}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantReportGenerator;
