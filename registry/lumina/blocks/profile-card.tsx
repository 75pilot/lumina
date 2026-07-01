import { cn } from "@/lib/utils";

export interface ProfileCardProps {
  image: string;
  name: string;
  role: string;
  tag: string;
  imageAlt?: string;
  className?: string;
}

function ProfileCard({ image, name, role, tag, imageAlt, className }: ProfileCardProps) {
  return (
    <article
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-200 shadow-card transition-shadow hover:shadow-card-md",
        className,
      )}
    >
      <img
        src={image}
        alt={imageAlt ?? name}
        className="absolute inset-0 h-full w-full object-cover"
        width={1024}
        height={1024}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/40 to-transparent p-5">
        <div>
          <h3 className="text-xl font-semibold text-white drop-shadow">{name}</h3>
          <p className="text-sm text-white/80">{role}</p>
        </div>
        <span className="inline-flex items-center rounded-full border border-white/60 bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
          {tag}
        </span>
      </div>
    </article>
  );
}

export { ProfileCard };
