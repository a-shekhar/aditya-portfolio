import React from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import FadeIn from "../components/animations/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ChevronRight } from "lucide-react";
import SKILLS_GROUPS from "../data/skills";

export default function Skills() {
  return (
    <Section id="skills" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Skills</h2>
          <p className="mt-2 text-zinc-400">
            Breadth where needed, depth where it matters.
          </p>
        </FadeIn>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS_GROUPS.map((s, i) => (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="bg-zinc-900/60 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-cyan-300" /> {s.group}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <Badge
                        key={it}
                        className="bg-white/5 text-zinc-200 border-white/10"
                      >
                        {it}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
