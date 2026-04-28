export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-red-300/80">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-[var(--muted)] md:text-base">{description}</p> : null}
    </div>
  );
}
