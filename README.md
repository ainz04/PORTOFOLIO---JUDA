# Personal Portfolio (Next.js + Tailwind CSS + Framer Motion)

Website portofolio minimalis monokrom (Light & Dark mode, default Dark) dengan dukungan dwibahasa **ID / EN**, animasi Framer Motion, dan fitur interaktif lengkap.

## Fitur Utama
- **Preloader Screen** (`0% → 100%` ease-out progress bar)
- **Floating Pill Navbar** dengan scrollspy aktif, tombol **ID / EN**, toggle **Light / Dark**, dan drawer mobile
- **Hero Section** dengan status badge berkedip, animasi *typewriter*, tombol CTA (*Explore Work* & *Download CV*), 3 *floating badges*, dan **Music Player Overlay** dengan seekbar serta lirik sinkron `.lrc`
- **Infinite Marquee Strip** (berhenti saat di-hover)
- **About Me (Bento Grid 3 Kolom)** lengkap dengan Music Player overlay & Informasi Personal
- **Education & Work Experience Timeline** dengan garis progress mengikuti scroll
- **Tech Stack Section** terkategori (*Frontend, Backend, Databases, DevOps*)
- **Selected Works** dengan 3 tab (*Projects, Awards, Experience*), kartu bergaya jendela macOS, tombol *View More* (desktop), dan *draggable auto-scroll carousel* (mobile)
- **Contact & Footer** dengan embed Google Maps, kartu kontak interaktif, dan tombol *Back to Top*

## Cara Menjalankan
```bash
npm install
npm run dev
```
Lalu buka `http://localhost:3000`.

## Cara Mengganti Data Diri, Foto, & Musik
1. **Semua teks, profil, pengalaman, proyek, penghargaan, dan kontak** terpusat di satu file:
   `src/data/portfolio.ts`
2. **Foto & Thumbnail**: ganti file di folder `public/images/` (`hero/`, `about/`, `projects/`, `awards/`, `experience/`), lalu sesuaikan path di `src/data/portfolio.ts`.
3. **Musik & Lirik Sinkron**: masukkan file `.mp3` dan `.lrc` Anda ke `public/audio/` lalu daftarkan pada `HERO_TRACKS` / `ABOUT_TRACKS` di `src/data/portfolio.ts`.
4. **File CV**: letakkan file CV (`.pdf` / `.jpg`) di `public/cv/` lalu ubah `SITE_CONFIG.cvHref` di `src/data/portfolio.ts`.
