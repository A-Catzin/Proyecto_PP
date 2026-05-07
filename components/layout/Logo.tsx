import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo-institucion.webp"
        alt="Tecnológico Universitario Playacar"
        width={200}
        height={150}
        className="h-28 w-33"
        priority
      />
      <span className="text-base font-bold text-indigo-900 hidden sm:inline">
        Plataforma PP
      </span>
    </Link>
  );
}
