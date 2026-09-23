import Link from "next/link";
import { PillArrow, pillClass } from "@/components/motion";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80dvh] max-w-7xl flex-col justify-end px-5 pt-36 md:px-8">
      <p className="text-muted-foreground text-sm font-medium tabular-nums">
        404
      </p>
      <h1 className="mt-4 text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-bold">
        Too broke for
        <span className="serif-accent text-primary block">this page.</span>
      </h1>
      <Link href="/" className={`${pillClass} mt-12 self-start`}>
        Back home
        <PillArrow />
      </Link>
    </div>
  );
}
