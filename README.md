# Truck Care Service & Repair

Modern production-oriented Next.js website for Deepchand Mechanic / Truck Care Service & Repair, focused on truck repair, truck parts and heavy vehicle service in Jhansi.

## Included

- Premium dark industrial design inspired by the supplied reference images
- Responsive navbar and mobile action bar
- Light / dark mode with local preference persistence
- Full, non-cropped hero image composition using the supplied Truck-mechanic.png
- Working favicon/app icon generated from the supplied brand mark
- Service directory
- Online service appointment request
- Truck parts request
- General contact enquiry
- PostgreSQL-ready API routes
- SEO metadata
- AutoRepair structured data
- Optimized Next/Image usage
- GitHub + Vercel friendly architecture

## Local setup

```bash
npm install
cp .env.example .env.local
```

Set `DATABASE_URL` in `.env.local`, then create the database tables using:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

Run:

```bash
npm run dev
```

## Vercel deployment

1. Push this project to GitHub.
2. Create/connect a Vercel project.
3. Connect a managed PostgreSQL database/provider.
4. Add `DATABASE_URL` in Vercel Project Settings → Environment Variables.
5. Add `NEXT_PUBLIC_SITE_URL` with the real production URL.
6. Deploy.

The API routes intentionally return an error instead of pretending a submission succeeded when the database is not configured.

## Business details configured

- Phone: +91 8756243637
- Email: deepchandra875624@gmail.com
- Instagram: @deepchandmechanic

## SEO focus

Primary target phrases include: Deepchand Mechanic, truck mechanic, truck repair, truck repair Jhansi, truck mechanic Jhansi, truck parts, truck parts Jhansi, heavy vehicle repair, truck service Jhansi, best truck repair Jhansi, and heavy truck mechanic Jhansi. These are used naturally in titles, headings, body copy, structured data and local-service content; avoid keyword stuffing.

## Next production upgrades

- Admin authentication/dashboard
- Booking status management
- Parts inventory/catalog
- Image upload for part requests
- Email/WhatsApp notification automation
- Google Business/Maps integration
- Real gallery assets
- Privacy policy / terms pages

## Primary SEO targets

- Deepchand Mechanic
- truck mechanic
- truck repair
- truck repair Jhansi
- truck parts
- best truck repair Jhansi
- heavy vehicle repair Jhansi


## V4 visual refresh

- Rebuilt the homepage composition to prevent hero text/image overlap.
- Added a proper circular brand mark for header, footer, favicon and Apple touch icon.
- Added a current-generation responsive visual system with light/dark theme support.
- Preserved the supplied 1671×941 hero image without forced cropping.
- Added clearer local SEO copy for Deepchand Mechanic, truck mechanic, truck repair Jhansi, truck parts Jhansi and related services.
