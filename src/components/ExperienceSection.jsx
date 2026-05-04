import { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "AI Intern",
    company: "Infosys Springboard Internship 6.0",
    location: "Remote",
    duration: "December 2025 – January 2026",
    duration_label: "2 Months",
    domain: "AI & Automation",
    color: "#6366f1",
    accent: "#6366f1",
    logo: "IS",
    points: [
      "Learned and applied Playwright for end-to-end web automation testing.",
      "Developed an AI-based NLP tool to convert natural language commands into automated test actions.",
      "Gained hands-on experience in AI integration, automated testing pipelines, and test case generation.",
    ],
    tags: ["NLP", "AI", "Playwright", "Python", "Automation"],
  },
  {
    id: 2,
    role: "Software Intern",
    company: "Bharat FIH Private Limited",
    companyFull: "A Foxconn Technology Group Company",
    location: "Chennai",
    duration: "June 2025 – July 2025",
    duration_label: "15 Days",
    domain: "Industrial Software",
    color: "#06b6d4",
    accent: "#06b6d4",
    logo: "BF",
    points: [
      "Worked in MES (Manufacturing Execution Systems) department, understanding software's critical role in industrial production systems.",
      "Gained exposure to database management practices used in large-scale manufacturing environments.",
      "Developed a Python GUI-based expense management application for internal data tracking and analysis.",
    ],
    tags: ["MES", "Database", "Python", "GUI", "Industrial"],
  },
];

function ExperienceCard({ exp, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), index * 200);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : index % 2 === 0
          ? "translateX(-40px)"
          : "translateX(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Card */}
      <div
        className="bg-card border border-border/50 rounded-2xl overflow-hidden group hover:border-transparent transition-all duration-300"
        style={{
          boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 12px 40px ${exp.color}25, 0 0 0 1px ${exp.color}30`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.1)";
        }}
      >
        {/* Top accent strip */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${exp.color}, ${exp.color}40)` }}
        />

        <div className="p-6 space-y-5">
          {/* Header row */}
          <div className="flex items-start gap-4">
            {/* Logo circle */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{
                background: `${exp.color}18`,
                border: `1.5px solid ${exp.color}35`,
                color: exp.color,
                letterSpacing: "0.05em",
              }}
            >
              {exp.logo}
            </div>

            <div className="flex-1 min-w-0">
              {/* Role */}
              <h3 className="text-lg font-bold leading-tight">{exp.role}</h3>
              {/* Company */}
              <p className="font-semibold text-sm mt-0.5" style={{ color: exp.color }}>
                {exp.company}
              </p>
              {exp.companyFull && (
                <p className="text-xs text-muted-foreground italic mt-0.5">
                  {exp.companyFull}
                </p>
              )}
            </div>

            {/* Duration badge */}
            <div
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: `${exp.color}15`,
                color: exp.color,
                border: `1px solid ${exp.color}25`,
              }}
            >
              {exp.duration_label}
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} style={{ color: exp.color }} />
              {exp.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} style={{ color: exp.color }} />
              {exp.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase size={12} style={{ color: exp.color }} />
              {exp.domain}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40" />

          {/* Bullet points */}
          <ul className="space-y-2.5">
            {exp.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                <ChevronRight
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: exp.color }}
                />
                {point}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: `${exp.color}10`,
                  color: exp.color,
                  border: `1px solid ${exp.color}20`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ExperienceSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 space-y-4"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Where I've Worked
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Professional{" "}
            <span className="text-primary relative">
              Experience
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 240 8" style={{ overflow: "visible" }}>
                <path
                  d="M0 6 Q120 0,240 6"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  className="text-primary"
                  style={{
                    strokeDasharray: 250,
                    strokeDashoffset: headerVisible ? 0 : 250,
                    transition: "stroke-dashoffset 1s ease 0.4s",
                  }}
                />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Hands-on internship experience across AI, automation, and industrial software systems.
          </p>
        </div>

        {/* Timeline connector (desktop) */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};