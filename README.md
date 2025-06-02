# MedRoute - Medicine Delivery Platform

A comprehensive full-stack web application for medicine availability and delivery built with Next.js, MongoDB, and modern web technologies.

## Features

### 🔐 Authentication & User Management
- User registration and login system
- Role-based access (User, Pharmacy, Admin)
- JWT-based authentication with secure cookies
- Password hashing with bcrypt

### 🏠 Core Features
- **Medicine Search** - Search for medicines with location filtering
- **Real-time Stock** - Check live inventory status
- **Emergency Delivery** - Urgent medicine requests
- **Payment System** - Multiple payment methods support
- **Order Tracking** - Real-time delivery tracking
- **Mapbox Integration** - Interactive maps with pharmacy locations

### 📱 User Experience
- **User Dashboard** - Recent searches and order history
- **Profile Management** - Personal info and preferences
- **Notification Center** - Real-time notifications
- **Responsive Design** - Mobile-first approach

### 🏪 Pharmacy Management
- **Pharmacy Dashboard** - Inventory and order management
- **Stock Management** - Add/edit medicine inventory
- **Order Processing** - Accept/decline delivery requests

### 👨‍💼 Admin Panel
- **User Management** - View and manage all users
- **Pharmacy Verification** - Approve/reject registrations
- **System Analytics** - Platform statistics

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcryptjs
- **UI Components**: Radix UI + Tailwind CSS
- **Maps**: Mapbox GL JS with React Map GL
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- Mapbox access token (for map features)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd medroute-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp app/env.example .env.local
\`\`\`

Edit `.env.local` with your configuration:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/medroute
JWT_SECRET=your-super-secret-jwt-key-here
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiYWJoaXJpZGVyMjUiLCJhIjoiY21hbXliaGZ1MG9odDJpc2RqazA3c2lxNSJ9.OV67Ho4J97EC7tjjgj6DwA
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Mapbox access token for maps | Yes |

## Map Features

The application uses Mapbox for interactive maps with the following features:

- **Interactive Navigation** - Zoom, pan, and navigate the map
- **Pharmacy Markers** - Visual indicators for pharmacy locations
- **User Location** - Shows your current position
- **Popup Information** - Click markers for detailed pharmacy info
- **Geolocation** - Automatic location detection
- **Responsive Design** - Works on all device sizes

### Mapbox Setup

1. Sign up at [Mapbox](https://www.mapbox.com/)
2. Create a new access token
3. Add the token to your `.env.local` file as `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
4. The map will automatically load with your token

Note: The application is designed to work exclusively with Mapbox. Google Maps is not used.

## Project Structure

\`\`\`
medroute-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── dashboard/         # User dashboard
│   ├── pharmacy/          # Pharmacy pages
│   └── ...
├── components/            # React components
│   ├── mapbox-map.tsx     # Mapbox integration
│   ├── pharmacy-map.tsx   # Pharmacy map component
│   └── ...
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── models/                # MongoDB models
└── ...
\`\`\`

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Medicine & Search
- `GET /api/medicine/search` - Search medicines
- `GET /api/medicine/alternatives` - Get alternative medicines

### Pharmacy
- `GET /api/pharmacy/dashboard` - Pharmacy dashboard data
- `POST /api/pharmacy/add-stock` - Add medicine to inventory
- `GET /api/pharmacy/nearby` - Find nearby pharmacies

### Orders & Delivery
- `POST /api/delivery/emergency` - Emergency delivery request
- `POST /api/payment/process` - Process payment
- `GET /api/orders/track/[trackingId]` - Track order

### User Management
- `GET /api/user/dashboard` - User dashboard data
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/orders` - Get user orders

### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- `POST /api/admin/verify-pharmacy` - Verify pharmacy

## Database Models

### User
- Personal information
- Authentication credentials
- Preferences and settings
- Recent searches

### Pharmacy
- Business information
- Inventory management
- Operating hours
- Location coordinates

### Medicine
- Medicine details
- Active compounds
- Alternatives
- Categories

### Order
- Order items and details
- Payment information
- Delivery tracking
- Status updates

## Features in Detail

### Medicine Search
- Search by medicine name or active compound
- Location-based filtering
- Real-time stock availability
- Alternative medicine suggestions

### Interactive Maps
- Mapbox-powered interactive maps
- Real-time pharmacy locations
- User geolocation
- Detailed pharmacy information
- Navigation controls

### Emergency Delivery
- Priority delivery requests
- Urgent medicine needs
- Real-time pharmacy notifications
- Fast-track processing

### Payment System
- Multiple payment methods
- Secure payment processing
- Order confirmation
- Receipt generation

### Order Tracking
- Real-time status updates
- Delivery partner information
- Estimated delivery times
- Order history

### Admin Dashboard
- User management
- Pharmacy verification
- System analytics
- Platform monitoring

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
4. Deploy automatically

### Manual Deployment

1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Contact: support@medroute.com

---

Built with ❤️ using Next.js, Mapbox, and modern web technologies.
