import { supabase } from "@/integrations/supabase/client";

export async function fetchVideos() {
  const { data, error } = await supabase
    .from("videos")
    .select("id,tiktok_id,title,pinned,position")
    .order("pinned", { ascending: false })
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

/** Accepts a TikTok link or a raw video ID and returns the numeric ID, or null. */
export function parseTikTokId(input: string): string | null {
  const s = input.trim();
  if (/^\d{10,25}$/.test(s)) return s;
  const m = s.match(/\/video\/(\d{10,25})/);
  return m?.[1] ?? null;
}
