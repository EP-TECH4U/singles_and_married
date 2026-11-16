import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Comments() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("id,name,message,created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });

  const post = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("comments")
        .insert({ name: name.trim(), message: message.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      setMessage("");
      qc.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => setError("Couldn't post your comment. Please try again."),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !message.trim()) return setError("Please add your name and a message.");
    if (name.length > 60 || message.length > 1000) return setError("That's a bit too long.");
    post.mutate();
  };

  const field = "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
      <form onSubmit={submit} className="space-y-4 rounded-3xl bg-card p-8 shadow-lg">
        <h3 className="font-display text-3xl font-bold">Leave a comment</h3>
        <input className={field} placeholder="Your name" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} />
        <textarea className={`${field} min-h-32`} placeholder="Share your thoughts or testimony…" value={message} maxLength={1000} onChange={(e) => setMessage(e.target.value)} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button disabled={post.isPending} className="w-full rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground disabled:opacity-60">
          {post.isPending ? "Posting…" : "Post comment"}
        </button>
      </form>
      <div className="max-h-[32rem] space-y-4 overflow-y-auto pr-2">
        {isLoading && <p className="text-muted-foreground">Loading comments…</p>}
        {!isLoading && comments.length === 0 && <p className="text-muted-foreground">Be the first to leave a comment.</p>}
        {comments.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold">{c.name}</span>
              <span className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</span>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-muted-foreground">{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
