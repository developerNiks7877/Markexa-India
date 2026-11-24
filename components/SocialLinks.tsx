
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

import { site } from "@/data/site";

const iconMap = {
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  YouTube: FaYoutube,
  LinkedIn: FaLinkedinIn,
};

export default function SocialLinks() {
  return (
    <div className="social-links">
      {site.socials.map((social) => {
        const Icon = iconMap[social.label as keyof typeof iconMap];

        if (!Icon || !social.href) return null;

        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
