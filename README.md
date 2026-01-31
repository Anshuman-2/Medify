# Medify React App

A pure React-based web application to find medical centers, book appointments, and manage bookings. Built with Create React App (PWA template).

## Features
- Search medical centers by state and city
- Book appointments with calendar and time slots
- View and manage bookings (localStorage persistence)
- Responsive design (Figma reference)
- Swiper carousel integration

## Setup
1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Build for production: `npm run build`

## Deployment
- Includes `vercel.json` for Vercel compatibility

## Routing
- `/` - Landing & Search
- `/results` - Search Results
- `/booking` - Booking Interface
- `/my-bookings` - My Bookings

## API Endpoints
- States: `https://meddata-backend.onrender.com/states`
- Cities: `https://meddata-backend.onrender.com/cities/:state`
- Medical Centers: `https://meddata-backend.onrender.com/data?state=<state>&city=<city>`

## Notes
- All bookings are stored in localStorage under the key `bookings`.
- Follow Figma design for UI/UX.
