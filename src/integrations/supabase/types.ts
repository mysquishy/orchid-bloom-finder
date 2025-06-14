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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
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
