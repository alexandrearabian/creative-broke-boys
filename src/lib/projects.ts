export type Category = "campaign" | "branding" | "digital" | "interactive";

export type Project = {
  behanceId: string;
  title: string;
  client: string;
  year: string;
  category: Category;
  /** Behance cover file name; projects without one get a type-only tile. */
  cover?: string;
};

// Order matters: the home page gallery follows it.
export const projects: Project[] = [
  {
    behanceId: "216438429",
    cover: "c04aec216438429.Y3JvcCwxNzkyLDE0MDIsNTQ1LDM5MA.jpg",
    title: "REACCIONES 2024",
    client: "Shitty Hosts · Bronze, Young Lions 2024",
    year: "2024",
    category: "campaign",
  },
  {
    behanceId: "196556307",
    cover: "21db2c196556307.Y3JvcCw4MDksNjMyLDAsMA.png",
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
    cover: "278419211154803.Y3JvcCwxMDgwLDg0NCwwLDExNw.png",
    title: "Grafica",
    client: "Visual identity",
    year: "2024",
    category: "branding",
  },
  {
    behanceId: "210503893",
    cover: "07e871210503893.671232fd628e6.jpg",
    title: "ENTEL",
    client: "Entel",
    year: "2024",
    category: "branding",
  },
  {
    behanceId: "208011533",
    cover: "eda084208011533.Y3JvcCw1NzUzLDQ1MDAsMTEyNSww.jpg",
    title: "Podcast",
    client: "Podcast identity",
    year: "2024",
    category: "branding",
  },
  {
    behanceId: "202737175",
    cover: "c44691202737175.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
    title: "Re-connect",
    client: "Digital campaign",
    year: "2024",
    category: "digital",
  },
  {
    behanceId: "156726755",
    cover: "583c99156726755.6904dad0d1def.jpg",
    title: "Say Yes to the Zest",
    client: "William Lawson's",
    year: "2023",
    category: "campaign",
  },
  {
    behanceId: "168859783",
    cover: "8d2995168859783.Y3JvcCwzMzY4LDI2MzQsMCww.png",
    title: "Creative Project",
    client: "Design",
    year: "2023",
    category: "branding",
  },
];

export const coverUrl = (file: string) =>
  `https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/${file}`;
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
