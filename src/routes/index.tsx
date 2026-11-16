import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "@/lib/videos";
import { Menu, X } from "lucide-react";
import { Comments } from "@/components/Comments";
import { WhatsAppIcon, TikTokIcon, InstagramIcon, FacebookIcon } from "@/components/SocialIcons";

const WHATSAPP_GROUP = "https://chat.whatsapp.com/FJlhCQdEuHQ2Y8E5Oe0USY";
const WHATSAPP_DM = "https://wa.me/2347039454044?text=" + encodeURIComponent("Hello, I'd like to book a session.");
const TIKTOK = "https://www.tiktok.com/@singlesandmarried2";
const INSTAGRAM = "https://www.instagram.com/singles_and_married_affairs";
const FACEBOOK = "https://www.facebook.com/share/19tEuYRkVd/";

const SOCIALS = [
  { name: "WhatsApp", href: WHATSAPP_GROUP, Icon: WhatsAppIcon, handle: "Join the group" },
  { name: "TikTok", href: TIKTOK, Icon: TikTokIcon, handle: "@singlesandmarried2" },
  { name: "Instagram", href: INSTAGRAM, Icon: InstagramIcon, handle: "@singles_and_married_affairs" },
  { name: "Facebook", href: FACEBOOK, Icon: FacebookIcon, handle: "Singles & Married" },
];

const NAV = [
  { href: "#about", label: "About" },
  { href: "#watch", label: "Watch" },
  { href: "#book", label: "Book" },
  { href: "#comments", label: "Comments" },
  { href: "#follow", label: "Follow" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Singles & Married2 — Book a session & join the community" },
      { name: "description", content: "Honest relationship talk for singles and married couples. Book a session, join our WhatsApp group and watch our top TikToks." },
      { property: "og:title", content: "Singles & Married2" },
      { property: "og:description", content: "Book a session, join the WhatsApp community and watch our most-loved videos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function TikTok({ id, title }: { id: string; title: string }) {
  return (
    <div className="mx-auto w-full max-w-[325px] overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
      <iframe src={`https://www.tiktok.com/player/v1/${id}?rel=0`} title={title} className="block aspect-[9/16] w-full" allow="fullscreen; encrypted-media" loading="lazy" />
    </div>
  );
}

const btn = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-semibold transition-transform hover:-translate-y-0.5";

function SocialRow({ size = "h-11 w-11" }: { size?: string }) {
  return (
    <div className="flex gap-3">
      {SOCIALS.map(({ name, href, Icon }) => (
        <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name} className={`${size} grid place-items-center rounded-full bg-foreground text-background transition-transform hover:-translate-y-0.5 hover:bg-primary`}>
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const { data: videos = [] } = useQuery({ queryKey: ["videos"], queryFn: fetchVideos });
  return (
    <main className="font-sans">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-xl font-bold md:text-2xl">Singles &amp; Married2 🇬🇧 🇮🇹</a>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            {NAV.map((n) => <a key={n.href} href={n.href} className="hover:text-primary">{n.label}</a>)}
            <a href="#book" className="rounded-full bg-primary px-5 py-2 text-primary-foreground">Book now</a>
          </nav>
          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-border px-6 py-3 md:hidden">
            {NAV.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 font-semibold">{n.label}</a>)}
          </nav>
        )}
      </header>

      <section id="about" style={{ backgroundImage: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">Love · Faith · Marriage</p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              Real talk for <em>singles</em> and the <em>married</em>.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Guidance, honest conversations and a warm community — wherever you are on your relationship journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={WHATSAPP_DM} target="_blank" rel="noreferrer" className={`${btn} bg-primary text-primary-foreground`}>Book a session</a>
              <a href={WHATSAPP_GROUP} target="_blank" rel="noreferrer" className={`${btn} border-2 border-foreground`}><WhatsAppIcon className="h-5 w-5" />Join WhatsApp group</a>
            </div>
            <div className="mt-8"><SocialRow /></div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-primary/30" />
            <img src="/couple_portrait.jpg" alt="The hosts of Singles & Married2" className="relative aspect-[4/5] w-full rounded-[2rem] object-cover object-top shadow-2xl" />
          </div>
        </div>
      </section>

      <section id="watch" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Most-loved videos</h2>
          <p className="mt-2 text-muted-foreground">Start with our 📌 pinned video — the conversation everyone keeps sharing.</p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <div key={v.id}>
              {v.pinned && <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-primary">📌 Pinned</p>}
              {!v.pinned && <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">{v.title || "Top video"}</p>}
              <TikTok id={v.tiktok_id} title={v.title || "Top video"} />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={TIKTOK} target="_blank" rel="noreferrer" className={`${btn} bg-foreground text-background`}><TikTokIcon className="h-5 w-5" />See all on TikTok</a>
        </div>
      </section>

      <section id="book" className="bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Book a session</h2>
            <p className="mt-4 text-lg">One-to-one or couples sessions. Send a WhatsApp message and we'll agree a time that suits you.</p>
            <a href={WHATSAPP_DM} target="_blank" rel="noreferrer" className={`${btn} mt-8 bg-primary text-primary-foreground`}><WhatsAppIcon className="h-5 w-5" />Message on WhatsApp</a>
          </div>
          <div className="rounded-3xl bg-card p-8 shadow-lg">
            <h3 className="font-display text-3xl font-bold">Join the community</h3>
            <p className="mt-3 text-muted-foreground">Daily encouragement, Q&amp;As and live updates in our WhatsApp group.</p>
            <a href={WHATSAPP_GROUP} target="_blank" rel="noreferrer" className={`${btn} mt-6 border-2 border-primary text-primary`}><WhatsAppIcon className="h-5 w-5" />Join WhatsApp group</a>
          </div>
        </div>
      </section>

      <section id="comments" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-center font-display text-4xl font-bold md:text-5xl">What our community says</h2>
        <Comments />
      </section>

      <section id="follow" className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Follow along</h2>
          <p className="mt-2 opacity-80">Find us on all your favourite apps.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOCIALS.map(({ name, href, Icon, handle }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 rounded-3xl bg-background/10 p-6 transition-transform hover:-translate-y-1 hover:bg-background/20">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground"><Icon className="h-7 w-7" /></span>
                <span className="font-display text-2xl font-bold">{name}</span>
                <span className="text-sm opacity-80">{handle}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-muted-foreground">
          <SocialRow size="h-9 w-9" />
          <span>© {new Date().getFullYear()} Singles &amp; Married2 🇬🇧 🇮🇹 · <a href="/auth" className="underline">Admin</a></span>
        </div>
      </footer>
    </main>
  );
}
