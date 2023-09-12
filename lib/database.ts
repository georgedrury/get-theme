export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          company_id: string
          name: string
        }
        Insert: {
          company_id?: string
          name: string
        }
        Update: {
          company_id?: string
          name?: string
        }
        Relationships: []
      }
      primitive_collections: {
        Row: {
          collection_id: string
          name: string
        }
        Insert: {
          collection_id?: string
          name: string
        }
        Update: {
          collection_id?: string
          name?: string
        }
        Relationships: []
      }
      primitives: {
        Row: {
          collection_id: string | null
          name: string
          primitive_id: string
          type: Database["public"]["Enums"]["property"]
          value: string | null
        }
        Insert: {
          collection_id?: string | null
          name: string
          primitive_id?: string
          type: Database["public"]["Enums"]["property"]
          value?: string | null
        }
        Update: {
          collection_id?: string | null
          name?: string
          primitive_id?: string
          type?: Database["public"]["Enums"]["property"]
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "primitives_collection_id_fkey"
            columns: ["collection_id"]
            referencedRelation: "primitive_collections"
            referencedColumns: ["collection_id"]
          }
        ]
      }
      theme_primitive_collections: {
        Row: {
          collection_id: string
          theme_id: string
        }
        Insert: {
          collection_id: string
          theme_id: string
        }
        Update: {
          collection_id?: string
          theme_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "theme_primitive_collections_collection_id_fkey"
            columns: ["collection_id"]
            referencedRelation: "primitive_collections"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "theme_primitive_collections_theme_id_fkey"
            columns: ["theme_id"]
            referencedRelation: "themes"
            referencedColumns: ["theme_id"]
          }
        ]
      }
      theme_token_collections: {
        Row: {
          collection_id: string
          theme_id: string
        }
        Insert: {
          collection_id: string
          theme_id: string
        }
        Update: {
          collection_id?: string
          theme_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "theme_token_collections_collection_id_fkey"
            columns: ["collection_id"]
            referencedRelation: "token_collections"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "theme_token_collections_theme_id_fkey"
            columns: ["theme_id"]
            referencedRelation: "themes"
            referencedColumns: ["theme_id"]
          }
        ]
      }
      themes: {
        Row: {
          code: string | null
          created_by: string | null
          name: string
          primitive_collection: string | null
          theme_id: string
          token_collection: string | null
        }
        Insert: {
          code?: string | null
          created_by?: string | null
          name: string
          primitive_collection?: string | null
          theme_id?: string
          token_collection?: string | null
        }
        Update: {
          code?: string | null
          created_by?: string | null
          name?: string
          primitive_collection?: string | null
          theme_id?: string
          token_collection?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "themes_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "themes_primitive_collection_fkey"
            columns: ["primitive_collection"]
            referencedRelation: "primitive_collections"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "themes_token_collection_fkey"
            columns: ["token_collection"]
            referencedRelation: "token_collections"
            referencedColumns: ["collection_id"]
          }
        ]
      }
      token_collections: {
        Row: {
          collection_id: string
          name: string
        }
        Insert: {
          collection_id?: string
          name: string
        }
        Update: {
          collection_id?: string
          name?: string
        }
        Relationships: []
      }
      tokens: {
        Row: {
          collection_id: string | null
          name: string
          primitive_id: string | null
          token_id: string
          type: Database["public"]["Enums"]["property"]
        }
        Insert: {
          collection_id?: string | null
          name: string
          primitive_id?: string | null
          token_id?: string
          type: Database["public"]["Enums"]["property"]
        }
        Update: {
          collection_id?: string | null
          name?: string
          primitive_id?: string | null
          token_id?: string
          type?: Database["public"]["Enums"]["property"]
        }
        Relationships: [
          {
            foreignKeyName: "tokens_collection_id_fkey"
            columns: ["collection_id"]
            referencedRelation: "token_collections"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "tokens_primitive_id_fkey"
            columns: ["primitive_id"]
            referencedRelation: "primitives"
            referencedColumns: ["primitive_id"]
          }
        ]
      }
      user_profiles: {
        Row: {
          company: string | null
          name: string | null
          profile_id: string
          role: Database["public"]["Enums"]["role"] | null
          user_id: string | null
        }
        Insert: {
          company?: string | null
          name?: string | null
          profile_id?: string
          role?: Database["public"]["Enums"]["role"] | null
          user_id?: string | null
        }
        Update: {
          company?: string | null
          name?: string | null
          profile_id?: string
          role?: Database["public"]["Enums"]["role"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_company_fkey"
            columns: ["company"]
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      property: "color" | "spacing" | "radius"
      role: "UNASSIGNED" | "DESIGNER" | "ENGINEER" | "DESIGN_ENGINEER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
