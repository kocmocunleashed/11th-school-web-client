import Image from "next/image";
import Link from "next/link";

// ! also teacher said that the bookmark thing was not recommended so were falling back to corporate slop

function NavEntry({
  children,
  link,
}: {
  children?: React.ReactNode;
  link: string;
}): React.ReactNode {
  return (
    <Link className="hover:underline text-center flex-1" href={link}>
      {children}
    </Link>
  );
}

export function Header() {
  return (
    <header className="bg-secondary w-screen py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src="/LogoNoBG.png"
            width={64}
            height={64}
            alt="XI school logo"
          />
        </Link>
        <div className="opacity-0 text-xs flex-1">
          you dont need to read ts you know, btw ts stupid code stuff that
          really is js here for the layout of ts website
        </div>
        <nav className="flex flex-1 h-full justify-evenly text-background font-medium">
          <NavEntry link="/">Home</NavEntry>
          <NavEntry link="/about">About</NavEntry>
          <NavEntry link="/achievements">Achievements</NavEntry>
          <NavEntry link="/course">Courses</NavEntry>
          <NavEntry link="/contact">Contact</NavEntry>
          <NavEntry link="/apply">Apply</NavEntry>
        </nav>
      </div>
    </header>
  );
}
