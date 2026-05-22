import { motion } from "framer-motion";
import {
  MessageCircle,
  PlayCircle,
  FileText,
  GraduationCap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { fadeUp } from "@/lib/utils";

const iconMap = {
  ai_chat: MessageCircle,
  lectures: PlayCircle,
  summaries: FileText,
  exams: GraduationCap,
};

const colorMap = {
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-500",
    border: "hover:border-blue-500/40",
  },
  violet: {
    bg: "bg-violet-500/10",
    icon: "text-violet-500",
    border: "hover:border-violet-500/40",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    icon: "text-emerald-500",
    border: "hover:border-emerald-500/40",
  },
  amber: {
    bg: "bg-amber-500/10",
    icon: "text-amber-500",
    border: "hover:border-amber-500/40",
  },
};

export default function Features() {
  const { t } = useTranslation();

  const features = [
    { key: "ai_chat", color: "blue" },
    { key: "lectures", color: "violet" },
    { key: "summaries", color: "emerald" },
    { key: "exams", color: "amber" },
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            {t("features.badge")}
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t("features.title")}
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-muted-foreground text-base">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const data = t(`features.items.${f.key}`, {
              returnObjects: true,
            });

            const Icon = iconMap[f.key];

            if (!Icon || !data) return null;

            const c = colorMap[f.color];

            return (
              <motion.div
                key={f.key}
                {...fadeUp(0.1 + i * 0.1)}
                className={`group flex flex-col bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${c.border} hover:-translate-y-1`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition`}
                >
                  <Icon className={`w-6 h-6 ${c.icon}`} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-foreground text-base mb-2">
                  {data.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {data.desc}
                </p>

                {/* Highlights */}
                <ul className="mt-5 space-y-1.5">
                  {data.highlights?.map((h, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${c.icon}`} />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-16 relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-blue-400 p-10 text-center text-white shadow-xl"
        >
          <h3 className="relative text-2xl sm:text-3xl font-extrabold mb-3">
            {t("features.cta.title")}
          </h3>

          <p className="relative text-white/80 text-sm mb-7 max-w-lg mx-auto">
            {t("features.cta.desc")}
          </p>

          <a
            href="/signup"
            className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-primary font-bold text-sm"
          >
            {t("features.cta.button")}
          </a>
        </motion.div>

      </div>
    </section>
  );
}