
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/utils/analytics';

export interface MarketingCampaign {
  id: string;
  name: string;
  campaignType: 'email' | 'social' | 'content' | 'affiliate';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  targetAudience: {
    segments?: string[];
    demographics?: Record<string, any>;
    behaviors?: Record<string, any>;
  };
  content: {
    subject?: string;
    body?: string;
    images?: string[];
    cta?: string;
  };
  metrics: {
    sent?: number;
    opened?: number;
    clicked?: number;
    converted?: number;
    revenue?: number;
  };
  scheduledAt?: Date;
  sentAt?: Date;
  createdBy: string;
}

export interface ABTest {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  variants: Array<{
    name: string;
    weight: number;
    config: Record<string, any>;
  }>;
  targetMetric: string;
  startDate?: Date;
  endDate?: Date;
  results?: {
    [variantName: string]: {
      participants: number;
      conversions: number;
      conversionRate: number;
      significance?: number;
    };
  };
}

export interface UserSegment {
  id: string;
  name: string;
  description: string;
  criteria: {
    demographics?: Record<string, any>;
    behaviors?: Record<string, any>;
    engagement?: Record<string, any>;
    subscription?: Record<string, any>;
  };
  userCount: number;
  averageValue: number;
  retentionRate: number;
}

class MarketingAnalyticsManager {
  // Campaign Management
  async createCampaign(campaign: Omit<MarketingCampaign, 'id'>): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .insert({
          name: campaign.name,
          campaign_type: campaign.campaignType,
          status: campaign.status,
          target_audience: campaign.targetAudience,
          content: campaign.content,
          scheduled_at: campaign.scheduledAt?.toISOString(),
          created_by: campaign.createdBy,
          metrics: campaign.metrics || {}
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Failed to create campaign:', error);
      return null;
    }
  }

  async getCampaigns(userId: string): Promise<MarketingCampaign[]> {
    try {
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .select('*')
        .eq('created_by', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(row => ({
        id: row.id,
        name: row.name,
        campaignType: row.campaign_type as MarketingCampaign['campaignType'],
        status: row.status as MarketingCampaign['status'],
        targetAudience: row.target_audience || {},
        content: row.content || {},
        metrics: row.metrics || {},
        scheduledAt: row.scheduled_at ? new Date(row.scheduled_at) : undefined,
        sentAt: row.sent_at ? new Date(row.sent_at) : undefined,
        createdBy: row.created_by
      }));
    } catch (error) {
      console.error('Failed to get campaigns:', error);
      return [];
    }
  }

  // A/B Testing
  async createABTest(test: Omit<ABTest, 'id'>): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('ab_tests')
        .insert({
          test_name: test.name,
          description: test.description,
          status: test.status,
          variants: test.variants,
          target_metric: test.targetMetric,
          start_date: test.startDate?.toISOString(),
          end_date: test.endDate?.toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Failed to create A/B test:', error);
      return null;
    }
  }

  async assignUserToVariant(testId: string, userId: string): Promise<string | null> {
    try {
      // Get test details
      const { data: test, error: testError } = await supabase
        .from('ab_tests')
        .select('variants')
        .eq('id', testId)
        .single();

      if (testError) throw testError;

      // Check if user already assigned
      const { data: existing } = await supabase
        .from('ab_test_assignments')
        .select('variant_name')
        .eq('test_id', testId)
        .eq('user_id', userId)
        .single();

      if (existing) {
        return existing.variant_name;
      }

      // Assign to variant based on weights
      const variants = test.variants as ABTest['variants'];
      const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
      const random = Math.random() * totalWeight;
      
      let currentWeight = 0;
      let selectedVariant = variants[0].name;
      
      for (const variant of variants) {
        currentWeight += variant.weight;
        if (random <= currentWeight) {
          selectedVariant = variant.name;
          break;
        }
      }

      // Save assignment
      const { error: assignError } = await supabase
        .from('ab_test_assignments')
        .insert({
          test_id: testId,
          user_id: userId,
          variant_name: selectedVariant
        });

      if (assignError) throw assignError;
      return selectedVariant;
    } catch (error) {
      console.error('Failed to assign user to variant:', error);
      return null;
    }
  }

  // User Segmentation
  async createUserSegment(segment: Omit<UserSegment, 'id' | 'userCount' | 'averageValue' | 'retentionRate'>): Promise<string | null> {
    try {
      // In a real implementation, you'd calculate these metrics
      const userCount = Math.floor(Math.random() * 1000) + 100;
      const averageValue = Math.floor(Math.random() * 50) + 10;
      const retentionRate = Math.floor(Math.random() * 40) + 60;

      // Store segment definition (you'd need a segments table)
      const segmentData = {
        ...segment,
        userCount,
        averageValue,
        retentionRate,
        id: `segment_${Date.now()}`
      };

      // For now, return the generated ID
      return segmentData.id;
    } catch (error) {
      console.error('Failed to create user segment:', error);
      return null;
    }
  }

  // Analytics Events
  async trackConversion(userId: string, conversionType: string, value?: number, metadata?: Record<string, any>) {
    try {
      await trackEvent({
        event_type: 'conversion',
        event_data: {
          conversion_type: conversionType,
          value: value || 0,
          metadata: metadata || {},
          timestamp: new Date().toISOString()
        },
        user_id: userId
      });

      // Also track in conversion funnel
      const { error } = await supabase
        .from('conversion_funnel')
        .insert({
          user_id: userId,
          funnel_step: conversionType,
          step_order: this.getStepOrder(conversionType),
          metadata: metadata || {}
        });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to track conversion:', error);
    }
  }

  private getStepOrder(step: string): number {
    const stepOrders: Record<string, number> = {
      'landing': 1,
      'signup': 2,
      'first_identification': 3,
      'subscription': 4,
      'retention_week1': 5,
      'retention_month1': 6
    };
    return stepOrders[step] || 99;
  }

  // SEO and Content Analytics
  async trackBlogView(postSlug: string, userId?: string) {
    try {
      // Update view count
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ 
          view_count: supabase.rpc('increment_view_count', { post_slug: postSlug })
        })
        .eq('slug', postSlug);

      // Track analytics event
      await trackEvent({
        event_type: 'blog_view',
        event_data: {
          post_slug: postSlug,
          timestamp: new Date().toISOString()
        },
        user_id: userId
      });
    } catch (error) {
      console.error('Failed to track blog view:', error);
    }
  }

  // Social Media Analytics
  async trackSocialShare(platform: string, contentType: string, contentId: string, userId?: string) {
    try {
      await trackEvent({
        event_type: 'social_share',
        event_data: {
          platform,
          content_type: contentType,
          content_id: contentId,
          timestamp: new Date().toISOString()
        },
        user_id: userId
      });
    } catch (error) {
      console.error('Failed to track social share:', error);
    }
  }

  // Email Marketing
  async trackEmailEvent(campaignId: string, eventType: 'sent' | 'opened' | 'clicked' | 'unsubscribed', userId: string) {
    try {
      await trackEvent({
        event_type: 'email_event',
        event_data: {
          campaign_id: campaignId,
          event_type: eventType,
          timestamp: new Date().toISOString()
        },
        user_id: userId
      });

      // Update campaign metrics
      const { error } = await supabase.rpc('update_campaign_metrics', {
        campaign_id: campaignId,
        event_type: eventType
      });

      if (error) console.error('Failed to update campaign metrics:', error);
    } catch (error) {
      console.error('Failed to track email event:', error);
    }
  }

  // Retention Analysis
  async getRetentionAnalysis(startDate: Date, endDate: Date) {
    try {
      // This would be a complex query in a real implementation
      // For now, return mock data
      return {
        cohorts: [
          { period: '2024-01', users: 100, retained: 85 },
          { period: '2024-02', users: 120, retained: 90 },
          { period: '2024-03', users: 150, retained: 88 }
        ],
        overallRetentionRate: 87.5,
        churnRate: 12.5
      };
    } catch (error) {
      console.error('Failed to get retention analysis:', error);
      return null;
    }
  }
}

export const marketingAnalytics = new MarketingAnalyticsManager();
