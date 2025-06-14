
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommunityFeed from '@/components/community/CommunityFeed';
import UserProfiles from '@/components/community/UserProfiles';
import DiscussionForums from '@/components/community/DiscussionForums';
import PlantTrading from '@/components/community/PlantTrading';
import CommunityEvents from '@/components/community/CommunityEvents';
import ChallengeCenter from '@/components/community/ChallengeCenter';
import { Users, MessageSquare, Repeat, Calendar, Trophy, User } from 'lucide-react';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            OrchidAI Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow orchid enthusiasts, share your passion, and grow together
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="profiles" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profiles
            </TabsTrigger>
            <TabsTrigger value="forums" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Forums
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center gap-2">
              <Repeat className="w-4 h-4" />
              Trading
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Challenges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="mt-6">
            <CommunityFeed />
          </TabsContent>

          <TabsContent value="profiles" className="mt-6">
            <UserProfiles />
          </TabsContent>

          <TabsContent value="forums" className="mt-6">
            <DiscussionForums />
          </TabsContent>

          <TabsContent value="trading" className="mt-6">
            <PlantTrading />
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <CommunityEvents />
          </TabsContent>

          <TabsContent value="challenges" className="mt-6">
            <ChallengeCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
