# PDF Report Generator

Aplikasi web untuk generate laporan PDF dengan form input yang interaktif, validasi real-time, dan history management menggunakan localStorage.

## 🛠️ Tech Stack

- **Framework**: Nuxt 3.14.1592
- **UI Library**: Vue 3 (Composition API)
- **Styling**: Tailwind CSS v3
- **PDF Generation**: jsPDF
- **Language**: TypeScript
- **Build Tool**: Vite

## ✨ Fitur Utama

- ✅ Form input dengan 4 tipe komponen (Dropdown, Text Input, Textarea, Currency Input)
- ✅ Validasi real-time dengan error highlighting
- ✅ Currency input dengan format Rupiah (Rp 1.000.000)
- ✅ Character counter untuk text fields
- ✅ Button generate PDF dengan loading state
- ✅ Toast notification (success/error feedback)
- ✅ History table dengan localStorage persistence
- ✅ Detail modal dengan download PDF functionality
- ✅ Konfirmasi delete dengan popup
- ✅ Responsive design
- ✅ Clean code architecture (Composables pattern)

## 📋 Prasyarat

Pastikan sudah terinstall:

- **Node.js** versi 18.x atau lebih tinggi
- **npm** atau **yarn** atau **pnpm**

## 🚀 Cara Instalasi

1. Clone repository

```bash
git clone <repository-url>
cd pdf-report-generator
```

2. Install dependencies

```bash
npm install
```

## 🏃 Cara Menjalankan Project

### Development Mode

```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:3000`

### Production Build

```bash
# Build aplikasi
npm run build

# Preview hasil build
npm run preview
```

### Generate Static Site

```bash
npm run generate
```

## 📂 Struktur Project

```
pdf-report-generator/
├── app.vue                 # Root component
├── components/             # UI Components
│   ├── ReportHeader.vue
│   ├── ReportFormSection.vue
│   ├── ReportTableSection.vue
│   └── ToastNotification.vue
├── composables/            # Reusable logic
│   ├── useReportForm.ts
│   ├── useReportFormSection.ts
│   ├── useReportHistory.ts
│   ├── useReportTableSection.ts
│   └── useToast.ts
├── assets/
│   └── css/
│       └── main.css        # Global styles
├── public/
│   └── assets/
│       └── images/         # Static assets
├── nuxt.config.ts          # Nuxt configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 📝 Cara Penggunaan

1. **Isi Form:**
   - Pilih ukuran halaman (A4/A5/Letter)
   - Masukkan judul laporan (min 5 karakter)
   - Isi deskripsi (min 10 karakter, 4 baris)
   - Input nominal dalam Rupiah

2. **Generate PDF:**
   - Tombol akan aktif jika semua field valid
   - Klik "Generate PDF" untuk submit
   - Loading indicator akan muncul
   - Toast notifikasi sukses akan tampil
   - Data otomatis masuk ke history table

3. **Kelola History:**
   - Klik "View" untuk melihat detail dan download PDF
   - Klik "Delete" untuk hapus data (dengan konfirmasi)
   - Data tersimpan di localStorage browser

## 🎨 Fitur Validasi

- **Page Size**: Required, harus pilih salah satu opsi
- **Judul**: Required, minimal 5 karakter
- **Deskripsi**: Required, minimal 10 karakter
- **Nominal**: Required, hanya angka, format Rupiah otomatis

## 🔧 Scripts Available

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run generate   # Generate static site
npm run preview    # Preview production build
npm run postinstall # Prepare Nuxt (auto-run after install)
```

## 📦 Dependencies

### Production

- `nuxt`: ^3.14.1592
- `vue`: latest
- `jspdf`: PDF generation library

### Development

- `@nuxt/devtools`: latest
- `tailwindcss`: ^3.4.19
- `autoprefixer`: ^10.4.24
- `postcss`: ^8.5.6
- `typescript`: latest

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📄 License

MIT

## 👨‍💻 Author

Developed with ❤️ using Nuxt 3 + Vue 3 + Tailwind CSS
