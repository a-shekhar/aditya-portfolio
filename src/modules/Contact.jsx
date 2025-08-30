import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Download } from "lucide-react";

// ⬇️ keep these paths exactly as in your project
import Section from "../components/ui/Section"; // adjust if different
import { Card, CardContent } from "../components/ui/card"; // adjust if different
import FadeIn from "../components/animations/FadeIn"; // adjust if different
import { RESUME } from "../data/resume"; // adjust if different

const Contact = () => (
  <Section id="contact" className="py-20">
    <div className="mx-auto max-w-7xl px-4">
      <FadeIn>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Let’s build something
        </h2>
        <p className="mt-2 text-zinc-400">
          Reach out for roles, collaborations, or interesting problems.
        </p>
      </FadeIn>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            icon: <Mail className="h-5 w-5" />,
            label: "Email",
            value: RESUME.email,
            href: `mailto:${RESUME.email}`,
          },
          {
            icon: <Linkedin className="h-5 w-5" />,
            label: "LinkedIn",
            value: "@ashekharr",
            href: RESUME.links.linkedin,
          },
          {
            icon: <Github className="h-5 w-5" />,
            label: "GitHub",
            value: "a-shekhar",
            href: RESUME.links.github,
          },
          {
            icon: <Download className="h-5 w-5" />,
            label: "Resume",
            value: "Download Resume",
            href: RESUME.links.resume, // <-- ensure this exists in src/data/resume.js
            download: true,
          },
        ].map((c, i) => (
          <motion.a
            key={i}
            href={c.href}
            // open in new tab for normal links; no target for download
            target={c.download ? undefined : "_blank"}
            rel={c.download ? undefined : "noreferrer"}
            // pass the download attribute only for the resume item
            download={c.download ? "" : undefined}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Card className="bg-zinc-900/60 border-white/10 hover:border-violet-400/40 transition">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-zinc-200">
                  <div className="rounded-xl bg-white/5 p-2 border border-white/10">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </div>
    </div>
  </Section>
);

export default Contact;
