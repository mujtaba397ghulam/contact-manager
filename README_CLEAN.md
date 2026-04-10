# Contact Manager Pro

A modern, feature-rich contact management application built with Next.js, TypeScript, and TailwindCSS.

## 🚀 Features

- **Smart Search & Filters** - Advanced search with multiple criteria
- **Categories & Tags** - Organize contacts efficiently  
- **Dark Mode** - Automatic theme switching
- **Analytics Dashboard** - Visual insights and statistics
- **Import/Export** - CSV and JSON support
- **Favorites** - Mark important contacts
- **Responsive Design** - Works on all devices
- **Local Storage** - Data persists between sessions

## 📁 Project Structure

```
next-js-website/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   ├── dashboard/         # Dashboard page
│   ├── import/            # Import/Export page
│   └── settings/          # Settings page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx    # Button component
│   │   ├── Card.tsx      # Card component
│   │   ├── Input.tsx     # Input component
│   │   ├── Badge.tsx     # Badge component
│   │   ├── Icon.tsx      # Icon component
│   │   ├── Loading.tsx   # Loading component
│   │   └── EmptyState.tsx # Empty state component
│   ├── ContactCard.tsx    # Contact display component
│   ├── ContactFormClean.tsx # Contact form component
│   ├── AdvancedSearch.tsx # Search component
│   └── Navbar.tsx         # Navigation component
├── contexts/              # React contexts
│   └── ThemeContext.tsx   # Theme management
├── hooks/                 # Custom React hooks
│   └── useContacts.ts     # Contact management hook
├── types/                 # TypeScript definitions
│   └── index.ts          # Type definitions
├── utils/                 # Utility functions
│   ├── constants.ts      # App constants
│   └── helpers.ts        # Helper functions
├── styles/               # CSS files
│   └── globals.css       # Global styles
└── models/               # Database models
    └── Contact.ts        # Contact schema
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: MongoDB (optional)
- **State Management**: React Context + Custom Hooks
- **Storage**: LocalStorage

## 🚀 Getting Started

### Prerequisites

- Node.js 14+ 
- npm or yarn
- MongoDB (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd next-js-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional for MongoDB):
```bash
cp .env.local.example .env.local
# Edit .env.local with your MongoDB connection string
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📝 Code Organization

### Components

All components follow these principles:
- **Single Responsibility** - Each component has one clear purpose
- **Props Interface** - TypeScript interfaces for all props
- **Reusability** - UI components are generic and reusable
- **Composition** - Complex components built from simple ones

### State Management

- **useContacts Hook** - Centralized contact management
- **Local Storage** - Automatic persistence
- **Theme Context** - Global theme state

### Styling

- **Utility-First** - TailwindCSS classes
- **Dark Mode** - Automatic color scheme support
- **Responsive** - Mobile-first design
- **Animations** - Smooth transitions

### Type Safety

- **TypeScript** - Full type coverage
- **Interfaces** - Clear data structures
- **Type Guards** - Runtime type checking

## 🧩 Key Components

### UI Components

- **Button** - Configurable button with variants
- **Card** - Container with consistent styling
- **Input** - Form input with validation
- **Badge** - Tag/category display
- **Icon** - SVG icon system

### Feature Components

- **ContactCard** - Display individual contact
- **ContactForm** - Add/edit contacts
- **AdvancedSearch** - Multi-criteria search
- **Dashboard** - Analytics and stats

## 🔧 Utilities

### Constants
- Categories, tags, colors defined in one place
- Easy to modify and extend

### Helpers
- Contact filtering and sorting
- Data export (CSV/JSON)
- Date formatting
- Phone number formatting

## 🎨 Customization

### Adding New Features

1. Create types in `types/index.ts`
2. Add UI components in `components/ui/`
3. Update hooks in `hooks/`
4. Modify pages in `app/`

### Styling

- Edit `tailwind.config.js` for theme
- Modify `globals.css` for animations
- Update component classes

### Data Model

- Extend `Contact` interface in types
- Update form validation
- Modify storage functions

## 📚 Best Practices

1. **Keep components small** - Single responsibility
2. **Use TypeScript** - Type everything
3. **Extract constants** - No magic strings
4. **Write clean code** - Self-documenting
5. **Handle errors** - User-friendly messages
6. **Test edge cases** - Empty states, errors
7. **Optimize performance** - Memoization, lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the MIT License.