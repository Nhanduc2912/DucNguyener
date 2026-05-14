// ─── PORTFOLIO DATA ────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: "Nguyễn Trần Nhân Đức",
  handle: "DucNguyener",
  dob: "29/12/2008",
  school: "FPT Polytechnic Đà Nẵng",
  major: "Phát triển phần mềm",
  year: "Năm cuối",
  internship: {
    place: "Bảo Tàng Đà Nẵng",
    from: "11/05/2026",
    to: "~07/2026",
  },
  email: "nhanduc29122008@gmail.com",
  github: "https://github.com/Nhanduc2912",
  facebook: "https://www.facebook.com/ucnguyen.26984",
  cv: "https://www.canva.com/design/DAHF26LXsX8/bshwPpbfdvxwCEhMHmlC_A/edit",
  domain: "https://ducnguyener.top",
};

export const NAV_LINKS = [
  { label: "Về tôi", href: "#about" },
  { label: "Hành trình", href: "#timeline" },
  { label: "Kỹ năng", href: "#techstack" },
  { label: "Dự án", href: "#projects" },
  { label: "Chứng chỉ", href: "#certificates" },
  { label: "Liên hệ", href: "#contact" },
];

export const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full-stack Builder",
  "Vue.js Enthusiast",
  "ASP.NET Developer",
  "Game Scripter (Lua)",
];

export const TIMELINE = [
  {
    year: "2021",
    title: "Bắt đầu hành trình",
    description:
      "Khám phá thế giới công nghệ lúc học lớp 7. Bắt đầu tìm hiểu về Lua và lập trình game trên Roblox — đây là ngọn lửa đầu tiên.",
    tags: ["Lua", "Roblox", "Game Dev"],
    icon: "🎮",
    side: "left",
  },
  {
    year: "2022",
    title: "Làm quen với Web",
    description:
      "Bị hút vào cách website được tạo ra. Học HTML và CSS từ đầu, ước mơ xây dựng một trang web cho riêng mình.",
    tags: ["HTML", "CSS", "Web Basics"],
    icon: "🌐",
    side: "right",
  },
  {
    year: "2023",
    title: "Mở rộng ngôn ngữ",
    description:
      "Học thêm C, C++, C#, Python, PHP và JavaScript. Bắt đầu hiểu tư duy lập trình theo kiểu hệ thống và thuật toán.",
    tags: ["C", "C++", "C#", "Python", "PHP", "JavaScript"],
    icon: "💻",
    side: "left",
  },
  {
    year: "2024",
    title: "Git, GitHub & An ninh mạng",
    description:
      "Tiếp cận Git/GitHub để quản lý code chuyên nghiệp. Tìm hiểu về an ninh mạng, Kali Linux và các công cụ pentest.",
    tags: ["Git", "GitHub", "Kali Linux", "Cybersecurity", "Python"],
    icon: "🔐",
    side: "right",
  },
  {
    year: "2025",
    title: "Framework & Fullstack",
    description:
      "Bắt đầu sử dụng framework frontend (Vue, React), học SQL Server và xây dựng ứng dụng fullstack đầu tiên với Flask và ASP.NET.",
    tags: ["Vue.js", "React", "SQL Server", "Flask", "ASP.NET"],
    icon: "🚀",
    side: "left",
  },
  {
    year: "2026",
    title: "Docker, Deploy & AI Agent",
    description:
      "Triển khai Docker, Vercel, Render. Ứng dụng AI Agent vào lập trình để tăng tốc độ phát triển. Thực tập tại Bảo Tàng Đà Nẵng.",
    tags: ["Docker", "Vercel", "Render", "AI Agent", "Claude", "Gemini"],
    icon: "🤖",
    side: "right",
  },
];

export const TECH_STACK = [
  // Languages
  { name: "Python", icon: "logos:python", url: "https://python.org", category: "Language" },
  { name: "JavaScript", icon: "logos:javascript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", category: "Language" },
  { name: "TypeScript", icon: "logos:typescript-icon", url: "https://typescriptlang.org", category: "Language" },
  { name: "C", icon: "devicon:c", url: "https://en.wikipedia.org/wiki/C_(programming_language)", category: "Language" },
  { name: "C++", icon: "logos:c-plusplus", url: "https://cplusplus.com", category: "Language" },
  { name: "HTML", icon: "logos:html-5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", category: "Language" },
  { name: "CSS", icon: "logos:css-3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", category: "Language" },
  { name: "Lua", icon: "logos:lua", url: "https://lua.org", category: "Language" },
  // Frontend
  { name: "React", icon: "logos:react", url: "https://react.dev", category: "Frontend" },
  { name: "Vue", icon: "logos:vue", url: "https://vuejs.org", category: "Frontend" },
  { name: "Bootstrap", icon: "logos:bootstrap", url: "https://getbootstrap.com", category: "Frontend" },
  { name: "Tailwind", icon: "logos:tailwindcss-icon", url: "https://tailwindcss.com", category: "Frontend" },
  { name: "Vite", icon: "logos:vitejs", url: "https://vitejs.dev", category: "Frontend" },
  // Backend
  { name: "Node.js", icon: "logos:nodejs-icon", url: "https://nodejs.org", category: "Backend" },
  { name: "ASP.NET", icon: "logos:dotnet", url: "https://dotnet.microsoft.com", category: "Backend" },
  { name: ".NET", icon: "logos:dotnet", url: "https://dotnet.microsoft.com", category: "Backend" },
  { name: "WinForm", icon: "devicon:csharp", url: "https://learn.microsoft.com/en-us/dotnet/desktop/winforms/", category: "Backend" },
  { name: "WPF", icon: "devicon:csharp", url: "https://learn.microsoft.com/en-us/dotnet/desktop/wpf/", category: "Backend" },
  // Database
  { name: "SQL Server", icon: "devicon:microsoftsqlserver", url: "https://microsoft.com/sql-server", category: "Database" },
  { name: "MongoDB", icon: "logos:mongodb-icon", url: "https://mongodb.com", category: "Database" },
  // DevOps / Tools
  { name: "Docker", icon: "logos:docker-icon", url: "https://docker.com", category: "DevOps" },
  { name: "Git", icon: "logos:git-icon", url: "https://git-scm.com", category: "DevOps" },
  { name: "GitHub", icon: "logos:github-icon", url: "https://github.com", category: "DevOps" },
  { name: "Postman", icon: "logos:postman-icon", url: "https://postman.com", category: "DevOps" },
  { name: "VS Code", icon: "logos:visual-studio-code", url: "https://code.visualstudio.com", category: "Tools" },
  { name: "Linux", icon: "logos:linux-tux", url: "https://kernel.org", category: "OS" },
  { name: "Ubuntu", icon: "logos:ubuntu", url: "https://ubuntu.com", category: "OS" },
  { name: "Windows", icon: "logos:microsoft-windows-icon", url: "https://microsoft.com/windows", category: "OS" },
  // Deploy
  { name: "Vercel", icon: "logos:vercel-icon", url: "https://vercel.com", category: "Deploy" },
  { name: "Render", icon: "simple-icons:render", url: "https://render.com", category: "Deploy" },
  // AI
  { name: "Claude", icon: "simple-icons:anthropic", url: "https://anthropic.com", category: "AI" },
  { name: "Gemini", icon: "logos:google-icon", url: "https://gemini.google.com", category: "AI" },
];

export const PROJECTS = [
  {
    id: "pos36",
    name: "POS36",
    title: "POS36 – Hệ thống Quản lý Nhà hàng",
    description:
      "Hệ thống Point-of-Sale (POS) ứng dụng Real-time để đồng bộ trạng thái đơn hàng ngay lập tức giữa các bộ phận trong nhà hàng. Sử dụng SignalR để cập nhật trực tiếp không cần refresh trang.",
    longDesc:
      "Phát triển từ đầu với Vue.js frontend và ASP.NET Core backend. Tích hợp SignalR cho real-time sync, SQL Server cho database và hỗ trợ đa vai trò (Thu ngân, Bếp, Manager).",
    tags: ["Vue.js", "ASP.NET Core", "C#", "SignalR", "SQL Server"],
    tagColor: "#0ea5e9",
    github: "https://github.com/Nhanduc2912/POS36",
    icon: "🍜",
    stat: "Vue 63.7% · C# 33.8%",
    featured: true,
    badge: "⭐ Tự hào nhất",
    color: "#0ea5e9",
  },
  {
    id: "ftd",
    name: "FTD",
    title: "FTD – Quản lý Tài chính Thông minh",
    description:
      "Ứng dụng quản lý tài chính cá nhân thông minh, theo dõi chi tiêu, quản lý các gói thuê và đăng ký dịch vụ. Giao diện hiện đại với dashboard trực quan.",
    longDesc:
      "Full-stack app với React frontend và Node.js/Express backend. Tích hợp biểu đồ chi tiêu theo tháng, phân loại giao dịch và báo cáo tài chính tự động.",
    tags: ["React", "Node.js", "MongoDB", "JavaScript"],
    tagColor: "#10b981",
    github: "https://github.com/Nhanduc2912/FTD",
    icon: "💰",
    stat: "React + Node.js + MongoDB",
    featured: false,
    color: "#10b981",
  },
  {
    id: "nhatrotot",
    name: "NhàTrọ Tốt",
    title: "NhàTrọ Tốt – Quản lý & Tìm phòng",
    description:
      "Nền tảng cho sinh viên tìm phòng trọ và thuê nhà. Bao gồm hệ thống quản lý dành cho chủ trọ và giao diện tìm kiếm thân thiện cho sinh viên.",
    longDesc:
      "Xây dựng với ASP.NET Core MVC, SQL Server. Hỗ trợ đăng tin phòng trọ, tìm kiếm theo khu vực, lọc theo giá và diện tích.",
    tags: ["ASP.NET Core", "C#", "SQL Server", "MVC"],
    tagColor: "#8b5cf6",
    github: "https://github.com/Nhanduc2912/NhoTroTot",
    icon: "🏠",
    stat: "ASP.NET Core MVC",
    featured: false,
    color: "#8b5cf6",
  },
  {
    id: "tinblog",
    name: "TIN-blog",
    title: "TINBlog – Nền tảng Blog",
    description:
      "Trang blog hiện đại được xây dựng với Vue 3 + Vite. Hỗ trợ đăng bài, quản lý nội dung và giao diện thân thiện với người dùng.",
    longDesc:
      "Sử dụng Vue 3 Composition API, Vite build tool. Responsive design, dark mode và hỗ trợ Markdown cho bài viết.",
    tags: ["Vue 3", "Vite", "JavaScript", "CSS"],
    tagColor: "#f59e0b",
    github: "https://github.com/Nhanduc2912/tin-blog",
    icon: "📝",
    stat: "Vue 3 + Composition API",
    featured: false,
    color: "#f59e0b",
  },
  {
    id: "techstore",
    name: "TechStore",
    title: "TechStore – Cửa hàng Công nghệ",
    description:
      "Website thương mại điện tử bán thiết bị công nghệ, xây dựng bằng ASP.NET Core C# theo mô hình MVC. Bài tập lớn cuối kỳ FPT Polytechnic.",
    longDesc:
      "Theo mô hình MVC với đầy đủ chức năng: giỏ hàng, thanh toán, quản lý sản phẩm và admin panel.",
    tags: ["ASP.NET Core", "C#", "HTML/CSS", "MVC", "SQL Server"],
    tagColor: "#ef4444",
    github: "https://github.com/Nhanduc2912/techstore",
    icon: "💻",
    stat: "HTML 65% · C# 33.3%",
    featured: false,
    color: "#ef4444",
  },
];

export const CERTIFICATES = [
  {
    title: "Build with AI",
    issuer: "Google",
    year: "2025",
    description: "Chứng chỉ về xây dựng ứng dụng tích hợp AI từ Google. Bao gồm kiến thức về Google AI APIs, Gemini và ứng dụng AI trong phát triển phần mềm.",
    icon: "logos:google-icon",
    color: "#4285F4",
    badge: "🎓 Google Certified",
  },
  {
    title: "Hackathon FPTU 2025",
    issuer: "FPT University",
    year: "2025",
    description: "Giấy chứng nhận tham gia Hackathon tại FPT University 2025. Trải nghiệm làm việc nhóm dưới áp lực và giải quyết bài toán thực tế trong thời gian giới hạn.",
    icon: "logos:fpt",
    color: "#FF6B35",
    badge: "🏆 Hackathon",
  },
  {
    title: "Thực tập tại Bảo Tàng Đà Nẵng",
    issuer: "Bảo Tàng Đà Nẵng",
    year: "2026",
    description: "Thực tập kỹ sư phần mềm tại Bảo Tàng Đà Nẵng từ 11/05/2026 đến 19/07/2026. Tham gia phát triển và duy trì hệ thống thông tin của bảo tàng.",
    icon: "emojione:classical-building",
    color: "#10b981",
    badge: "💼 Internship · 11/05/2026 – 19/07/2026",
  },
];
;
