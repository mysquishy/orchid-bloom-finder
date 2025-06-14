export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ab_test_assignments: {
        Row: {
          assigned_at: string | null
          id: string
          test_id: string | null
          user_id: string | null
          variant_name: string
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          test_id?: string | null
          user_id?: string | null
          variant_name: string
        }
        Update: {
          assigned_at?: string | null
          id?: string
          test_id?: string | null
          user_id?: string | null
          variant_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ab_test_assignments_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "ab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      ab_tests: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          start_date: string | null
          status: string | null
          target_metric: string
          test_name: string
          updated_at: string | null
          variants: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: string | null
          target_metric: string
          test_name: string
          updated_at?: string | null
          variants: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: string | null
          target_metric?: string
          test_name?: string
          updated_at?: string | null
          variants?: Json
        }
        Relationships: []
      }
      api_usage_costs: {
        Row: {
          api_endpoint: string
          cost_cents: number | null
          created_at: string | null
          id: string
          provider: string | null
          request_data: Json | null
          response_time_ms: number | null
          success: boolean | null
          usage_count: number | null
          user_id: string | null
        }
        Insert: {
          api_endpoint: string
          cost_cents?: number | null
          created_at?: string | null
          id?: string
          provider?: string | null
          request_data?: Json | null
          response_time_ms?: number | null
          success?: boolean | null
          usage_count?: number | null
          user_id?: string | null
        }
        Update: {
          api_endpoint?: string
          cost_cents?: number | null
          created_at?: string | null
          id?: string
          provider?: string | null
          request_data?: Json | null
          response_time_ms?: number | null
          success?: boolean | null
          usage_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      challenge_participations: {
        Row: {
          challenge_id: string
          created_at: string
          id: string
          image_urls: string[] | null
          score: number | null
          submission_data: Json | null
          submission_text: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          created_at?: string
          id?: string
          image_urls?: string[] | null
          score?: number | null
          submission_data?: Json | null
          submission_text?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          created_at?: string
          id?: string
          image_urls?: string[] | null
          score?: number | null
          submission_data?: Json | null
          submission_text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participations_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "community_challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_challenges: {
        Row: {
          challenge_type: string
          created_at: string
          description: string
          end_date: string
          id: string
          participant_count: number | null
          prize_description: string | null
          start_date: string
          status: string
          title: string
        }
        Insert: {
          challenge_type?: string
          created_at?: string
          description: string
          end_date: string
          id?: string
          participant_count?: number | null
          prize_description?: string | null
          start_date: string
          status?: string
          title: string
        }
        Update: {
          challenge_type?: string
          created_at?: string
          description?: string
          end_date?: string
          id?: string
          participant_count?: number | null
          prize_description?: string | null
          start_date?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          comments_count: number | null
          content: string | null
          created_at: string
          id: string
          image_urls: string[] | null
          likes_count: number | null
          orchid_species_id: string | null
          post_type: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          comments_count?: number | null
          content?: string | null
          created_at?: string
          id?: string
          image_urls?: string[] | null
          likes_count?: number | null
          orchid_species_id?: string | null
          post_type?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          comments_count?: number | null
          content?: string | null
          created_at?: string
          id?: string
          image_urls?: string[] | null
          likes_count?: number | null
          orchid_species_id?: string | null
          post_type?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_orchid_species_id_fkey"
            columns: ["orchid_species_id"]
            isOneToOne: false
            referencedRelation: "orchid_species"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          consultation_type: string
          created_at: string
          description: string | null
          duration_minutes: number | null
          expert_id: string
          expert_notes: string | null
          id: string
          meeting_url: string | null
          notes: string | null
          price_cents: number
          scheduled_at: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          consultation_type: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          expert_id: string
          expert_notes?: string | null
          id?: string
          meeting_url?: string | null
          notes?: string | null
          price_cents: number
          scheduled_at?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          consultation_type?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          expert_id?: string
          expert_notes?: string | null
          id?: string
          meeting_url?: string | null
          notes?: string | null
          price_cents?: number
          scheduled_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultations_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "experts"
            referencedColumns: ["id"]
          },
        ]
      }
      conversion_funnel: {
        Row: {
          completed_at: string | null
          funnel_step: string
          id: string
          metadata: Json | null
          step_order: number
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          funnel_step: string
          id?: string
          metadata?: Json | null
          step_order: number
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          funnel_step?: string
          id?: string
          metadata?: Json | null
          step_order?: number
          user_id?: string | null
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          certificate_url: string | null
          completed_at: string | null
          course_id: string
          enrolled_at: string
          id: string
          progress_percentage: number | null
          user_id: string
        }
        Insert: {
          certificate_url?: string | null
          completed_at?: string | null
          course_id: string
          enrolled_at?: string
          id?: string
          progress_percentage?: number | null
          user_id: string
        }
        Update: {
          certificate_url?: string | null
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string
          id?: string
          progress_percentage?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "expert_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      discussion_forums: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          member_count: number | null
          name: string
          orchid_species_id: string | null
          post_count: number | null
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          member_count?: number | null
          name: string
          orchid_species_id?: string | null
          post_count?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          member_count?: number | null
          name?: string
          orchid_species_id?: string | null
          post_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_forums_orchid_species_id_fkey"
            columns: ["orchid_species_id"]
            isOneToOne: false
            referencedRelation: "orchid_species"
            referencedColumns: ["id"]
          },
        ]
      }
      event_attendances: {
        Row: {
          created_at: string
          event_id: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_attendances_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "meetup_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_attendances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          expert_id: string
          id: string
          is_available: boolean | null
          start_time: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          expert_id: string
          id?: string
          is_available?: boolean | null
          start_time: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          expert_id?: string
          id?: string
          is_available?: boolean | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "expert_availability_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "experts"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_courses: {
        Row: {
          course_type: string
          created_at: string
          description: string | null
          difficulty_level: string
          duration_hours: number | null
          expert_id: string
          id: string
          is_premium_only: boolean | null
          is_published: boolean | null
          max_participants: number | null
          price_cents: number
          syllabus: Json | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          course_type: string
          created_at?: string
          description?: string | null
          difficulty_level: string
          duration_hours?: number | null
          expert_id: string
          id?: string
          is_premium_only?: boolean | null
          is_published?: boolean | null
          max_participants?: number | null
          price_cents: number
          syllabus?: Json | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          course_type?: string
          created_at?: string
          description?: string | null
          difficulty_level?: string
          duration_hours?: number | null
          expert_id?: string
          id?: string
          is_premium_only?: boolean | null
          is_published?: boolean | null
          max_participants?: number | null
          price_cents?: number
          syllabus?: Json | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expert_courses_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "experts"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_reviews: {
        Row: {
          consultation_id: string | null
          created_at: string
          expert_id: string
          id: string
          rating: number
          review_text: string | null
          user_id: string
        }
        Insert: {
          consultation_id?: string | null
          created_at?: string
          expert_id: string
          id?: string
          rating: number
          review_text?: string | null
          user_id: string
        }
        Update: {
          consultation_id?: string | null
          created_at?: string
          expert_id?: string
          id?: string
          rating?: number
          review_text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expert_reviews_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expert_reviews_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "experts"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_verifications: {
        Row: {
          confidence_score: number | null
          created_at: string
          expert_id: string
          id: string
          identification_id: string
          status: string
          verification_notes: string | null
          verified_species: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          expert_id: string
          id?: string
          identification_id: string
          status?: string
          verification_notes?: string | null
          verified_species?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          expert_id?: string
          id?: string
          identification_id?: string
          status?: string
          verification_notes?: string | null
          verified_species?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expert_verifications_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expert_verifications_identification_id_fkey"
            columns: ["identification_id"]
            isOneToOne: false
            referencedRelation: "identifications"
            referencedColumns: ["id"]
          },
        ]
      }
      experts: {
        Row: {
          bio: string | null
          created_at: string
          credentials: string[] | null
          hourly_rate_cents: number | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          name: string
          profile_image_url: string | null
          specializations: string[] | null
          title: string
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          credentials?: string[] | null
          hourly_rate_cents?: number | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          name: string
          profile_image_url?: string | null
          specializations?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          credentials?: string[] | null
          hourly_rate_cents?: number | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          name?: string
          profile_image_url?: string | null
          specializations?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          content: string
          created_at: string
          id: string
          topic_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          topic_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          topic_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          content: string
          created_at: string
          forum_id: string
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          last_reply_at: string | null
          reply_count: number | null
          title: string
          updated_at: string
          user_id: string
          view_count: number | null
        }
        Insert: {
          content: string
          created_at?: string
          forum_id: string
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_reply_at?: string | null
          reply_count?: number | null
          title: string
          updated_at?: string
          user_id: string
          view_count?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          forum_id?: string
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_reply_at?: string | null
          reply_count?: number | null
          title?: string
          updated_at?: string
          user_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_topics_forum_id_fkey"
            columns: ["forum_id"]
            isOneToOne: false
            referencedRelation: "discussion_forums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_topics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      identifications: {
        Row: {
          confidence_score: number | null
          created_at: string
          id: string
          image_url: string | null
          is_saved: boolean | null
          notes: string | null
          orchid_species: string | null
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_saved?: boolean | null
          notes?: string | null
          orchid_species?: string | null
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_saved?: boolean | null
          notes?: string | null
          orchid_species?: string | null
          user_id?: string
        }
        Relationships: []
      }
      local_societies: {
        Row: {
          contact_info: Json | null
          created_at: string
          description: string | null
          id: string
          location: string
          member_count: number | null
          name: string
          website_url: string | null
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          location: string
          member_count?: number | null
          name: string
          website_url?: string | null
        }
        Update: {
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          member_count?: number | null
          name?: string
          website_url?: string | null
        }
        Relationships: []
      }
      meetup_events: {
        Row: {
          attendee_count: number | null
          created_at: string
          description: string | null
          event_date: string
          id: string
          location: string
          max_attendees: number | null
          organizer_id: string
          society_id: string | null
          status: string
          title: string
        }
        Insert: {
          attendee_count?: number | null
          created_at?: string
          description?: string | null
          event_date: string
          id?: string
          location: string
          max_attendees?: number | null
          organizer_id: string
          society_id?: string | null
          status?: string
          title: string
        }
        Update: {
          attendee_count?: number | null
          created_at?: string
          description?: string | null
          event_date?: string
          id?: string
          location?: string
          max_attendees?: number | null
          organizer_id?: string
          society_id?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetup_events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetup_events_society_id_fkey"
            columns: ["society_id"]
            isOneToOne: false
            referencedRelation: "local_societies"
            referencedColumns: ["id"]
          },
        ]
      }
      orchid_species: {
        Row: {
          bloom_time: string
          care_difficulty: string
          care_tips: string[] | null
          common_diseases: string[] | null
          common_name: string
          confidence_score: number | null
          created_at: string
          description: string
          family: string
          fertilizer_schedule: string
          flower_colors: string[]
          gbif_id: string | null
          growing_medium: string
          high_quality_image_urls: string[] | null
          humidity_needs: string
          id: string
          is_popular: boolean | null
          light_requirements: string
          native_region: string
          plantnet_cache_id: string | null
          repotting_frequency: string
          scientific_name: string
          subfamily: string | null
          temperature_range: string
          updated_at: string
          user_contributed: boolean | null
          water_frequency: string
        }
        Insert: {
          bloom_time: string
          care_difficulty: string
          care_tips?: string[] | null
          common_diseases?: string[] | null
          common_name: string
          confidence_score?: number | null
          created_at?: string
          description: string
          family?: string
          fertilizer_schedule: string
          flower_colors: string[]
          gbif_id?: string | null
          growing_medium: string
          high_quality_image_urls?: string[] | null
          humidity_needs: string
          id?: string
          is_popular?: boolean | null
          light_requirements: string
          native_region: string
          plantnet_cache_id?: string | null
          repotting_frequency: string
          scientific_name: string
          subfamily?: string | null
          temperature_range: string
          updated_at?: string
          user_contributed?: boolean | null
          water_frequency: string
        }
        Update: {
          bloom_time?: string
          care_difficulty?: string
          care_tips?: string[] | null
          common_diseases?: string[] | null
          common_name?: string
          confidence_score?: number | null
          created_at?: string
          description?: string
          family?: string
          fertilizer_schedule?: string
          flower_colors?: string[]
          gbif_id?: string | null
          growing_medium?: string
          high_quality_image_urls?: string[] | null
          humidity_needs?: string
          id?: string
          is_popular?: boolean | null
          light_requirements?: string
          native_region?: string
          plantnet_cache_id?: string | null
          repotting_frequency?: string
          scientific_name?: string
          subfamily?: string | null
          temperature_range?: string
          updated_at?: string
          user_contributed?: boolean | null
          water_frequency?: string
        }
        Relationships: []
      }
      plant_trades: {
        Row: {
          contact_info: Json | null
          created_at: string
          description: string | null
          id: string
          image_urls: string[] | null
          location: string | null
          orchid_species_id: string | null
          status: string
          title: string
          trade_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_urls?: string[] | null
          location?: string | null
          orchid_species_id?: string | null
          status?: string
          title: string
          trade_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_urls?: string[] | null
          location?: string | null
          orchid_species_id?: string | null
          status?: string
          title?: string
          trade_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plant_trades_orchid_species_id_fkey"
            columns: ["orchid_species_id"]
            isOneToOne: false
            referencedRelation: "orchid_species"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_trades_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          first_name: string | null
          id: string
          is_expert: boolean | null
          last_name: string | null
          location: string | null
          orchid_experience_level: string | null
          privacy_settings: Json | null
          social_links: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          is_expert?: boolean | null
          last_name?: string | null
          location?: string | null
          orchid_experience_level?: string | null
          privacy_settings?: Json | null
          social_links?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          is_expert?: boolean | null
          last_name?: string | null
          location?: string | null
          orchid_experience_level?: string | null
          privacy_settings?: Json | null
          social_links?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      revenue_analytics: {
        Row: {
          amount_cents: number
          billing_period: string
          created_at: string | null
          currency: string | null
          id: string
          payment_status: string
          stripe_payment_id: string | null
          subscription_tier: string
          transaction_date: string | null
          user_id: string | null
        }
        Insert: {
          amount_cents: number
          billing_period: string
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_status: string
          stripe_payment_id?: string | null
          subscription_tier: string
          transaction_date?: string | null
          user_id?: string | null
        }
        Update: {
          amount_cents?: number
          billing_period?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_status?: string
          stripe_payment_id?: string | null
          subscription_tier?: string
          transaction_date?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      society_memberships: {
        Row: {
          id: string
          joined_at: string
          role: string
          society_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: string
          society_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: string
          society_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "society_memberships_society_id_fkey"
            columns: ["society_id"]
            isOneToOne: false
            referencedRelation: "local_societies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "society_memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string | null
          description: string
          expert_id: string | null
          first_response_at: string | null
          id: string
          is_premium: boolean | null
          priority: string | null
          resolved_at: string | null
          response_time_sla_hours: number | null
          status: string | null
          subject: string
          tags: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          description: string
          expert_id?: string | null
          first_response_at?: string | null
          id?: string
          is_premium?: boolean | null
          priority?: string | null
          resolved_at?: string | null
          response_time_sla_hours?: number | null
          status?: string | null
          subject: string
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          description?: string
          expert_id?: string | null
          first_response_at?: string | null
          id?: string
          is_premium?: boolean | null
          priority?: string | null
          resolved_at?: string | null
          response_time_sla_hours?: number | null
          status?: string | null
          subject?: string
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "experts"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_tracking: {
        Row: {
          created_at: string
          id: string
          identifications_count: number | null
          month_year: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          identifications_count?: number | null
          month_year: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          identifications_count?: number | null
          month_year?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          description: string | null
          earned_at: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          description?: string | null
          earned_at?: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          description?: string | null
          earned_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_engagement: {
        Row: {
          created_at: string | null
          features_used: Json | null
          id: string
          last_activity: string | null
          page_visits: Json | null
          session_id: string
          time_spent_minutes: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          features_used?: Json | null
          id?: string
          last_activity?: string | null
          page_visits?: Json | null
          session_id: string
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          features_used?: Json | null
          id?: string
          last_activity?: string | null
          page_visits?: Json | null
          session_id?: string
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_orchid_collection: {
        Row: {
          care_notes: string | null
          created_at: string
          current_bloom_status: string | null
          date_added: string
          id: string
          last_fertilized: string | null
          last_repotted: string | null
          last_watered: string | null
          orchid_species_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          care_notes?: string | null
          created_at?: string
          current_bloom_status?: string | null
          date_added?: string
          id?: string
          last_fertilized?: string | null
          last_repotted?: string | null
          last_watered?: string | null
          orchid_species_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          care_notes?: string | null
          created_at?: string
          current_bloom_status?: string | null
          date_added?: string
          id?: string
          last_fertilized?: string | null
          last_repotted?: string | null
          last_watered?: string | null
          orchid_species_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_orchid_collection_orchid_species_id_fkey"
            columns: ["orchid_species_id"]
            isOneToOne: false
            referencedRelation: "orchid_species"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_identification_limit: {
        Args: { user_id_param: string }
        Returns: {
          can_identify: boolean
          remaining_count: number
          is_premium: boolean
        }[]
      }
      check_rate_limit: {
        Args: {
          identifier_param: string
          endpoint_param: string
          limit_count?: number
          window_minutes?: number
        }
        Returns: {
          allowed: boolean
          current_count: number
          reset_time: string
        }[]
      }
      cleanup_old_analytics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_api_optimization_recommendations: {
        Args: Record<PropertyKey, never>
        Returns: {
          recommendation_type: string
          description: string
          potential_savings_cents: number
          priority: string
        }[]
      }
      get_available_slots: {
        Args: { expert_id_param: string; date_start: string; date_end: string }
        Returns: {
          slot_datetime: string
          duration_minutes: number
        }[]
      }
      get_business_metrics: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_users: number
          active_users_7d: number
          active_users_30d: number
          total_revenue_cents: number
          mrr_cents: number
          churn_rate_30d: number
          avg_session_time_minutes: number
          total_identifications: number
          identification_success_rate: number
          total_api_cost_cents: number
        }[]
      }
      get_database_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_species: number
          total_users: number
          total_collections: number
          total_identifications: number
          popular_species_count: number
          user_contributed_count: number
          recent_signups_7d: number
          recent_identifications_7d: number
        }[]
      }
      get_expert_rating: {
        Args: { expert_id_param: string }
        Returns: {
          average_rating: number
          total_reviews: number
        }[]
      }
      get_user_segments: {
        Args: Record<PropertyKey, never>
        Returns: {
          segment_name: string
          user_count: number
          avg_revenue_cents: number
          retention_rate: number
        }[]
      }
      increment_identification_usage: {
        Args: { user_id_param: string }
        Returns: undefined
      }
      insert_analytics: {
        Args: {
          event_type: string
          event_data?: Json
          user_id?: string
          session_id?: string
          user_agent?: string
        }
        Returns: undefined
      }
      insert_error_log: {
        Args: {
          error_type: string
          error_message: string
          stack_trace?: string
          user_id?: string
          url?: string
          context?: Json
          user_agent?: string
        }
        Returns: undefined
      }
      validate_orchid_data: {
        Args: Record<PropertyKey, never>
        Returns: {
          issue_type: string
          issue_description: string
          affected_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
