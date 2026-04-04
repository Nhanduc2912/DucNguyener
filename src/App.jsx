import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  ExternalLink,
  Menu,
  X,
  Download,
  Code2,
  Cpu,
  Database,
  Zap,
  Sparkles,
  ChevronDown,
  User,
} from "lucide-react";

// GitHub SVG icon (lucide-react v1 doesn't export Github)
function Github({ size = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Về tôi", href: "#about" },
  { label: "Kỹ năng", href: "#skills" },
  { label: "Dự án", href: "#projects" },
  { label: "Liên hệ", href: "#contact" },
];

const SKILLS = [
  {
    icon: <Code2 size={28} />,
    title: "Frontend",
    color: "cyan",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/20",
    items: ["Vue.js", "React", "Tailwind CSS", "Bootstrap", "JavaScript"],
  },
  {
    icon: <Cpu size={28} />,
    title: "Backend",
    color: "emerald",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    items: ["ASP.NET Core", "C#", "Node.js", "REST API", "MVC Pattern"],
  },
  {
    icon: <Zap size={28} />,
    title: "Real-time",
    color: "amber",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "shadow-amber-500/20",
    items: ["SignalR", "WebSocket", "Live Order Sync", "Real-time Bidding"],
    badge: "⚡ Đã dùng trong 2 dự án thực tế",
  },
  {
    icon: <Database size={28} />,
    title: "Database & Tools",
    color: "purple",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "shadow-purple-500/20",
    items: ["SQL Server", "Entity Framework", "Git / GitHub", "Trello"],
  },
  {
    icon: <Sparkles size={28} />,
    title: "Điểm Đặc Biệt",
    color: "pink",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    text: "text-pink-400",
    glow: "shadow-pink-500/20",
    items: [
      "AI Integration (Ollama)",
      "Game Scripting (Luau)",
      "Roblox Studio",
      "Logic & Algorithm Thinking",
    ],
    badge: "🤖 Tech-savvy beyond Web Dev",
  },
];

const PROJECTS = [
  {
    name: "POS36",
    title: "POS36 – Hệ thống Quản lý Nhà hàng",
    description:
      "Hệ thống Point-of-Sale (POS) ứng dụng Real-time để đồng bộ trạng thái đơn hàng ngay lập tức giữa các bộ phận trong nhà hàng. Sử dụng SignalR để cập nhật trực tiếp không cần refresh trang.",
    tags: ["Vue.js", "ASP.NET Core", "C#", "SignalR", "SQL Server"],
    tagColor: "cyan",
    github: "https://github.com/Nhanduc2912/POS36",
    icon: "🍜",
    stat: "Vue 63.7% · C# 33.8%",
  },
  {
    name: "TIN-blog",
    title: "TINBlog – Nền tảng Blog",
    description:
      "Trang blog hiện đại được xây dựng với Vue 3 + Vite. Hỗ trợ đăng bài, quản lý nội dung và giao diện thân thiện với người dùng, được khuyến nghị dùng với Vue Devtools.",
    tags: ["Vue 3", "Vite", "JavaScript", "CSS"],
    tagColor: "emerald",
    github: "https://github.com/Nhanduc2912/TIN-blog",
    icon: "📝",
    stat: "Vue 3 + Composition API",
  },
  {
    name: "TechStore",
    title: "TechStore – Cửa hàng Công nghệ",
    description:
      "Trang web thương mại điện tử bán thiết bị công nghệ, xây dựng bằng ASP.NET Core C# theo mô hình MVC. Bài tập lớn cuối kỳ môn Lập trình Web tại FPT Polytechnic.",
    tags: ["ASP.NET Core", "C#", "HTML/CSS", "MVC", "SQL Server"],
    tagColor: "purple",
    github: "https://github.com/Nhanduc2912/TechStore",
    icon: "💻",
    stat: "HTML 65% · C# 33.3%",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useTypingEffect(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(
        () => setCharIdx((c) => c + 1),
        speed + Math.random() * 30
      );
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({ id, children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── TAG COLOR MAP ─────────────────────────────────────────────────────────────
const tagColorMap = {
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#070d1a]/90 backdrop-blur-xl border-b border-white/5 shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#about");
          }}
          className="text-xl font-bold gradient-text font-mono"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          NhanDuc.Dev
        </motion.a>

        {/* Desktop links */}
        <motion.div
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.href);
              }}
              className={`text-sm font-medium transition-colors duration-200 ${
                active === link.href
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.canva.com/design/DAHF26LXsX8/bshwPpbfdvxwCEhMHmlC_A/edit"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all text-sm shadow-lg shadow-cyan-500/30"
          >
            <Download size={14} />
            Tải CV
          </a>
        </motion.div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d1629]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className="text-slate-300 hover:text-cyan-400 font-medium transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://www.canva.com/design/DAHF26LXsX8/bshwPpbfdvxwCEhMHmlC_A/edit"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg w-fit text-sm"
              >
                <Download size={14} />
                Tải CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full-stack Builder",
    "Vue.js Enthusiast",
    "ASP.NET Developer",
  ];
  const typedRole = useTypingEffect(roles, 75, 1800);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-16 dot-grid overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-glow-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full py-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">

          {/* Text */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-mono"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Available for work · FPT Polytechnic Đà Nẵng
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="text-slate-300">Xin chào, tôi là</span>
              <br />
              <span className="gradient-text">Nhân Đức</span>
            </h1>

            <div className="h-10 flex items-center">
              <span className="text-xl md:text-2xl text-slate-400 font-mono">
                {typedRole}
                <span className="typing-cursor text-cyan-400 ml-0.5">|</span>
              </span>
            </div>

            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Sinh viên IT tại <span className="text-white font-semibold">FPT Polytechnic Đà Nẵng</span>.
              Tôi xây dựng ứng dụng web từ <span className="text-cyan-400">frontend mượt mà</span> đến{" "}
              <span className="text-emerald-400">backend vững chắc</span>, với điểm mạnh về{" "}
              <span className="text-amber-400">Real-time</span> và đam mê với công nghệ mới.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                Xem Dự Án →
              </a>

              <a
                href="https://github.com/Nhanduc2912"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold rounded-xl hover:border-cyan-500/50 hover:bg-slate-700/80 transition-all"
              >
                <Github size={18} />
                GitHub Profile
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 pt-4 border-t border-white/5">
              {[
                { value: "3+", label: "Dự án thực tế" },
                { value: "5+", label: "Công nghệ" },
                { value: "2024", label: "Bắt đầu code" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Avatar / Photo placeholder */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Rotating glow ring */}
            <div className="absolute inset-0 rounded-full" style={{
              background: "conic-gradient(from 0deg, #22d3ee, #3b82f6, #a855f7, #22d3ee)",
              borderRadius: "50%",
              animation: "border-spin 4s linear infinite",
              padding: "3px",
            }}>
              <div className="w-full h-full rounded-full bg-[#070d1a]" />
            </div>

            {/* Avatar container */}
            <div
              className="relative w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#070d1a] animate-float z-10"
              style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)" }}
            >
              {/* =====================================================
                  👇 THÊM ẢNH CỦA BẠN: Đặt file avatar.jpg vào /public/
                      Thay <User> bên dưới bằng:
                      <img src="/avatar.jpg" alt="Nhân Đức" className="w-full h-full object-cover" />
                  ===================================================== */}
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-slate-800/50">
                <div className="p-4 bg-slate-700/60 rounded-full">
                  <User size={56} className="text-slate-400" />
                </div>
                <div className="text-center px-4">
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    // Thêm ảnh của bạn
                    <br />
                    // vào <span className="text-cyan-400">/public/avatar.jpg</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2 z-20 shadow-xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <p className="text-xs text-slate-400 font-mono">const dev =</p>
              <p className="text-sm font-bold text-cyan-400">{"{ passionate: true }"}</p>
            </motion.div>

            <motion.div
              className="absolute -top-4 -left-4 bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-1.5 z-20 shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-xs text-amber-400 font-semibold">⚡ Real-time Dev</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-mono">scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <Section
      id="skills"
      className="py-24 relative"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-cyan-400 font-mono text-sm mb-2">{"// skills & expertise"}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Công Nghệ Cốt Lõi
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } },
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative bg-slate-900/60 p-6 rounded-2xl border ${skill.border} hover:shadow-xl hover:${skill.glow} transition-all duration-300 group overflow-hidden`}
            >
              {/* Background glow */}
              <div className={`absolute inset-0 ${skill.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl ${skill.bg} ${skill.text} mb-4`}>
                  {skill.icon}
                </div>

                <h3 className={`text-lg font-bold ${skill.text} mb-3`}>{skill.title}</h3>

                {skill.badge && (
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${skill.bg} ${skill.text} text-xs font-semibold border ${skill.border} mb-3`}>
                    {skill.badge}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 bg-slate-800/80 border border-slate-700/50 text-slate-300 text-xs rounded-lg font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <Section
      id="projects"
      className="py-24 bg-slate-950/50 border-y border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} className="mb-16">
          <p className="text-purple-400 font-mono text-sm mb-2">{"// featured projects"}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Dự Án Nổi Bật
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg">
            Các sản phẩm thực tế được phát triển trong quá trình học tập tại FPT Polytechnic.
          </p>
        </motion.div>

        <div className="space-y-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              variants={{
                hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.1 } },
              }}
              whileHover={{ scale: 1.01 }}
              className="group relative bg-slate-900/50 rounded-3xl border border-slate-800 hover:border-slate-600 transition-all duration-300 overflow-hidden p-6 md:p-8"
            >
              {/* Top streak */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                i === 0 ? "from-cyan-500 to-blue-500" :
                i === 1 ? "from-emerald-500 to-teal-500" :
                "from-purple-500 to-pink-500"
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
                {/* Icon */}
                <div className={`flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border ${
                  i === 0 ? "bg-cyan-500/10 border-cyan-500/20" :
                  i === 1 ? "bg-emerald-500/10 border-emerald-500/20" :
                  "bg-purple-500/10 border-purple-500/20"
                }`}>
                  {project.icon}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{project.stat}</p>
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:border-white/20 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-all flex-shrink-0"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                      <ExternalLink size={12} className="text-slate-500" />
                    </a>
                  </div>

                  <p className="text-slate-400 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs rounded-full border font-medium ${tagColorMap[project.tagColor]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all repos */}
        <motion.div variants={fadeUp} className="mt-10 text-center">
          <a
            href="https://github.com/Nhanduc2912?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white rounded-xl transition-all text-sm font-medium"
          >
            <Github size={16} />
            Xem tất cả repo trên GitHub
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <Section
      id="contact"
      className="py-24"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="text-pink-400 font-mono text-sm">{"// get in touch"}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Sẵn sàng hợp tác?
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Tôi luôn mở với các cơ hội thực tập, dự án nhóm, hoặc chỉ đơn giản là một cuộc trò chuyện về công nghệ.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:ducnguyener@gmail.com"
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/40 hover:-translate-y-0.5 text-base"
          >
            <Mail size={20} />
            Liên hệ qua Email
          </a>

          <a
            href="https://github.com/Nhanduc2912"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-white font-semibold rounded-2xl transition-all text-base hover:-translate-y-0.5"
          >
            <Github size={20} />
            GitHub Profile
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          className="mt-16 pt-10 border-t border-white/5 flex flex-col items-center gap-4"
        >
          <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
            <a href="https://github.com/Nhanduc2912" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <span>·</span>
            <a href="https://www.canva.com/design/DAHF26LXsX8/bshwPpbfdvxwCEhMHmlC_A/edit" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">CV / Resume</a>
            <span>·</span>
            <a href="mailto:ducnguyener@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>
          <p className="text-slate-600 text-sm font-mono">
            © 2026 Nguyễn Trần Nhân Đức · Designed &amp; Built with React + Tailwind + ❤️
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeLink, setActiveLink] = useState("#about");

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_LINKS.map((l) => l.href);
      for (const id of [...sections].reverse()) {
        const el = document.querySelector(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveLink(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#070d1a] min-h-screen text-slate-200 font-sans antialiased">
      <Navbar active={activeLink} />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
