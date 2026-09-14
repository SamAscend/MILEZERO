export type Member = {
  id: string;
  number: string;
  name: string;
  handle: string;
  role: string;
  image: string;
  bio: string;
};

export type Activity = {
  id: string;
  title: string;
  date: string;
  distance: string;
  pace: string;
  type: string;
  location: string;
  image: string;
  description: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
};

export const members: Member[] = [
  { id: "abid", number: "01", name: "Abid", handle: "@abid", role: "Founder", image: "/member-abid.jpg", bio: "Keeps the first step moving." },
  { id: "ridho", number: "02", name: "Ridho", handle: "@ridho", role: "Founder", image: "/member-ridho.jpg", bio: "Runs for the quiet after." },
  { id: "okta", number: "03", name: "Okta", handle: "@okta", role: "Founder", image: "/member-okta.jpg", bio: "Finds rhythm in the long way home." },
  { id: "aden", number: "04", name: "Aden", handle: "@aden", role: "Founder", image: "/member-aden.jpg", bio: "Shows up, then shows up again." },
  { id: "samuel", number: "05", name: "Samuel", handle: "@samuel", role: "Founder", image: "/member-samuel.jpg", bio: "Makes space for the next runner." },
];

export const activities: Activity[] = [
  { id: "night-tempo", title: "Night Tempo", date: "30 Aug 2026", distance: "10.14 km", pace: "6:24 / km", type: "Group run", location: "Jakarta", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1400&q=85", description: "A night run with the crew. The city got quieter, the pace got honest, and five routes became one." },
  { id: "morning-loop", title: "Morning Loop", date: "23 Aug 2026", distance: "7.20 km", pace: "6:48 / km", type: "Morning run", location: "Jakarta", image: "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1400&q=85", description: "A low-pressure loop around the neighborhood before the day had a chance to get loud." },
  { id: "first-five", title: "The First Five", date: "16 Aug 2026", distance: "5.00 km", pace: "7:02 / km", type: "Founding run", location: "Jakarta", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=85", description: "The first recorded run as MILEZERO. Five people, one start line, no finish line in sight." },
];

export const achievements = [
  { title: "The First Run", detail: "First recorded run as MILEZERO.", year: "2026", mark: "01" },
  { title: "First 10K", detail: "A double-digit distance, shared after dark.", year: "2026", mark: "10" },
  { title: "Five Strong", detail: "Five founding members on the archive.", year: "2026", mark: "05" },
];

export const gallery: GalleryItem[] = [
  { id: "g1", title: "After the rain", category: "Moments", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=85" },
  { id: "g2", title: "Before sunrise", category: "Morning", image: "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1200&q=85" },
  { id: "g3", title: "Night tempo", category: "Night", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=85" },
  { id: "g4", title: "The first five", category: "Crew", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85" },
  { id: "g5", title: "Keep moving", category: "Runs", image: "https://images.unsplash.com/photo-1530137073528-4e9d4a2f6f58?auto=format&fit=crop&w=1200&q=85" },
  { id: "g6", title: "Last kilometer", category: "Moments", image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=1200&q=85" },
];

export const timeline = [
  { year: "2024", tag: "BEFORE", title: "An idea waits", description: "The first attempt at building a running crew takes shape as EPSILONE. The timing is not right yet." },
  { year: "2026", tag: "ORIGIN", title: "MILEZERO begins", description: "The idea returns with a clearer vision, shared experience, and people already moving." },
  { year: "2026", tag: "FOUNDING", title: "Started with five", description: "Five runners meet at the line. The archive opens." },
  { year: "2026", tag: "RUN", title: "The first 10K", description: "The crew crosses its first double-digit distance together." },
];
