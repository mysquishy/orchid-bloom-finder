
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExpertDirectory from '@/components/experts/ExpertDirectory';
import ExpertCourses from '@/components/experts/ExpertCourses';
import PremiumSupport from '@/components/experts/PremiumSupport';
import SEOHead from '@/components/SEOHead';

const ExpertConsultations: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Expert Consultations - Professional Orchid Care Advice"
        description="Get personalized advice from certified orchid experts. Book consultations, take expert courses, and access premium support for your orchid care needs."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="experts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="experts">Expert Directory</TabsTrigger>
              <TabsTrigger value="courses">Courses & Workshops</TabsTrigger>
              <TabsTrigger value="support">Premium Support</TabsTrigger>
            </TabsList>

            <TabsContent value="experts">
              <ExpertDirectory />
            </TabsContent>

            <TabsContent value="courses">
              <ExpertCourses />
            </TabsContent>

            <TabsContent value="support">
              <PremiumSupport />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ExpertConsultations;
