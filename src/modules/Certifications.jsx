import React, { useMemo, useState } from "react";
import { Search, ArrowUpDown, ExternalLink, ShieldCheck } from "lucide-react";
import GlowCard  from "../components/ui/GlowCard";          // <-- named import
import CERTIFICATIONS from "../data/certifications"; // your real data

// case-insensitive, number-aware sort
const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });
const cmp = (a, b) => collator.compare(a ?? "", b ?? "");

// segmented button styles
const segBtn = (active) =>
  `px-3 py-2 text-sm rounded-lg transition select-none
   ${active
     ? "bg-zinc-900 text-white border border-zinc-300 dark:bg-white/10 dark:text-white dark:border-white/15"
     : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:border-white/10"}`;

export default function Certifications({ items }) {
  const data = Array.isArray(items) && items.length ? items : CERTIFICATIONS;

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name"); // "name" | "issuer"
  const [sortDir, setSortDir] = useState("asc");  // "asc" | "desc"

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = q
      ? data.filter((c) => {
          const n = String(c.name || "").toLowerCase();
          const i = String(c.issuer || "").toLowerCase();
          return n.includes(q) || i.includes(q);
        })
      : data;

    return [...list].sort((a, b) => {
      const va = String(a?.[sortKey] ?? "");
      const vb = String(b?.[sortKey] ?? "");
      const base = cmp(va, vb);
      return sortDir === "asc" ? base : -base;
    });
  }, [data, query, sortKey, sortDir]);

  return (
    <section id="certifications" className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
          Certifications
        </h2>

        {/* Controls */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <label className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-white/50" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search certifications…"
              className="w-full rounded-xl border bg-white text-zinc-900 placeholder:text-zinc-500
                         border-zinc-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-zinc-400
                         dark:bg-white/5 dark:text-white/90 dark:placeholder:text-white/50 dark:border-white/10 dark:focus:border-white/20"
              aria-label="Search certifications"
            />
          </label>

          {/* Sort: segmented (Name/Issuer) + direction toggle */}
          <div className="flex items-center gap-2">
            <div className="inline-flex gap-2" role="group" aria-label="Sort by">
              <button
                className={segBtn(sortKey === "name")}
                onClick={() => setSortKey("name")}
                type="button"
              >
                Name
              </button>
              <button
                className={segBtn(sortKey === "issuer")}
                onClick={() => setSortKey("issuer")}
                type="button"
              >
                Issuer
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm
                         bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200
                         dark:bg-white/5 dark:text-white/90 dark:border-white/10 dark:hover:bg-white/10"
              aria-label="Toggle sort direction"
              title="Toggle sort direction"
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortDir === "asc" ? "A → Z" : "Z → A"}
            </button>
          </div>
        </div>

        {/* Grid */}
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => {
            const href = c.link || c.url || "";
            return (
              <li key={(href || c.name || "cert") + i}>
                <GlowCard
                  className="relative h-full overflow-hidden rounded-2xl
                             border bg-white text-zinc-900
                             border-zinc-200 p-4 shadow-sm
                             dark:bg-white/[0.04] dark:text-white/90 dark:border-white/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <h3 className="font-medium">{c.name}</h3>
                    </div>

                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs
                                   border-zinc-300 text-zinc-700 hover:bg-zinc-100
                                   dark:border-white/10 dark:text-white/80 dark:hover:bg-white/10"
                        aria-label={`View certificate: ${c.name}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View
                      </a>
                    ) : null}
                  </div>

                  <div className="mt-2 text-sm">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      {c.issuer && (
                        <span className="rounded-full border px-2 py-0.5 text-xs
                                         border-zinc-200 bg-zinc-100 text-zinc-700
                                         dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                          {c.issuer}
                        </span>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 text-xs text-zinc-600 dark:text-white/60">
          Showing {filtered.length} of {data.length}
        </div>
      </div>
    </section>
  );
}
