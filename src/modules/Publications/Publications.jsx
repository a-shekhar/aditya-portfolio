// src/modules/Publications/Publications.jsx
import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import publications from "../../data/publications";

const ease = [0.22, 1, 0.36, 1];
const shellReveal = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } }
};
const list = {
  hidden: { opacity: 1 },
  show:   { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } }
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease } }
};

export default function Publications({ className = "" }) {
  const items = publications ?? [];

  return (
    <section
      id="publications"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24"
    >
      <motion.div
        variants={shellReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <Card className={`rounded-3xl border border-white/10 bg-white/[0.04] ${className}`}>
          <CardHeader className="pb-0">
            <div className="inline-flex flex-col">
              <CardTitle className="text-xl">Publications</CardTitle>
              <motion.span
                className="mt-1 h-[2px] w-12 rounded-full bg-white/20"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease }}
              />
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <motion.ul
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-5"
            >
              {items.map((p, i) => (
                <motion.li
                  key={p.id ?? i}
                  variants={item}
                  className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 md:p-6
                             transition hover:bg-white/[0.04] hover:border-white/12"
                >
                  {/* Row with logo + content (perfectly aligned) */}
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-white/6 ring-1 ring-white/10">
                        {p.logo ? (
                          // Use /public/icons/... or any URL
                          <img
                            src={p.logo}
                            alt=""
                            className="h-5 w-5 object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <FileText className="h-5 w-5 text-white/70" aria-hidden="true" />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="font-medium leading-snug">{p.title}</div>
                      {p.outlet && (
                        <div className="mt-1 text-sm text-zinc-400">{p.outlet}</div>
                      )}
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center text-sm underline underline-offset-4"
                        >
                          Read
                          <motion.span
                            aria-hidden
                            className="ml-1"
                            initial={false}
                            whileHover={{ x: 3 }}
                            whileFocus={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
