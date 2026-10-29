# Product Requirements Document (PRD)
# Platform Media Sosial Berbasis Teks ("Threads" + "GitHub" ATM untuk Publik Umum)

- **Document Version:** 2.0.0
- **Status:** Approved / Active Specification
- **Target Audience:** **Publik Umum (General Audience)** — Penulis, kreator konten, pengamat tren, komunitas diskusi, dan masyarakat luas penikmat percakapan teks.
- **Konsep Desain:** ATM (Amati, Tiru, Modifikasi) perpaduan kesederhanaan percakapan **Meta Threads** dan ketegasan interaksi ekspresif **GitHub**.
- **Tech Stack:** React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Golang (Microservices - Clean Architecture), PostgreSQL, Drizzle ORM, Redis, NATS.

---

## 1. Executive Summary & Penyatuan Persepsi

### 1.1 Visi Produk untuk Pengguna Umum (General Audience)
Membangun platform media sosial berbasis teks yang **cepat, bersih, minim distraksi, dan inklusif untuk semua kalangan masyarakat**. Platform ini didesain sebagai ruang percakapan publik yang mengutamakan kedalaman ide, cerita (*storytelling*), guyonan santai, opini, hingga diskusi topik hangat harian.

### 1.2 Penyatuan Konsep ATM (Threads × GitHub untuk Publik Umum)

```
┌────────────────────────────────────────────────────────────────────────┐
│                          META THREADS (Inspirasi)                      │
│  - Lebar feed terpusat (600px) yang nyaman dibaca di mobile/desktop     │
│  - Garis konektor visual vertikal yang menyambungkan alur percakapan   │
│  - Alur compose "utas bersambung" (cascading thread) yang instan       │
│  - Navigasi tab simpel: "Untuk Anda" (For You) & "Mengikuti" (Following)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼ DIPADUKAN DENGAN
┌────────────────────────────────────────────────────────────────────────┐
│                             GITHUB (Inspirasi)                         │
│  - 8 Reaksi Emoji Ekspresif (👍, 👎, 😄, 🎉, 😕, ❤️, 🚀, 👀)           │
│    Solusi saat "Hati/Like" saja tidak cukup untuk mengekspresikan opini │
│  - Format Teks Cepat & Rapi (Tebal, Miring, Kutipan/Quote, Bullet List) │
│  - Activity Matrix / Daily Streak (Gamifikasi konsistensi berinteraksi)│
│  - Desain modern dengan border 1px yang rapi, presisi & elegan         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼ HASIL MODIFIKASI
┌────────────────────────────────────────────────────────────────────────┐
│        "A MODERN, INTUITIVE & EXPRESSIVE TEXT SOCIAL NETWORK"          │
│    Sosial media teks ramah publik yang elegan, super cepat (p95 <80ms),│
│    memiliki ragam reaksi ekspresif, dan hierarki obrolan yang jelas.   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. User Personas (Kalangan Umum)

1. **The Casual Storyteller / Threader:** Pengguna yang suka menulis cerita bersambung, pengalaman pribadi (*story of my life*), utas edukasi populer, resep, atau analisis film/buku.
2. **The Trend Commentator & Debater:** Pengguna yang aktif menanggapi isu hangat, berita terkini, politik santai, sepak bola, dan budaya pop.
3. **The Daily Journaler / Expressive Poster:** Pengguna yang membagikan pemikiran singkat harian, guyonan (*meme/jokes*), kata mutiara, atau uneg-uneg singkat.
4. **The Curious Reader (Silent Consumer):** Pengguna yang lebih banyak membaca, menikmati alur obrolan yang rapi, dan merespons menggunakan reaksi emoji instan.

---

## 3. Core Features & Functional Requirements

### 3.1 Akun & Autentikasi Mudah (Auth & User Service)
| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| AUTH-01 | Login Multi-Metode | Login 1-klik via Google, GitHub (opsional untuk akun teknologi), atau Email Magic Link & Password. | P0 |
| AUTH-02 | Profil Publik & Handle `@username` | Handle unik `@username`, Nama Tampilan, Bio (160 char), Link, Foto Profil, dan Banner. | P0 |
| AUTH-03 | Aktivitas & Streak Harian | Matriks aktivitas visual di profil pengguna (ala GitHub heatmap / Duolingo streak) yang mencatat konsistensi partisipasi harian. | P1 |
| AUTH-04 | Social Graph | Follow / Unfollow akun, daftar Pengikut (*Followers*) dan Mengikuti (*Following*). | P0 |

### 3.2 Pembuatan Konten & Threading (Post & Thread Service)
| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| POST-01 | Tulis Postingan (Max 500 Karakter) | Input teks bersih dengan counter karakter interaktif. Mendukung penulisan utas bersambung (*cascading threads*) dalam satu kali kirim. | P0 |
| POST-02 | Format Teks Ringan (Light Markdown) | Mendukung format alami: **Tebal**, *Miring*, coret, kutipan (`>`), daftar poin, dan tautan otomatis. | P0 |
| POST-03 | Lampiran Gambar & Media | Unggah hingga 4 foto per postingan (JPEG/PNG/WebP, kompresi otomatis) dengan galeri grid responsif. | P0 |
| POST-04 | Pohon Percakapan Berantai (Reply Tree) | Balasan dihubungkan dengan garis vertikal visual (*Threads connector line*). Memudahkan melihat konteks siapa membalas siapa. | P0 |
| POST-05 | Mention & Hashtag Interaktif | Deteksi otomatis `@username` untuk men-tag teman dan `#topik` untuk topik obrolan. | P1 |

### 3.3 Sistem Interaksi Ekspresif (Interaction Service)
| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| REACT-01 | Bar 8 Reaksi Emoji (GitHub ATM) | Menyediakan 8 reaksi instan: `👍` (Setuju), `👎` (Tidak Setuju), `😄` (Lucu), `🎉` (Selamat/Hore), `😕` (Bingung), `❤️` (Suka), `🚀` (Keren/Semangat), dan `👀` (Menarik/Pantau). | P0 |
| REACT-02 | Repost & Quote Post | Mengunggah ulang post ke feed pengikut sendiri, atau menambahkan opini pribadi di atas post asli (*Quote*). | P0 |
| REACT-03 | Simpan Postingan (Bookmarks) | Menyimpan postingan favorit ke daftar bacaan pribadi yang dapat diakses kapan saja. | P1 |
| REACT-04 | Bagikan (Share Link) | Salin tautan permanen (*permalink*) atau gunakan menu Share native browser pada ponsel. | P1 |

### 3.4 Feed & Navigasi (Timeline Service)
| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| FEED-01 | Tab "Untuk Anda" vs "Mengikuti" | Tab *sticky* di bagian atas layar: "Mengikuti" untuk urutan kronologis murni, dan "Untuk Anda" untuk postingan tren & rekomendasi. | P0 |
| FEED-02 | Infinite Scroll Cepat & Mulus | Pemuatan feed tanpa putus dengan paginasi berbasis kursor dan *virtual list* agar HP/laptop tidak panas atau lemot. | P0 |
| FEED-03 | Notifikasi Postingan Baru | Indikator melayang (*pill banner*) "Postingan Baru Muncul" saat ada aktivitas terbaru dari orang yang diikuti via WebSocket. | P1 |

### 3.5 Navigasi Pintar & Aksesibilitas
| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| NAV-01 | Navigasi Ponsel (Bottom Navigation Bar) | Di layar ponsel: bilah navigasi bawah (Home, Cari, Tulis, Notifikasi, Profil). | P0 |
| NAV-02 | Pencarian Topik & Akun | Bilah pencarian cepat untuk mencari teman, topik, atau kata kunci populer. | P0 |
| NAV-03 | Pintasan Keyboard Opsional (Desktop Power-User) | Tombol cepat untuk pengguna desktop: `j`/`k` (pindah post), `c` (tulis baru), `r` (balas). | P2 |

---

## 4. UI/UX Design System (Untuk Publik Umum)

### 4.1 Gaya Visual & Tampilan Antarmuka
- **Sentuhan Desain:** Elegan, bersih, modern, dan tidak melelahkan mata. Menghindari elemen visual yang terlalu teknis/kaku, diganti dengan tipografi ramah (*approachable*) dan ikonografi bersahabat dari Lucide Icons.
- **Pilihan Tema:**
  - **Dark Mode (Default):** Menggunakan warna gelap lembut berkelas `#0F141C` (bukan hitam pekat pekat) dengan kartu berlatar `#161D27` dan border halus `#273142`.
  - **Light Mode:** Latar belakang putih bersih `#FFFFFF` dengan kartu abu-abu lembut `#F8FAFC` dan border `#E2E8F0`.
- **Interaksi Emoji:** Saat pengguna menekan lama tombol like atau menekan ikon reaksi, muncul bar melayang halus berisi 8 emoji pilihan yang membesar dengan animasi halus (*spring animation*).

---

## 5. Technical Architecture & Database

### 5.1 Skema Inti (Drizzle PostgreSQL)
```typescript
// users: id, username, displayName, email, avatarUrl, bio, createdAt
// posts: id, authorId, content, replyToPostId, rootPostId, depthLevel, repliesCount, repostsCount, reactionsCount
// reactions: id, userId, postId, reactionType ('THUMBS_UP' | 'THUMBS_DOWN' | 'LAUGH' | 'HOORAY' | 'CONFUSED' | 'HEART' | 'ROCKET' | 'EYES')
// user_daily_activity: userId, activityDate, postCount, replyCount, reactionCount (untuk streak harian)
// follows: followerId, followingId, createdAt
```

### 5.2 Standar Kinerja (Non-Functional Requirements)
- **Latensi Feed:** Pemuatan feed p95 < 80ms didukung oleh Redis cache dan *cursor pagination*.
- **Rendering 60 FPS:** Menggunakan `@tanstack/react-virtual` agar konsumsi memori browser di ponsel tetap ringan (< 50MB).
- **Backend Clean Architecture:** Golang microservices berkinerja tinggi, menjamin konsumsi CPU dan RAM server sangat efisien saat melayani ribuan pengguna serentak.
