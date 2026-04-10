# Contact Manager

A simple and efficient contact management application built with Next.js 14, React, and Tailwind CSS.

## Features

- **Easy Contact Management**: Add, edit, and delete contacts with a clean interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS for a beautiful, modern interface
- **Fast Performance**: Leveraging Next.js for optimal performance
- **Type Safety**: Built with TypeScript for better code quality

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd next-js-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with navigation
│   ├── page.tsx        # Home page with contact manager
│   ├── about/          # About page
│   ├── services/       # Services page
│   └── contact/        # Contact us page
├── public/
│   └── favicon.svg     # Site favicon
├── styles/
│   └── globals.css     # Global styles
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Usage

1. **Adding Contacts**: Fill in the name, email, and phone fields and click "Add Contact"
2. **Editing Contacts**: Click the "Edit" button on any contact to modify its information
3. **Deleting Contacts**: Click the "Delete" button to remove a contact
4. **Navigation**: Use the navigation menu to explore different pages

## Building for Production

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm start
# or
yarn start
```

## Technologies Used

- **Next.js 14**: React framework for production
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing

## License

This project is open source and available under the MIT License.
