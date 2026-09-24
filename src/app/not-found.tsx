import Link from "next/link";
import { PillArrow, pillClass } from "@/components/motion";

export default function NotFound() {
  return (
    <div className="flex min-h-[80dvh] flex-col justify-end px-5 pt-36 md:px-8">
      <p className="text-muted-foreground text-sm font-medium tabular-nums">
        404
      </p>
      <h1 className="display mt-4 text-[clamp(3.5rem,14vw,14rem)] leading-[0.85]">
        Too broke for
        <span className="accent-word text-primary block">this page.</span>
      </h1>
      <Link href="/" className={`${pillClass} mt-12 self-start`}>
        Back home
        <PillArrow />
      </Link>
    </div>
  );
}
