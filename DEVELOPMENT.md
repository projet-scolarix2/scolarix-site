# scolariX Development Guide

## Quick Start

### 1. Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Git**: for version control

### 2. Installation Steps

```bash
# Navigate to project directory
cd Documents/scolarix

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Development

### File Structure Overview

```
scolarix/
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── page.tsx       # Dashboard home
│   │   │   ├── layout.tsx     # Admin layout
│   │   │   ├── results/       # Results pages
│   │   │   ├── attendance/    # Attendance pages
│   │   │   ├── schedule/      # Schedule pages
│   │   │   ├── payments/      # Payment pages
│   │   │   └── messages/      # Messaging pages
│   │   ├── parent/            # Parent portal
│   │   │   ├── page.tsx       # Parent dashboard
│   │   │   ├── layout.tsx     # Parent layout
│   │   │   ├── results/       # Results pages
│   │   │   ├── attendance/    # Attendance pages
│   │   │   ├── schedule/      # Schedule pages
│   │   │   ├── payments/      # Payment pages
│   │   │   └── messages/      # Messaging pages
│   │   ├── login/             # Login page
│   │   ├── page.tsx           # Root redirect
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx     # Button component
│   │   │   └── Card.tsx       # Card component
│   │   └── layout/
│   │       ├── Sidebar.tsx    # Navigation sidebar
│   │       └── TopBar.tsx     # Top navigation bar
│   ├── contexts/
│   │   └── AuthContext.tsx    # Authentication state
│   └── types/
│       └── index.ts           # TypeScript types
├── .env.example               # Environment variables template
├── .eslintrc.json             # ESLint configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Running the Application

### Development Mode
```bash
npm run dev
```
- Hot reload enabled
- Access at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Test User Accounts

### Admin Account
- **Email**: admin@scolarix.com
- **Password**: admin123

### Parent Account
- **Email**: parent@example.com
- **Password**: parent123

## Key Features Implemented

### ✅ Completed
- [x] Authentication system (mock)
- [x] Admin dashboard
- [x] Parent dashboard
- [x] Results management
- [x] Attendance tracking
- [x] Schedule pages
- [x] Payment management
- [x] Messaging system
- [x] Dark tech UI design
- [x] Responsive layout
- [x] WhatsApp integration links

### 🔄 Ready for Backend
- [ ] API endpoints
- [ ] Database models
- [ ] Real authentication
- [ ] Payment processing
- [ ] Real-time messaging

## Component Documentation

### Button Component
```tsx
<Button 
  variant="primary" | "secondary" | "danger" | "ghost"
  size="sm" | "md" | "lg"
  isLoading={false}
  icon={<Icon />}
>
  Click me
</Button>
```

### Card Component
```tsx
<Card hover glass>
  <CardHeader title="Title" subtitle="Subtitle" icon="🎯" />
  <CardBody>
    Content here
  </CardBody>
</Card>
```

## Common Tasks

### Adding a New Page
1. Create file: `src/app/path/page.tsx`
2. Import components:
```tsx
"use client";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
```
3. Create page component
4. Navigation will auto-update in sidebar

### Styling
- Use Tailwind CSS classes
- Custom colors in `src/app/globals.css`
- Dark theme: `dark-{50-950}` color scale
- Primary color: `primary-{50-900}`
- Accent color: `accent-{50-900}`

### Adding Mock Data
Update files directly or add to component state:
```tsx
const mockData = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];
```

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Push to GitHub
# Deploy via Vercel Dashboard
```

### Other Platforms
```bash
npm run build
npm start
```

## Troubleshooting

### Port Already in Use
```bash
# Change port
npm run dev --port 3001
```

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit
```

## Environment Variables

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WHATSAPP_NUMBER=243700000000
```

## Performance Optimization

- Images: Use Next.js `Image` component
- Lazy loading: Use `dynamic` imports
- State: Use `useContext` for global state
- Forms: Use `react-hook-form`

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | Latest  |
| Firefox | Latest  |
| Safari  | Latest  |
| Edge    | Latest  |
| Mobile  | Yes     |

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Docs](https://www.typescriptlang.org)

## Support

For issues or questions:
1. Check existing documentation
2. Review component examples
3. Check TypeScript types
4. Debug with browser DevTools

---

**Happy coding! 🚀**
