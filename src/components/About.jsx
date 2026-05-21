import { motion } from "framer-motion";
import { University, Target, Users, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fadeUp } from "@/lib/utils";

const values = [
  {
    key: "mission",
    icon: Target,
  },
  {
    key: "community",
    icon: Users,
  },
  {
    key: "standards",
    icon: Award,
  },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            {t("about.badge")}
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t("about.title")}
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-base leading-relaxed">
            {t("about.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div {...fadeUp(0.1)} className="space-y-6">

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <University className="w-5 h-5 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground">
                {t("about.college_title")}
              </h3>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {t("about.college_p1")}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              {t("about.college_p2")}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { key: "founded", value: "2003" },
                { key: "departments", value: "4+" },
                // { key: "programs", value: "12+" },
                { key: "faculty", value: "500+" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="bg-card rounded-xl border border-border px-4 py-3"
                >
                  <p className="text-lg font-bold text-primary">
                    {item.value}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {t(`about.stats.${item.key}`)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <div className="space-y-4">
            {values.map((v, i) => (
              <motion.div
                key={v.key}
                {...fadeUp(0.15 + i * 0.1)}
                className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {t(`values.${v.key}_title`)}
                  </h4>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`values.${v.key}_desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}