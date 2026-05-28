# KING - Luxury Virtual Travel & Messaging Platform

## Project Status: Production-Ready (Beta Phase)

### Core Features Implemented:
- **Luxury Branding**: Dark blue and gold theme with "Boarding Gate" aesthetic.
- **Dynamic Auth**: Support for Email, Phone, and Username login. Specific support for demo accounts (`king_dev`). Integrated Google OAuth.
- **Flight Simulation Messaging**: 3-stage interactive animation (Takeoff, Cloud Cruising with facts, Landing).
- **Media Messaging**: Integrated Supabase Storage for sharing photos and videos in chat.
- **Interactive Gift System**: 22 unique luxury terminal gifts with atomic mile transactions.
- **Admin Control Tower**: Live Passenger Manifest search, real-time funding approval system, and global bilingual broadcasts.
- **Account Protection**: Strict rate limits for profile updates (Avatar: 1/day, Name: 1/week, Username: 1/month).
- **Bilingual Support**: Full Arabic and English translations with RTL/LTR layout switching.
- **Interactive Map**: Map view with translated destinations and local cultural information.

### Technical Stack:
- **Frontend**: React + Vite + Tailwind CSS.
- **Backend**: Supabase (Auth, Database, Storage, Realtime).
- **Database Logic**: PostgreSQL triggers and RPC functions for atomic transactions and automatic profile creation.
- **Deployment**: Configured for Render.com with custom host and port settings.
