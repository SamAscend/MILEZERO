"use client";

import { useState } from "react";
import { activities, achievements, gallery, members, timeline } from "@/data/milezero";

const navItems = ["About", "Members", "Activities", "Achievements", "Gallery", "Timeline"];
const galleryFilters = ["All", "Runs", "Crew", "Night", "Morning", "Moments"];

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{index}</span><span>{children}</span></div>;
}

function ImagePanel({ image, title, className = "" }: { image: string; title: string; className?: string }) {
  return <div className={`image-panel ${className}`} style={{ backgroundImage: `url(${image})` }} role="img" aria-label={title} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredGallery = activeFilter === "All" ? gallery : gallery.filter((item) => item.category === activeFilter);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="wordmark">MILE<span>ZERO</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          <span>{menuOpen ? "Close" : "Menu"}</span><i className={menuOpen ? "is-open" : ""} />
        </button>
        <nav className={menuOpen ? "nav is-open" : "nav"}>
          {navItems.map((item) => <a href={`#${item.toLowerCase()}`} key={item} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" /><div className="hero-shade" />
        <div className="hero-content page-width"><p className="eyebrow">Running crew · Est. 2026</p><h1>MILE<span>ZERO</span></h1><div className="hero-bottom"><p>Every run starts somewhere.<br /><strong>Started with five.</strong></p><a className="circle-link" href="#about" aria-label="Explore the crew">↘</a></div></div>
        <div className="hero-note">Jakarta, ID <span>06°12′S 106°49′E</span></div>
      </section>

      <section className="intro page-width" id="about"><SectionLabel index="01">Who we are</SectionLabel><div className="intro-grid"><h2>A crew for the miles<br /><em>between</em> the milestones.</h2><div><p>MILEZERO is a running crew built around movement, consistency, shared experiences, and continuous progress.</p><a className="text-link" href="#timeline">Read our story <span>↗</span></a></div></div></section>

      <section className="founders section-dark" id="members"><div className="page-width"><SectionLabel index="02">The first five</SectionLabel><div className="founder-heading"><h2>Five people.<br /><em>One beginning.</em></h2><p>Before the pace, there was a decision to start. These are the people who made it real.</p></div><div className="member-grid">{members.map((member) => <a href={`#member-${member.id}`} className="member-card" key={member.id}><ImagePanel image={member.image} title={member.name} /><div className="member-meta"><span>{member.number}</span><div><strong>{member.name}</strong><small>{member.role}</small></div><span>↗</span></div></a>)}</div></div></section>

      <section className="activities page-width" id="activities"><SectionLabel index="03">Latest activity</SectionLabel><div className="section-heading"><h2>Keep moving.</h2><a className="text-link" href="#activities-list">View archive <span>↗</span></a></div><div className="activity-feature" id="activities-list"><ImagePanel image={activities[0].image} title={activities[0].title} /><div className="activity-feature-copy"><p className="eyebrow">{activities[0].type} · {activities[0].date}</p><h3>{activities[0].title}</h3><p>{activities[0].description}</p><div className="activity-stats"><div><small>Distance</small><strong>{activities[0].distance}</strong></div><div><small>Avg pace</small><strong>{activities[0].pace}</strong></div><div><small>Location</small><strong>{activities[0].location}</strong></div></div><a className="round-arrow" href="#gallery">↗</a></div></div><div className="activity-list">{activities.slice(1).map((activity, index) => <a href="#activities-list" className="activity-row" key={activity.id}><span>0{index + 2}</span><strong>{activity.title}</strong><span>{activity.date}</span><span>{activity.distance}</span><span>↗</span></a>)}</div></section>

      <section className="stats-band"><div className="page-width stats-grid"><div><strong>03</strong><span>Recorded runs</span></div><div><strong>22.3</strong><span>Total kilometers</span></div><div><strong>05</strong><span>Founding members</span></div><div><strong>26</strong><span>Year established</span></div></div></section>

      <section className="achievements page-width" id="achievements"><SectionLabel index="04">The record</SectionLabel><div className="section-heading"><h2>Small milestones.<br /><em>Long memory.</em></h2><span className="muted-copy">Every number has a story<br />behind it.</span></div><div className="achievement-list">{achievements.map((achievement) => <div className="achievement-row" key={achievement.title}><span className="achievement-mark">{achievement.mark}</span><div><h3>{achievement.title}</h3><p>{achievement.detail}</p></div><span>{achievement.year}</span></div>)}</div></section>

      <section className="gallery section-dark" id="gallery"><div className="page-width"><SectionLabel index="05">The archive</SectionLabel><div className="section-heading"><h2>Moments<br /><em>in motion.</em></h2><div className="filter-list">{galleryFilters.map((filter) => <button className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}</div></div><div className="gallery-grid">{filteredGallery.map((item) => <button className="gallery-tile" key={item.id} onClick={() => setSelectedImage(item.image)}><ImagePanel image={item.image} title={item.title} /><span>{item.title}</span></button>)}</div></div></section>

      <section className="timeline page-width" id="timeline"><SectionLabel index="06">The journey</SectionLabel><div className="timeline-intro"><h2>Before the first<br /><em>mile.</em></h2><p>The archive is not only a record of where we have been. It is a reminder that every crew, every runner, every story starts at zero.</p></div><div className="timeline-list">{timeline.map((event) => <div className="timeline-item" key={`${event.year}-${event.title}`}><div className="timeline-year">{event.year}</div><div className="timeline-dot" /><div><span className="eyebrow">{event.tag}</span><h3>{event.title}</h3><p>{event.description}</p></div></div>)}</div></section>

      <footer className="footer section-dark"><div className="page-width"><div className="footer-top"><h2>Every run<br /><em>starts somewhere.</em></h2><a className="circle-link" href="#top" aria-label="Back to top">↑</a></div><div className="footer-bottom"><span>MILEZERO</span><span>Running crew · Est. 2026</span><span>Jakarta, Indonesia</span><a href="#top">Back to top ↑</a></div></div></footer>

      {selectedImage && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelectedImage(null)}><ImagePanel image={selectedImage} title="Gallery preview" className="lightbox-image" /><button onClick={() => setSelectedImage(null)} aria-label="Close image">Close ×</button></div>}
    </main>
  );
}
