import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchVideos, parseTikTokId } from "@/lib/videos";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin dashboard — Singles & Married2" },
      { name: "description", content: "Manage videos and comments on the Singles & Married2 website." },
      { property: "og:title", content: "Admin dashboard — Singles & Married2" },
      { property: "og:description", content: "Manage videos and comments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const field = "w-full rounded-xl border border-input bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-ring";
const small = "rounded-full px-4 py-1.5 text-sm font-semibold";

function Admin() {
  const qc = useQueryClient();
  const nav = useNavigate();
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return false;
      const { data } = await supabase.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
      return !!data;
    },
  });

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  };

  return (
    <main className="min-h-screen bg-secondary">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-display text-2xl font-bold">Admin dashboard</span>
          <div className="flex gap-3">
            <Link to="/" className={`${small} border border-border`}>View website</Link>
            <button onClick={signOut} className={`${small} bg-foreground text-background`}>Sign out</button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl space-y-10 px-6 py-10">
        {isLoading ? <p>Loading…</p> : !isAdmin ? (
          <p className="rounded-2xl bg-card p-6">This account doesn't have admin access.</p>
        ) : (<><VideosAdmin /><CommentsAdmin /></>)}
      </div>
    </main>
  );
}

function VideosAdmin() {
  const qc = useQueryClient();
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const { data: videos = [] } = useQuery({ queryKey: ["videos"], queryFn: fetchVideos });
  const refresh = () => qc.invalidateQueries({ queryKey: ["videos"] });

  const add = useMutation({
    mutationFn: async () => {
      const id = parseTikTokId(link);
      if (!id) throw new Error("bad");
      const { error } = await supabase.from("videos").insert({ tiktok_id: id, title: title.trim() || "Top video", position: videos.length });
      if (error) throw error;
    },
    onSuccess: () => { setLink(""); setTitle(""); setErr(""); refresh(); },
    onError: (e) => setErr(e.message === "bad" ? "Paste a TikTok video link (it contains /video/…)." : "Couldn't add the video."),
  });
  const remove = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("videos").delete().eq("id", id); if (error) throw error; },
    onSuccess: refresh,
  });
  const pin = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("videos").update({ pinned: false }).eq("pinned", true);
      const { error } = await supabase.from("videos").update({ pinned: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: refresh,
  });

  return (
    <section className="rounded-3xl bg-card p-6 shadow">
      <h2 className="font-display text-3xl font-bold">Videos</h2>
      <form onSubmit={(e) => { e.preventDefault(); add.mutate(); }} className="mt-4 grid gap-3 md:grid-cols-[2fr_1fr_auto]">
        <input className={field} placeholder="TikTok video link" value={link} onChange={(e) => setLink(e.target.value)} />
        <input className={field} placeholder="Label (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button disabled={add.isPending} className={`${small} bg-primary text-primary-foreground`}>Add video</button>
      </form>
      {err && <p className="mt-2 text-sm text-destructive">{err}</p>}
      <ul className="mt-6 divide-y divide-border">
        {videos.map((v) => (
          <li key={v.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <p className="font-semibold">{v.pinned && "📌 "}{v.title}</p>
              <a href={`https://www.tiktok.com/@singlesandmarried2/video/${v.tiktok_id}`} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground underline">{v.tiktok_id}</a>
            </div>
            <div className="flex gap-2">
              {!v.pinned && <button onClick={() => pin.mutate(v.id)} className={`${small} border border-border`}>Make pinned</button>}
              <button onClick={() => confirm("Remove this video?") && remove.mutate(v.id)} className={`${small} bg-destructive text-destructive-foreground`}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommentsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", message: "" });
  const { data: comments = [] } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("comments").select("id,name,message,created_at").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const refresh = () => qc.invalidateQueries({ queryKey: ["comments"] });
  const save = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("comments").update({ name: draft.name.trim(), message: draft.message.trim() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { setEditing(null); refresh(); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("comments").delete().eq("id", id); if (error) throw error; },
    onSuccess: refresh,
  });

  return (
    <section className="rounded-3xl bg-card p-6 shadow">
      <h2 className="font-display text-3xl font-bold">Comments</h2>
      {comments.length === 0 && <p className="mt-4 text-muted-foreground">No comments yet.</p>}
      <ul className="mt-4 divide-y divide-border">
        {comments.map((c) => (
          <li key={c.id} className="py-4">
            {editing === c.id ? (
              <div className="space-y-2">
                <input className={field} value={draft.name} maxLength={60} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                <textarea className={`${field} min-h-24`} value={draft.message} maxLength={1000} onChange={(e) => setDraft({ ...draft, message: e.target.value })} />
                <div className="flex gap-2">
                  <button onClick={() => save.mutate(c.id)} disabled={!draft.name.trim() || !draft.message.trim()} className={`${small} bg-primary text-primary-foreground`}>Save</button>
                  <button onClick={() => setEditing(null)} className={`${small} border border-border`}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="max-w-2xl">
                  <p className="font-semibold">{c.name} <span className="text-xs font-normal text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</span></p>
                  <p className="whitespace-pre-wrap text-muted-foreground">{c.message}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(c.id); setDraft({ name: c.name, message: c.message }); }} className={`${small} border border-border`}>Edit</button>
                  <button onClick={() => confirm("Delete this comment?") && remove.mutate(c.id)} className={`${small} bg-destructive text-destructive-foreground`}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
