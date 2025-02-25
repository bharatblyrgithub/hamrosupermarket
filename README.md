# Hamro Supermarket

A modern e-commerce platform built with Next.js 13, TypeScript, Tailwind CSS, and Prisma.

## Features

- 🛍️ Product browsing and searching
- 🛒 Shopping cart functionality
- 👤 User authentication and authorization
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔐 Admin dashboard for product and order management
- 📦 MongoDB database with Prisma ORM
- 🔍 Real-time search functionality
- 📱 Mobile-friendly interface

## Tech Stack

- **Frontend:**
  - Next.js 13 (App Router)
  - TypeScript
  - Tailwind CSS
  - NextAuth.js for authentication

- **Backend:**
  - Next.js API Routes
  - Prisma ORM
  - MongoDB

- **Tools & Libraries:**
  - ESLint for code linting
  - date-fns for date formatting
  - bcryptjs for password hashing

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hamrosupermarket.git
   cd hamrosupermarket
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="your_mongodb_url"
   NEXTAUTH_SECRET="your_secret_key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/                 # Next.js 13 app directory
│   │   ├── api/            # API routes
│   │   ├── admin/          # Admin dashboard pages
│   │   └── ...            # Other pages
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   └── ...           # Feature-specific components
│   ├── lib/               # Utility functions and configurations
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Helper functions
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets
└── ...                    # Config files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema changes to database

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
