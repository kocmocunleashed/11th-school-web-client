import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function FooterSection({
  children,
  label,
  className,
}: {
  children?: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-primary text-2xl font-medium">{label}</p>
      <div className={className}>{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-screen bg-secondary text-background">
      <div className="container mx-auto py-10 flex flex-col">
        {/* Footer content */}
        <section className="border-b border-b-primary flex justify-around w-full pb-10 gap-10">
          <FooterSection label="Location">
            11th School Ulaanbaatar, Mongolia
          </FooterSection>
          <FooterSection label="Contact">
            <p className="text-base">Mobile: +976 1234 5678</p>
            <p className="text-base">Mail: info@11thschool.edu.mn</p>
          </FooterSection>
          <FooterSection label="Follow us" className="flex gap-5">
            {/* TODO: ts whole thing */}
            <Link
              href={
                "https://www.tiktok.com/@op.adii/video/7587086970153700630?is_from_webapp=1&sender_device=pc"
              }
            >
              <FaFacebookF size={32}></FaFacebookF>
            </Link>
            <Link
              href={
                "https://www.tiktok.com/@deandrehare/video/7586451320719101214?is_from_webapp=1&sender_device=pc"
              }
            >
              <FaInstagram size={32}></FaInstagram>
            </Link>
            <Link
              href={
                "https://www.tiktok.com/@dioslegacy_pucci/video/7587367740642430238?is_from_webapp=1&sender_device=pc"
              }
            >
              <FaTwitter size={32}></FaTwitter>
            </Link>
            <Link
              href={
                "https://www.tiktok.com/@return_ofthe_ghst/video/7586190423584967950?is_from_webapp=1&sender_device=pc"
              }
            >
              <FaYoutube size={32}></FaYoutube>
            </Link>
          </FooterSection>
        </section>
        {/* Copyright */}
        <section className="border-t border-t-primary pt-8">
          <p className="text-background-alt font-light text-center w-full">
            {/* TODO: Get a team name */}© 2024 11th School. All rights
            reserved. | TEAMNAMETEAMNAME (Testing_Bayar)
          </p>
        </section>
      </div>
    </footer>
  );
}
