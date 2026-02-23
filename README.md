# scolariX - School Management System

A modern, full-featured school management system built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Features a sleek dark tech design with two distinct user roles: **Admin** and **Parent**.

## 🎯 Key Features

### 👨‍💼 Admin Dashboard
- **📊 Dashboard** - Real-time overview with school statistics
- **📝 Results Management** - Track and publish academic results
- **✓ Attendance System** - Monitor student presence and absences
- **📅 Schedule Management** - Create and manage class schedules
- **💳 Payment Management** - Track school fee payments
- **👥 Student Management** - Manage student profiles and data
- **👨‍👩‍👧 Parent Management** - Manage parent accounts
- **💬 Messaging System** - Direct communication with parents/teachers
- **⚙️ Settings** - Configure school information
- **📈 Analytics** - Performance metrics and reports

### 👨‍👩‍👧 Parent Portal
- **📊 Dashboard** - Overview of children's academic progress
- **📝 Results Tracking** - View detailed grades and bulletins
- **✓ Attendance Monitoring** - Track presence/absence rates
- **📅 Schedule View** - Access school schedules
- **💳 Payment Management** - View and pay school fees
- **💬 Messaging** - Communicate with teachers and admin
- **📱 WhatsApp Integration** - Quick communication option

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI/Styling**: Tailwind CSS 3+ with custom dark theme
- **State Management**: React Context API + Hooks
- **Forms**: React Hook Form + Zod validation
- **Data Visualization**: Recharts
- **HTTP Client**: Axios
- **Query Management**: React Query
- **Notifications**: React Hot Toast
- **Authentication**: Custom Auth Context

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/              # Admin dashboard pages
│   │   ├── page.tsx        # Dashboard
│   │   ├── results/        # Results management
│   │   ├── attendance/     # Attendance tracking
│   │   ├── schedule/       # Schedule management
│   │   ├── payments/       # Payment management
│   │   ├── students/       # Student management
│   │   ├── messages/       # Messaging system
│   │   └── settings/       # Settings
│   ├── parent/             # Parent portal pages
│   │   ├── page.tsx        # Parent dashboard
│   │   ├── results/        # View results
│   │   ├── attendance/     # View attendance
│   │   ├── schedule/       # View schedule
│   │   ├── payments/       # View payments
│   │   └── messages/       # Messaging
│   ├── login/              # Login page
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── layout/             # Layout components
│       ├── Sidebar.tsx
│       └── TopBar.tsx
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── types/
│   └── index.ts            # TypeScript types
└── styles/
    └── globals.css         # Global styles & animations
```

## 📋 Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## 🚀 Installation & Setup

```bash
# Install dependencies with legacy peer deps flag
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## 🔐 Test Credentials

### Admin Account
- **Email**: admin@scolarix.com
- **Password**: admin123
- **Full Access**: All management features

### Parent Account
- **Email**: parent@example.com
- **Password**: parent123
- **Access**: Student monitoring and communication

## 🎨 Design Features

### Dark Tech Theme
- Modern dark gradient backgrounds (#030712 to #111827)
- Primary cyan color (#0ea5e9) with accent pink (#ec4899)
- Glass-morphism effect on cards and containers
- Smooth animations and transitions
- Fully responsive on mobile, tablet, and desktop

### UI Components
- Reusable `Button` component with multiple variants (primary, secondary, danger, ghost)
- Flexible `Card` component with glass effect option
- Custom `Sidebar` with active state highlighting
- Dynamic `TopBar` with user profile menu
- Data tables with sorting and filtering
- Status badges with color coding

## 🔑 Key Components

### Authentication (`src/contexts/AuthContext.tsx`)
- Mock authentication system (ready for API integration)
- User state management
- Login/logout functionality
- Role-based access control

### UI Components
- **Button**: Multiple variants and sizes
- **Card**: Glass-morphism design with hover effects
- **Sidebar**: Responsive navigation with icons
- **TopBar**: User info and quick actions

### Mock Data
All pages include realistic mock data:
- Student and parent information
- Academic results with grades
- Attendance records
- Payment transactions
- Class schedules
- Messages and notifications

## 📱 Responsive Design

- **Mobile First** approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Touch-friendly interface
- Optimized for small screens with collapsible navigation

## 🔄 Ready for Backend Integration

The application is structured for easy backend integration:

### Example API Integration Points
```typescript
// In AuthContext or API service
const login = async (email: string, password: string) => {
  const response = await axios.post('/api/auth/login', { email, password });
  return response.data;
};

// In components
const fetchResults = async (studentId: string) => {
  const response = await axios.get(`/api/results/${studentId}`);
  return response.data;
};
```

## 🚀 Deployment Ready

- Optimized for Vercel deployment
- Environment variables support ready
- Production build configuration
- SEO-friendly with Next.js built-in features

## 📝 Environment Variables

Create a `.env.local` file (when deploying):
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
```

## 🎯 Future Enhancements

- [ ] Backend API integration (Node.js/Express, Django, etc.)
- [ ] Database integration (PostgreSQL, MongoDB)
- [ ] User authentication with JWT
- [ ] Real-time notifications
- [ ] SMS integration
- [ ] Report generation and PDF export
- [ ] Advanced analytics dashboard
- [ ] Student portfolio system
- [ ] Homework and assignment tracking
- [ ] Automatic form validation

## 🤝 Contributing

Fork the repository and create a pull request for improvements.

## 📄 License

© 2026 scolariX. All rights reserved.

## 📧 Support

For support and inquiries, contact: admin@scolarix.com

---

**Built with ❤️ for educational institutions**

## 📱 Pages Disponibles

### Administrateur
- `/admin` - Tableau de bord
- `/admin/students` - Gestion des étudiants
- `/admin/parents` - Gestion des parents
- `/admin/results` - Résultats scolaires
- `/admin/attendance` - Présences
- `/admin/schedule` - Emploi du temps
- `/admin/payments` - Paiements
- `/admin/messages` - Messages WhatsApp
- `/admin/settings` - Paramètres

### Parent
- `/parent` - Tableau de bord
- `/parent/results` - Résultats des enfants
- `/parent/attendance` - Présences des enfants
- `/parent/schedule` - Emploi du temps
- `/parent/payments` - Paiements
- `/parent/messages` - Messages avec l'école

## 💡 Fonctionnalités Futures

- [ ] Intégration réelle de base de données
- [ ] Authentification sécurisée avec JWT
- [ ] Notifications par email et SMS
- [ ] Export PDF des bulletins
- [ ] Calendrier événements partagé
- [ ] Video call avec parents
- [ ] Mobile app (React Native)
- [ ] Multi-langues

## 📝 Notes de Développement

- Le projet utilise des données mockées pour demonstration
- L'authentification est locale (localStorage)
- Les modifications ne sont pas persistées

## 📞 Support

Pour toute question ou bug report, veuillez ouvrir une issue.

## 📄 Licence

MIT License

---

**Développé avec ❤️ pour améliorer l'éducation**
