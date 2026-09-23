export type Category = "campaign" | "branding" | "digital" | "interactive";

export type Project = {
  behanceId: string;
  title: string;
  client: string;
  year: string;
  category: Category;
};

// Order matters: the first three are featured on the home page.
export const projects: Project[] = [
  {
    behanceId: "216438429",
    title: "REACCIONES 2024",
    client: "Shitty Hosts · Bronze, Young Lions 2024",
    year: "2024",
    category: "campaign",
  },
  {
    behanceId: "196556307",
    title: "Trash Your Playlist",
    client: "Future Lions 2024",
    year: "2024",
    category: "interactive",
  },
  {
    behanceId: "202438163",
    title: "Paga el que tiene la del Santander",
    client: "Santander",
    year: "2024",
    category: "campaign",
  },
  {
    behanceId: "204022181",
    title: "Ese orgullo de tener una pyme",
    client: "Small business pride",
    year: "2024",
    category: "digital",
  },
  {
    behanceId: "211154803",
    title: "Grafica",
    client: "Visual identity",
    year: "2024",
    category: "branding",
  },
  {
    behanceId: "210503893",
    title: "ENTEL",
    client: "Entel",
    year: "2024",
    category: "branding",
  },
  {
    behanceId: "208011533",
    title: "Podcast",
    client: "Podcast identity",
    year: "2024",
    category: "branding",
  },
  {
    behanceId: "202737175",
    title: "Re-connect",
    client: "Digital campaign",
    year: "2024",
    category: "digital",
  },
  {
    behanceId: "156726755",
    title: "Say Yes to the Zest",
    client: "William Lawson's",
    year: "2023",
    category: "campaign",
  },
  {
    behanceId: "168859783",
    title: "Creative Project",
    client: "Design",
    year: "2023",
    category: "branding",
  },
];

export const behanceEmbed = (id: string) =>
  `https://www.behance.net/embed/project/${id}?ilo0=1`;
export const behanceUrl = (id: string) =>
  `https://www.behance.net/gallery/${id}`;

export const clients = [
  "Santander",
  "Entel",
  "William Lawson's",
  "Young Lions",
  "Future Lions",
  "Shitty Hosts",
];

export const EMAIL = "hello@creativebrokeboys.com";
