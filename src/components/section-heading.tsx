type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-4xl">
      <p className="font-mono text-sm text-accent-ink">{`// ${eyebrow}`}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 max-w-3xl text-ink-2">{description}</p>}
    </div>
  );
}
