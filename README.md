# Singles & Married2 🇬🇧 🇮🇹

A modern, responsive web application for **Singles & Married2**—a dedicated relationship coaching and counseling platform providing marital guidance, singlehood mentorship, and community support.

The platform showcases high-performing relationship content, enables direct 1-on-1 counseling bookings via WhatsApp, fosters community interaction, and provides a password-protected admin dashboard for content moderation.

---

## 🌟 Key Features

- **Hero & Mission Showcase**: Highlighting the platform's vision with official photography and clear calls to action.
- **Embedded Content**: Direct embeds of pinned and high-performing TikTok relationship videos.
- **Direct 1-on-1 Booking**: Instant WhatsApp booking integration for private counseling sessions (`+2347039454044`).
- **Community Hub**: Direct link to join the official WhatsApp discussion group.
- **Multi-Platform Social Links**: Verified shortcuts to official TikTok, Instagram, and Facebook profiles.
- **Visitor Comments Section**: Public feedback and testimonial wall stored in a cloud database.
- **Protected Admin Dashboard (`/admin`)**:
  - Secure email-based authentication.
  - Video management: add, pin, or remove video embeds dynamically.
  - Comment moderation: edit or delete visitor comments.
- **Responsive & Accessible**: Optimized for mobile, tablet, and desktop viewports with a collapsible mobile drawer navigation.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack React 19)
- **Tooling & Bundler**: [Vite](https://vitejs.dev/) & [Nitro](https://nitro.unjs.io/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Backend & Database**: Lovable Cloud (PostgreSQL with Row Level Security & Auth)
- **Language**: TypeScript 5
- **Unit Testing**: [Vitest](https://vitest.dev/)

---

## 📋 Prerequisites

- **Node.js**: `v22.12.0` or higher (Node 22 LTS recommended).  
  Verify your installed version:
  ```bash
  node -v
