/** Editable company details. Empty strings render as "Add …" placeholders and are not linked. */
export const site = {
  name: "MARKEXAINDIA",
  short: "Markexa",
  email: "markexaindia@gmail.com", 
  phone: "+91 9119180036,+91 9983831205",
  location: "opp. Zudio, Near Children Park, Sardarpura, Jodhpur, Rajasthan 342003",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/markexaindia?igsh=MXFlMzY0YWw1bnE3OQ==" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/markexa-india/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BuqCDjxNrQ2Oul48q3bzi7w%3D%3D" },
    { label: "Facebook", href: "https://www.facebook.com/share/1DLwKe7GQk/" },
    { label: "YouTube", href: "https://youtube.com/@markexaindia?si=p8dJHMHzIF8KTz_7" },
  ],
};
export type NavItem = { id: string; label: string; href?: string };
/** `href` items are real routes; others are sections of the home page. */
export const nav: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "blog", label: "Blog", href: "/blogs" },
  { id: "contact", label: "Contact" },
];

