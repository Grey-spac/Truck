"use client";

import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/lib/site";

const links = [
  ["Services", "#services"],
  ["Parts", "#parts"],
  ["About", "#about"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a href="#" className="brand" aria-label={`${site.name} home`}>
          <span className="brand-mark">
            <Image
              src="/images/brand-mark.png"
              alt=""
              width={58}
              height={58}
              priority
            />
          </span>
          <span className="brand-copy">
            <strong>DEEPCHAND</strong>
            <span>MECHANIC</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <a className="nav-call" href={site.phoneHref} aria-label="Call Deepchand Mechanic">
            <Phone size={17} />
            <span>Call</span>
          </a>
          <a className="btn btn-primary nav-book" href="#booking">Book Service</a>
          <button
            className="menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          <nav className="container mobile-nav" aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="mobile-nav-link">{label}</a>
            ))}
            <a href="#booking" onClick={() => setOpen(false)} className="btn btn-primary">Book a Service</a>
            <a href={site.whatsappHref} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="btn btn-secondary">WhatsApp Us</a>
          </nav>
        </div>
      )}
    </header>
  );
}
