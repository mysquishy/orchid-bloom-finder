
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Link,
  Users,
  Award,
  Calculator,
  Store,
  MessageCircle,
  TrendingUp,
  Mail,
  ExternalLink
} from 'lucide-react';

interface LinkOpportunity {
  id: string;
  website: string;
  domain: string;
  domainAuthority: number;
  linkType: 'resource' | 'guest_post' | 'tool' | 'interview' | 'partnership';
  status: 'prospecting' | 'outreach' | 'negotiating' | 'acquired' | 'rejected';
  estimatedValue: number;
  contactEmail?: string;
}

interface ToolResource {
  id: string;
  name: string;
  type: 'calculator' | 'checklist' | 'guide' | 'assessment';
  backlinks: number;
  monthlyViews: number;
  linkValue: number;
  isLive: boolean;
}

interface PartnershipOpportunity {
  id: string;
  partner: string;
  type: 'plant_store' | 'nursery' | 'blog' | 'community' | 'expert';
  audience: number;
  alignment: number;
  status: 'contacted' | 'interested' | 'active' | 'declined';
  expectedLinks: number;
}

interface ExpertInterview {
  id: string;
  expert: string;
  expertise: string;
  credibility: number;
  scheduledDate?: string;
  status: 'planned' | 'scheduled' | 'completed' | 'published';
  expectedBacklinks: number;
}

const LinkBuildingStrategy: React.FC = () => {
  const [linkOpportunities] = useState<LinkOpportunity[]>([
    {
      id: '1',
      website: 'Gardening Central',
      domain: 'gardeningcentral.com',
      domainAuthority: 68,
      linkType: 'resource',
      status: 'outreach',
      estimatedValue: 8.5,
      contactEmail: 'editor@gardeningcentral.com'
    },
    {
      id: '2',
      website: 'Plant Parent Hub',
      domain: 'plantparenthub.com',
      domainAuthority: 45,
      linkType: 'guest_post',
      status: 'negotiating',
      estimatedValue: 6.2
    },
    {
      id: '3',
      website: 'Orchid Society Network',
      domain: 'orchidsociety.org',
      domainAuthority: 72,
      linkType: 'partnership',
      status: 'acquired',
      estimatedValue: 9.8
    }
  ]);

  const [toolResources] = useState<ToolResource[]>([
    {
      id: '1',
      name: 'Orchid Watering Calculator',
      type: 'calculator',
      backlinks: 45,
      monthlyViews: 2340,
      linkValue: 7.8,
      isLive: true
    },
    {
      id: '2',
      name: 'Plant Health Assessment Tool',
      type: 'assessment',
      backlinks: 23,
      monthlyViews: 1560,
      linkValue: 6.4,
      isLive: true
    },
    {
      id: '3',
      name: 'Orchid Care Checklist Generator',
      type: 'checklist',
      backlinks: 0,
      monthlyViews: 0,
      linkValue: 0,
      isLive: false
    }
  ]);

  const [partnerships] = useState<PartnershipOpportunity[]>([
    {
      id: '1',
      partner: 'Green Thumb Nursery',
      type: 'nursery',
      audience: 15000,
      alignment: 9.2,
      status: 'active',
      expectedLinks: 8
    },
    {
      id: '2',
      partner: 'Houseplant Community Forum',
      type: 'community',
      audience: 45000,
      alignment: 8.7,
      status: 'interested',
      expectedLinks: 12
    },
    {
      id: '3',
      partner: 'Plant Store Network',
      type: 'plant_store',
      audience: 89000,
      alignment: 7.4,
      status: 'contacted',
      expectedLinks: 25
    }
  ]);

  const [expertInterviews] = useState<ExpertInterview[]>([
    {
      id: '1',
      expert: 'Dr. Elena Rodriguez',
      expertise: 'Orchid Pathology',
      credibility: 9.5,
      scheduledDate: '2024-06-20',
      status: 'scheduled',
      expectedBacklinks: 15
    },
    {
      id: '2',
      expert: 'Master John Kim',
      expertise: 'Orchid Breeding',
      credibility: 9.8,
      status: 'planned',
      expectedBacklinks: 20
    },
    {
      id: '3',
      expert: 'Prof. Sarah Chen',
      expertise: 'Plant Biology',
      credibility: 9.2,
      status: 'completed',
      expectedBacklinks: 18
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'acquired':
      case 'active':
      case 'completed':
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'negotiating':
      case 'interested':
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'outreach':
      case 'contacted':
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      case 'prospecting':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLinkTypeIcon = (type: LinkOpportunity['linkType']) => {
    switch (type) {
      case 'resource': return <Link className="w-4 h-4 text-blue-500" />;
      case 'guest_post': return <Users className="w-4 h-4 text-green-500" />;
      case 'tool': return <Calculator className="w-4 h-4 text-purple-500" />;
      case 'interview': return <Award className="w-4 h-4 text-orange-500" />;
      case 'partnership': return <Store className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Link Building Strategy</h3>
          <p className="text-gray-600">Authority building through strategic partnerships and content</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Link className="w-4 h-4 mr-2" />
          Find Opportunities
        </Button>
      </div>

      {/* Link Building Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">892</div>
            <div className="text-sm text-gray-600">Total Backlinks</div>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+34 this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">68</div>
            <div className="text-sm text-gray-600">Domain Authority</div>
            <div className="text-xs text-green-700 mt-2">+3 vs last quarter</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-gray-600">Referring Domains</div>
            <div className="text-xs text-purple-700 mt-2">High-quality sources</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">87%</div>
            <div className="text-sm text-gray-600">Link Quality Score</div>
            <div className="text-xs text-orange-700 mt-2">Above industry avg</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Link Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-blue-500" />
              Link Building Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {linkOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getLinkTypeIcon(opportunity.linkType)}
                      <div>
                        <div className="font-medium">{opportunity.website}</div>
                        <div className="text-sm text-gray-600">{opportunity.domain}</div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(opportunity.status)}>
                      {opportunity.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{opportunity.domainAuthority}</div>
                      <div className="text-xs text-blue-800">DA Score</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{opportunity.estimatedValue}</div>
                      <div className="text-xs text-green-800">Link Value</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-bold text-purple-600 capitalize">{opportunity.linkType.replace('_', ' ')}</div>
                      <div className="text-xs text-purple-800">Type</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    {opportunity.contactEmail && (
                      <div className="text-xs text-gray-500">{opportunity.contactEmail}</div>
                    )}
                    <Button size="sm">
                      {opportunity.status === 'prospecting' ? 'Start Outreach' : 
                       opportunity.status === 'outreach' ? 'Follow Up' :
                       opportunity.status === 'negotiating' ? 'Continue Talks' : 'View Details'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tool Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-500" />
              Link-Worthy Tools & Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {toolResources.map((tool) => (
                <div key={tool.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-sm text-gray-600 capitalize">{tool.type}</div>
                    </div>
                    <Badge variant={tool.isLive ? "default" : "secondary"}>
                      {tool.isLive ? 'Live' : 'In Development'}
                    </Badge>
                  </div>

                  {tool.isLive ? (
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-2 bg-orange-50 rounded">
                        <div className="font-bold text-orange-600">{tool.backlinks}</div>
                        <div className="text-xs text-orange-800">Backlinks</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-bold text-blue-600">{tool.monthlyViews.toLocaleString()}</div>
                        <div className="text-xs text-blue-800">Monthly Views</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-bold text-green-600">{tool.linkValue}</div>
                        <div className="text-xs text-green-800">Link Value</div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded mb-3">
                      <div className="text-sm text-gray-600">
                        Tool in development - projected to generate high-quality backlinks
                      </div>
                    </div>
                  )}

                  <Button size="sm" className="w-full">
                    {tool.isLive ? 'Promote Tool' : 'Continue Development'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Partnership Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="w-5 h-5 text-red-500" />
              Partnership Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partnerships.map((partnership) => (
                <div key={partnership.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{partnership.partner}</div>
                      <div className="text-sm text-gray-600 capitalize">{partnership.type.replace('_', ' ')}</div>
                    </div>
                    <Badge className={getStatusColor(partnership.status)}>
                      {partnership.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{(partnership.audience / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-blue-800">Audience</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{partnership.alignment}</div>
                      <div className="text-xs text-green-800">Alignment</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-bold text-purple-600">{partnership.expectedLinks}</div>
                      <div className="text-xs text-purple-800">Est. Links</div>
                    </div>
                  </div>

                  <Button size="sm" className="w-full">
                    {partnership.status === 'contacted' ? 'Follow Up' :
                     partnership.status === 'interested' ? 'Finalize Terms' :
                     partnership.status === 'active' ? 'Manage Partnership' : 'View Details'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expert Interviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" />
              Expert Interview Program
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expertInterviews.map((interview) => (
                <div key={interview.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{interview.expert}</div>
                      <div className="text-sm text-gray-600">{interview.expertise}</div>
                    </div>
                    <Badge className={getStatusColor(interview.status)}>
                      {interview.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center p-2 bg-yellow-50 rounded">
                      <div className="font-bold text-yellow-600">{interview.credibility}</div>
                      <div className="text-xs text-yellow-800">Credibility</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{interview.expectedBacklinks}</div>
                      <div className="text-xs text-green-800">Est. Links</div>
                    </div>
                  </div>

                  {interview.scheduledDate && (
                    <div className="p-2 bg-blue-50 rounded mb-3">
                      <div className="text-sm text-blue-800">
                        Scheduled: {new Date(interview.scheduledDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}

                  <Button size="sm" className="w-full">
                    {interview.status === 'planned' ? 'Schedule Interview' :
                     interview.status === 'scheduled' ? 'Prepare Questions' :
                     interview.status === 'completed' ? 'Publish Content' : 'View Content'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-500" />
            Community Forum Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Target Communities</h4>
              <div className="space-y-2">
                {[
                  { name: 'r/orchids', members: '45K', engagement: 'High' },
                  { name: 'Houseplant Forum', members: '23K', engagement: 'Medium' },
                  { name: 'Garden Web Community', members: '67K', engagement: 'High' },
                  { name: 'Plant Parent Facebook', members: '89K', engagement: 'Medium' }
                ].map((community) => (
                  <div key={community.name} className="p-2 bg-green-50 rounded">
                    <div className="font-medium text-sm">{community.name}</div>
                    <div className="text-xs text-gray-600">
                      {community.members} members • {community.engagement} engagement
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Content Strategy</h4>
              <div className="space-y-2">
                {[
                  'Helpful problem solutions',
                  'Educational content sharing',
                  'Expert AMA sessions',
                  'Tool and resource mentions'
                ].map((strategy) => (
                  <div key={strategy} className="p-2 bg-blue-50 rounded text-sm">
                    {strategy}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Community engagement</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Natural mentions</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Link acquisition</span>
                    <span>42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkBuildingStrategy;
