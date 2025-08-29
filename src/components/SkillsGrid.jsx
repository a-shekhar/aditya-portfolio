import React from "react";
import IconCard from "./IconCard";

// simple slug helper -> "Spring Boot" -> "spring-boot"
const slug = (s = "") =>
  s.toLowerCase().trim().replace(/[+]/g, "plus").replace(/\s+/g, "-");

// optional filename overrides when your file name differs from the label
const NAME_TO_FILE = {
  "spring boot": "spring-boot",
  postgresql: "postgresql",
  "c#": "c-sharp", // example
};

export default function SkillsGrid({
  items = [],           // [{ title, src?, href? }, ...]
  className = "",       // extra classes for the grid wrapper
  cols = "grid-cols-1 sm:grid-cols-2", // tweak if you want more columns
}) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className={`grid ${cols} gap-4 ${className}`}>
      {safeItems.map((it, i) => {
        const title = it.title || `Skill ${i+1}`;
        // if src not given, look for /public/icons/<slug>.svg
        const fileBase = NAME_TO_FILE[title.toLowerCase()] || slug(title);
        const src = it.src || `/icons/${fileBase}.svg`;
        return (
          <IconCard
            key={`${title}-${i}`}
            title={title}
            src={src}
            href={it.href}     // optional link
          />
        );
      })}
    </div>
  );
}
