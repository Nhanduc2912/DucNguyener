<div align="center">

<img src="public/favicon.svg" width="80" height="80" alt="DucNguyener Logo" />

# DucNguyener — Portfolio

**Nguyễn Trần Nhân Đức** · Fullstack Developer · FPT Polytechnic Đà Nẵng

[![Deploy Status](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://ducnguyener.top)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=flat-square&logo=three.js)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

🌐 **Live:** [ducnguyener.top](https://ducnguyener.top)

</div>

---

## ✨ Tính năng nổi bật

| Tính năng | Mô tả |
|---|---|
| 🎮 **3D Anime Avatar** | Nhân vật 3D anime-ish với kính, theo dõi con trỏ chuột, blink animation |
| 🌐 **TechStack 3D Globe** | Quả cầu 3D với 34 công nghệ, kéo để xoay, click để mở docs |
| ⚡ **Smooth Scroll** | Lenis smooth scroll toàn trang |
| 🧲 **Magnetic Buttons** | Nút từ tính hút theo cursor |
| 🔤 **Text Scramble** | Hiệu ứng chữ xáo trộn khi loading |
| ✨ **Particle Effects** | Particles nền động |
| 🎯 **Custom Cursor** | Cursor tùy chỉnh với lag effect |
| 📜 **Timeline** | Hành trình học tập 2021–2026 |
| 🏆 **Flip Cards** | Chứng chỉ với hiệu ứng 3D flip |
| 🎊 **Easter Egg** | Konami Code → confetti explosion |
| 📱 **Responsive** | Tối ưu cho mobile, tablet, desktop |

---

## 🛠️ Tech Stack

```
Frontend:   React 19 · Vite · Tailwind CSS · Framer Motion
3D:         Three.js · @react-three/fiber · @react-three/drei
Animation:  GSAP · Lenis · tsParticles
Icons:      @iconify/react · Lucide React
Deploy:     Vercel · GitHub Actions CI/CD
```

---

## 🚀 Chạy local

```bash
# Clone repository
git clone https://github.com/Nhanduc2912/DucNguyener.git
cd DucNguyener

# Cài dependencies
npm install

# Chạy dev server
npm run dev

# Build production
npm run build
```

Mở trình duyệt tại `http://localhost:5173`

---

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── 3d/
│   │   ├── AnimeAvatar.jsx    # 3D anime character (Three.js)
│   │   └── TechGlobe.jsx      # 3D rotating tech globe
│   ├── sections/
│   │   ├── Hero.jsx           # Hero + avatar
│   │   ├── Timeline.jsx       # Learning journey 2021-2026
│   │   ├── TechStack.jsx      # Tech stack section
│   │   ├── Projects.jsx       # Projects showcase
│   │   ├── Certificates.jsx   # Certificates & internship
│   │   └── Contact.jsx        # Contact & footer
│   ├── CustomCursor.jsx       # Custom cursor
│   ├── EasterEgg.jsx          # Konami code easter egg
│   ├── LoadingScreen.jsx      # Loading screen
│   └── Navbar.jsx             # Floating glass navbar
├── data/
│   └── portfolio.js           # All portfolio data
├── hooks/
│   ├── useLenis.js            # Smooth scroll
│   ├── useMagneticEffect.js   # Magnetic button
│   └── useTextEffects.js      # Scramble + typing
├── App.jsx
├── main.jsx
└── index.css                  # Design system (CSS vars, glass, neo)
```

---

## 🎯 Dự án nổi bật

| Project | Tech | Link |
|---|---|---|
| **POS36** ⭐ | Vue.js · ASP.NET · SignalR | [GitHub](https://github.com/Nhanduc2912/POS36) |
| **FTD** | React · Node.js · MongoDB | [GitHub](https://github.com/Nhanduc2912/FTD) |
| **NhàTrọ Tốt** | ASP.NET Core · SQL Server | [GitHub](https://github.com/Nhanduc2912/NhoTroTot) |
| **TIN-blog** | Vue 3 · Vite | [GitHub](https://github.com/Nhanduc2912/tin-blog) |
| **TechStore** | ASP.NET MVC · C# | [GitHub](https://github.com/Nhanduc2912/techstore) |

---

## 📬 Liên hệ

- **Email:** [nhanduc29122008@gmail.com](mailto:nhanduc29122008@gmail.com)
- **GitHub:** [@Nhanduc2912](https://github.com/Nhanduc2912)
- **Facebook:** [DucNguyener](https://www.facebook.com/ucnguyen.26984)
- **Website:** [ducnguyener.top](https://ducnguyener.top)

---

<div align="center">
  <p>Built with ❤️ by <strong>DucNguyener</strong> · © 2026</p>
  <p><em>Tip: Thử nhập ↑↑↓↓←→←→BA trên portfolio để tìm Easter Egg 🎮</em></p>
</div>
