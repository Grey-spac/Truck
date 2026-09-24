import Image from "next/image";
import {
  ArrowRight, CalendarDays, Check, ChevronRight, Clock3, Instagram, Mail,
  MapPin, MessageCircle, PackageCheck, Phone, ShieldCheck, Truck, Wrench, Zap
} from "lucide-react";
import Header from "@/components/Header";
import ServiceIcon from "@/components/ServiceIcon";
import BookingForm from "@/components/BookingForm";
import PartForm from "@/components/PartForm";
import ContactForm from "@/components/ContactForm";
import { services, site } from "@/lib/site";

const stats = [
  ["6+", "Core service areas"],
  ["1", "Direct service contact"],
  ["Jhansi", "Local service focus"],
];

const trustItems = [
  ["01", "Truck Repair", "Repair support for commercial and heavy vehicles."],
  ["02", "Truck Parts", "Send a parts request with your truck details."],
  ["03", "Service Booking", "Request your preferred date and service online."],
];

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: site.name,
    alternateName: site.legalName,
    telephone: site.phone,
    email: site.email,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    image: "/images/truck-care-hero.png",
    description:
      "Deepchand Mechanic in Jhansi provides truck repair, truck mechanic service, truck parts, heavy vehicle repair and commercial vehicle maintenance.",
    areaServed: {
      "@type": "City",
      name: site.city,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    sameAs: [site.instagramHref],
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      {/* HERO */}
      <section className="hero-v2" aria-labelledby="hero-title">
        <div className="hero-noise" />
        <div className="container hero-v2-grid">
          <div className="hero-v2-copy">
            <div className="eyebrow">Truck Mechanic • Jhansi</div>
            <h1 id="hero-title" className="hero-v2-title">
              KEEP YOUR
              <span>TRUCK RUNNING.</span>
            </h1>
            <p className="hero-v2-subtitle">
              <strong>Deepchand Mechanic</strong> provides professional truck repair,
              truck parts support and heavy vehicle service in Jhansi — built around
              reliable work and clear communication.
            </p>

            <div className="hero-v2-actions">
              <a href="#booking" className="btn btn-primary btn-large">
                Book a Service <ArrowRight size={18} />
              </a>
              <a href={site.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-secondary btn-large">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>

            <div className="hero-checks">
              <span><Check size={15} /> Truck repair</span>
              <span><Check size={15} /> Truck parts</span>
              <span><Check size={15} /> Heavy vehicle service</span>
            </div>
          </div>

          <div className="hero-v2-visual">
            <div className="hero-photo-wrap">
              <Image
                src="/images/truck-care-hero.png"
                alt="Deepchand Mechanic in a truck repair workshop with a commercial truck"
                width={1671}
                height={941}
                priority
                sizes="(max-width: 900px) 100vw, 58vw"
                className="hero-photo"
              />
              <div className="hero-photo-shade" />
              <div className="hero-photo-label">
                <span className="live-dot" />
                <span><strong>DEEPCHAND MECHANIC</strong><small>Truck Repair • Jhansi</small></span>
              </div>
            </div>
            <div className="hero-float-card">
              <Wrench size={19} />
              <div><strong>Service & Repair</strong><small>Commercial Vehicles</small></div>
            </div>
          </div>
        </div>

        <div className="container hero-bottom">
          <div className="hero-location"><MapPin size={15} /> Jhansi, Uttar Pradesh</div>
          <div className="hero-scroll">Scroll to explore <ChevronRight size={14} /></div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="action-strip" aria-label="Quick actions">
        <div className="container action-grid">
          <a href={site.phoneHref} className="action-item">
            <span className="action-icon"><Phone size={19} /></span>
            <span><strong>Call Now</strong><small>{site.phone}</small></span>
          </a>
          <a href="#booking" className="action-item">
            <span className="action-icon"><CalendarDays size={19} /></span>
            <span><strong>Book Service</strong><small>Choose your requirement</small></span>
          </a>
          <a href="#parts" className="action-item">
            <span className="action-icon"><PackageCheck size={19} /></span>
            <span><strong>Request Parts</strong><small>Send part details</small></span>
          </a>
          <a href={site.whatsappHref} target="_blank" rel="noreferrer" className="action-item">
            <span className="action-icon"><MessageCircle size={19} /></span>
            <span><strong>WhatsApp</strong><small>Start a conversation</small></span>
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="section intro-section">
        <div className="container intro-grid">
          <div>
            <div className="eyebrow">Deepchand Mechanic</div>
            <h2 className="section-title">A modern online front door for a real truck workshop.</h2>
          </div>
          <div className="intro-copy">
            <p>
              Need a <strong>truck mechanic in Jhansi</strong>? Need dependable
              <strong> truck repair</strong>, maintenance or a <strong>truck part</strong>?
              This website makes it simple to send your requirement before you visit or call.
            </p>
            <a href="#booking" className="text-link">Start a service request <ArrowRight size={16} /></a>
          </div>
        </div>

        <div className="container trust-grid">
          {trustItems.map(([number, title, text]) => (
            <article className="trust-card" key={number}>
              <span className="trust-number">{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <ChevronRight className="trust-arrow" size={19} />
            </article>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">What We Handle</div>
              <h2 className="section-title">Truck repair services built for working vehicles.</h2>
            </div>
            <p className="section-copy">From engine and brakes to suspension, radiator and general maintenance, choose the service you need and request an appointment.</p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <article key={service.title} className="service-card">
                <div className="service-top">
                  <span className="service-icon"><ServiceIcon type={service.icon} /></span>
                  <span className="service-index">0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#booking" className="text-link">Book this service <ChevronRight size={16} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL SEO */}
      <section className="local-section">
        <div className="container local-grid">
          <div className="local-badge">
            <div className="local-icon"><Truck size={30} /></div>
            <span>LOCAL SERVICE</span>
            <strong>JHANSI</strong>
            <small>Uttar Pradesh</small>
          </div>
          <div>
            <div className="eyebrow">Truck Service in Jhansi</div>
            <h2 className="section-title">Deepchand Mechanic for truck repair, truck parts &amp; heavy vehicle service.</h2>
            <div className="local-copy">
              <p>
                If you are searching for <strong>truck repair in Jhansi</strong>,
                a <strong>truck mechanic in Jhansi</strong>, or a <strong>heavy truck mechanic</strong>,
                Deepchand Mechanic offers practical service support for commercial vehicles.
              </p>
              <p>
                Send your truck model, part name or repair requirement online and use the direct
                contact options to continue the conversation.
              </p>
            </div>
            <div className="keyword-pills">
              <span>Truck Mechanic</span><span>Truck Repair Jhansi</span><span>Truck Parts Jhansi</span>
              <span>Heavy Vehicle Repair</span><span>Truck Service Jhansi</span><span>Heavy Truck Mechanic</span>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="section booking-section">
        <div className="container booking-grid">
          <div className="booking-copy">
            <div className="eyebrow">Service Appointment</div>
            <h2 className="section-title">Tell us what your truck needs.</h2>
            <p className="section-copy">Share the vehicle details, service requirement and preferred time. The request is prepared for the website backend and database.</p>

            <div className="feature-list">
              <div><span><Zap size={18} /></span><p><strong>Quick request</strong><small>Share the basics in under a minute.</small></p></div>
              <div><span><ShieldCheck size={18} /></span><p><strong>Clear details</strong><small>Tell us the truck number and problem.</small></p></div>
              <div><span><Clock3 size={18} /></span><p><strong>Planned service</strong><small>Choose a preferred date and time.</small></p></div>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* PARTS */}
      <section id="parts" className="section parts-section">
        <div className="container parts-grid">
          <div className="parts-visual">
            <div className="parts-visual-inner">
              <PackageCheck size={42} />
              <span>TRUCK PARTS</span>
              <strong>Find the part.<br />Start the enquiry.</strong>
              <p>Engine • Brake • Suspension • Radiator • Electrical</p>
            </div>
          </div>
          <div>
            <div className="eyebrow">Parts Support</div>
            <h2 className="section-title">Need a truck part?</h2>
            <p className="section-copy">Send the truck model, part name and quantity. This gives the team a clear starting point for your truck parts enquiry.</p>
            <PartForm />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <div className="container about-grid">
          <div className="about-photo">
            <Image
              src="/images/truck-care-hero.png"
              alt="Deepchand Mechanic working in a heavy vehicle repair workshop"
              width={1671}
              height={941}
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <div className="about-photo-caption">
              <span>YOUR TRUCK</span><strong>OUR RESPONSIBILITY</strong>
            </div>
          </div>
          <div>
            <div className="eyebrow">Built Around Reliability</div>
            <h2 className="section-title">Professional presentation. Practical service.</h2>
            <p className="section-copy">
              Deepchand Mechanic is presented online around the things truck owners actually need:
              direct contact, service booking, truck parts enquiries and clear information about
              common repair services.
            </p>
            <div className="stat-grid">
              {stats.map(([number, label]) => (
                <div className="stat-card" key={label}><strong>{number}</strong><span>{label}</span></div>
              ))}
            </div>
            <div className="about-links">
              <a className="btn btn-primary" href={site.phoneHref}><Phone size={17} /> Call Deepchand</a>
              <a className="btn btn-secondary" href={site.instagramHref} target="_blank" rel="noreferrer"><Instagram size={17} /> @deepchandmechanic</a>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section gallery-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">Workshop Visual</div>
              <h2 className="section-title">Heavy-duty atmosphere. Clean digital experience.</h2>
            </div>
            <p className="section-copy">The supplied workshop and mechanic visual is kept crisp and uncropped so the vehicle, technician and working environment remain visible.</p>
          </div>
          <div className="gallery-main">
            <Image
              src="/images/truck-care-hero.png"
              alt="Truck repair workshop and Deepchand Mechanic in Jhansi"
              width={1671}
              height={941}
              sizes="100vw"
            />
            <div className="gallery-overlay"><span>DEEPCHAND MECHANIC</span><strong>TRUCK CARE • JHANSI</strong></div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <div className="container contact-grid">
          <div>
            <div className="eyebrow">Contact Deepchand Mechanic</div>
            <h2 className="section-title">Let’s get your next repair moving.</h2>
            <p className="section-copy">Call, WhatsApp, email or send an enquiry. Choose the quickest option for your requirement.</p>
            <div className="contact-cards">
              <a href={site.phoneHref} className="contact-card"><span><Phone size={18} /></span><p><small>Phone</small><strong>{site.phone}</strong></p></a>
              <a href={site.emailHref} className="contact-card"><span><Mail size={18} /></span><p><small>Email</small><strong>{site.email}</strong></p></a>
              <a href={site.instagramHref} target="_blank" rel="noreferrer" className="contact-card"><span><Instagram size={18} /></span><p><small>Instagram</small><strong>@{site.instagram}</strong></p></a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container final-cta-inner">
          <div><div className="eyebrow">Ready When You Are</div><h2>Keep your truck earning.</h2><p>Book a service or send your requirement directly to Deepchand Mechanic.</p></div>
          <div className="final-cta-actions">
            <a className="btn btn-primary btn-large" href="#booking">Book Service <ArrowRight size={18} /></a>
            <a className="btn btn-secondary btn-large" href={site.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Image src="/images/brand-mark.png" alt="Deepchand Mechanic logo" width={58} height={58} />
            <div><strong>DEEPCHAND MECHANIC</strong><span>Truck Care Service &amp; Repair</span></div>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a><a href="#parts">Parts</a><a href="#booking">Booking</a><a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <a href={site.instagramHref} target="_blank" rel="noreferrer" aria-label="Instagram @deepchandmechanic"><Instagram size={17} /></a>
            <a href={site.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Deepchand Mechanic. All rights reserved.</span>
          <span>Truck Repair • Truck Parts • Heavy Vehicle Service • Jhansi</span>
        </div>
      </footer>

      <div className="mobile-action-bar">
        <a href={site.phoneHref}><Phone size={17} /><span>Call</span></a>
        <a href={site.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={17} /><span>WhatsApp</span></a>
        <a href="#booking" className="mobile-action-primary"><Wrench size={17} /><span>Book</span></a>
      </div>
    </main>
  );
}
