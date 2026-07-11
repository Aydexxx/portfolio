export type ProjectSlug = "fluxion" | "taskflow" | "larajob" | "tunlr";

export type Project = {
  /** Channel number in the showcase sequence — "01" | "02" | "03" | "04". */
  index: "01" | "02" | "03" | "04";
  slug: ProjectSlug;
  /** Brand name — not translated. */
  name: string;
  /** One-line tagline. */
  tagline: string;
  /**
   * Genuinely live — leaned into with a "● CANLI" HUD and the real domain.
   * Optional: a project without a liveUrl is treated as non-live/self-hosted.
   */
  liveUrl?: string;
  repoUrl: string;
  /** Compressed, muted demo clip in public/projects. */
  video: string;
  /** Poster shown before the clip plays (and the only frame under reduced motion). */
  poster: string;
  /** Readout chips — the app's own stack, in display order. */
  frontend: string[];
  backend: string[];
  /** Plain, user-facing: what it does. */
  whatItDoes: string;
  /** Its place in today's tech landscape. Grounded, short. */
  whereItSits: string;
};

// The three flagships, in broadcast order. Fluxion leads. Turkish copy is
// verbatim from the build spec.
export const PROJECTS: Project[] = [
  {
    index: "01",
    slug: "fluxion",
    name: "Fluxion",
    tagline: "Görsel yapay zekâ iş akışı otomasyonu — kur, bağla, çalıştır.",
    liveUrl: "https://web-production-2d7a3.up.railway.app/",
    repoUrl: "https://github.com/Aydexxx/fluxion",
    video: "/projects/fluxion.mp4",
    poster: "/projects/fluxion-poster.jpg",
    frontend: ["React", "TypeScript", "React Flow", "Socket.IO", "Tailwind CSS"],
    backend: [
      "Node.js",
      "Express",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Socket.IO",
    ],
    whatItDoes:
      "Otomatik iş akışları için sürükle-bırak bir kurucu — n8n ya da Zapier gibi. Node’ları bir akışa bağlarsın, yapay zekâ adımları ve tetikleyiciler eklersin; Fluxion tüm grafiği bir arka plan yürütme motorunda çalıştırır. Canlı imleçlerle gerçek zamanlı çok kullanıcılı düzenleme, şifreli kimlik kasası, sürümleme, rol tabanlı erişim ve herkese açık bir REST API sunar.",
    whereItSits:
      "İş akışı otomasyonu (iPaaS) en hızlı büyüyen yazılım kategorilerinden biri; yapay zekâ ajan orkestrasyonu ise bugünkü sınırı. Fluxion tam burada duruyor — mantığı ve yapay zekâyı çalışan otomasyonlara dönüştüren görsel bir motor.",
  },
  {
    index: "02",
    slug: "taskflow",
    name: "TaskFlow",
    tagline: "Gerçek zamanlı ekip çalışması, içine gömülü bir yapay zekâ yardımcısıyla.",
    liveUrl: "https://taskflow-production-3f87.up.railway.app/",
    repoUrl: "https://github.com/Aydexxx/taskflow",
    video: "/projects/taskflow.mp4",
    poster: "/projects/taskflow-poster.jpg",
    frontend: ["React", "TypeScript", "Socket.IO", "Tailwind CSS"],
    backend: [
      "Node.js",
      "Express",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Socket.IO",
      "JWT",
    ],
    whatItDoes:
      "Gerçek zamanlı bir Kanban ve proje yönetim aracı. Kartlar taşındıkça panolar tüm kullanıcılarda anlık güncellenir; çalışma alanları, bahsetmeler, bildirimler ve arama içerir. Üstünde global bir yapay zekâ asistanı var — çalışma alanlarını ve yetkilerini anlar, sorularını yanıtlar ve iş yapmana yardım eder.",
    whereItSits:
      "Gerçek zamanlı işbirlikçi SaaS (Linear, Notion, Trello) modern ekip araçlarının standart biçimi; gömülü bir yapay zekâ yardımcısı ise hızla olmazsa olmaz hâline geliyor. TaskFlow ikisini birleştiriyor.",
  },
  {
    index: "03",
    slug: "larajob",
    name: "LaraJob",
    tagline: "Uyumu gerçekten anlayan, yapay zekâ destekli bir iş ilanı platformu.",
    liveUrl: "https://larajob-production.up.railway.app/",
    repoUrl: "https://github.com/Aydexxx/larajob",
    video: "/projects/larajob.mp4",
    poster: "/projects/larajob-poster.jpg",
    frontend: ["Laravel Blade", "Vite", "Tailwind CSS"],
    backend: [
      "Laravel (PHP 8.4)",
      "PostgreSQL + pgvector",
      "Queue workers",
      "OpenAI",
    ],
    whatItDoes:
      "Anlamsal arama ve açıklamalı yapay zekâ eşleştirmesi olan bir iş ilanı sitesi. İlanları ve profilleri vektör olarak gömer (pgvector) ve rolleri anahtar kelimeyle değil anlamla sıralar; dürüst bir uyum skoru ile ‘neden uyuyorsun’ ve ‘açığı kapat’ gerekçelerini gösterir. Ayrıca yüklenen CV’den profili otomatik doldurur ve işverenler için adayları sıralar.",
    whereItSits:
      "İşe alım teknolojisi embedding’ler ve büyük dil modelleri üzerine yeniden kuruluyor. pgvector tabanlı anlamsal arama, modern yapay zekâ aramasını ve RAG’i güçlendiren desenin aynısı — LaraJob bunu işe alımın ucundan ucuna uyguluyor.",
  },
  {
    index: "04",
    slug: "tunlr",
    name: "Tunlr",
    tagline: "Kendi sunucunda çalışan tünel servisi — local'ini internete aç.",
    repoUrl: "https://github.com/Aydexxx/tunlr",
    video: "/projects/tunlr.mp4",
    poster: "/projects/tunlr-poster.jpg",
    frontend: ["React", "TypeScript", "Tailwind CSS", "SSE"],
    backend: ["Go", "yamux", "Let's Encrypt (DNS-01)", "WebSocket", "SQLite"],
    whatItDoes:
      "Kendi sunucunda barındırılan bir tünel servisi — ngrok ya da Cloudflare Tunnel gibi. Bilgisayarındaki bir servisi (localhost) hiçbir port yönlendirmesi olmadan internete açar: client dışarı bağlanır, gelen istekler tünel üzerinden geri taşınır, böylece NAT ya da güvenlik duvarı arkasında bile çalışır. Her tünel kendi alt alan adını ve geçerli bir wildcard TLS sertifikasını alır. Üstünde canlı bir istek inceleyici var — tünelden geçen her isteği ve yanıtı başlıkları, gövdesi ve süresiyle gösterir, yakalanan bir isteği tek tıkla yeniden oynatır.",
    whereItSits:
      "Geliştirici altyapı araçları (ngrok, Cloudflare Tunnel) modern geliştirmenin sessiz ama vazgeçilmez katmanı — webhook test etmekten local'i paylaşmaya kadar. Reverse tunneling, TLS sonlandırma ve akış çoğullama (multiplexing) bu araçların çekirdeği; Tunlr bunları Go ile sıfırdan kuruyor, gerçek bir sunucuda wildcard TLS ile canlı çalıştığı doğrulandı ve kendi sunucunda barındırılabilir bir alternatif sunuyor.",
  },
];
