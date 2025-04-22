# Project Name

A PPS web application built with Next.js 14, React 18, and Shadcn UI components.

Before push make sure **BUILD** it first at your local

## Tech Stack

- **Runtime:** Node.js 22.13
- **Framework:** Vite 6.3.1
- **UI Library:** React 18
- **Component Library:** Shadcn UI
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 22.16 or higher
- npm is recommended
- setup prettier in your settings.json and add this rules
  <pre>
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.formatOnSave": true
  </pre>

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/moonlay-technologies/react-vite-boilerplate
cd project-name
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5137](http://localhost:5137) in your browser.

## Project Structure

```
├── node_modules
├── public/
|   ├── logo.svg
|   └── fonts/
├── src/                     # React 18 SRC directory
|   ├── assets/              # Static files
|   │   └── images/
|   │
|   |
|   ├── components/          # React components
|   │   ├── ui/              # Shadcn UI components
|   │   │   ├── button.tsx
|   │   ├── dialog.tsx
|   │   │   └── ...
|   |   └── other components
│   │             # Authentication-related routes
|   ├── lib/                 # Utility functions and configurations
|   │   ├── utils.ts         # Helper functions
|   │   └── constants.ts     # Constants and enums
|   ├── types/              # only for Global TypeScript type definitions
|   │   ├── some-types.ts   # Store types here
|   │   └── index.ts        # Type exports
|   |
|   ├── services/
|   |      # api configuration setup
│   ├── App.tsx/
│   ├── main.tsx/
│   └── Index.css         # Root layout
│
├── .env
├── package.json
├── vite.config.ts
└── other configs

```

## Component Guidelines

### UI Components (components/ui/)

- Contains all Shadcn UI components
- Do not modify these files directly
- Use the Shadcn CLI to add new components:

```bash
npm npx shadcn-ui@latest add button
```

### Custom Components

- Place reusable components in appropriate subdirectories
- Follow the naming convention: `name-component.tsx`
- Include component-specific types in the same file
- Create an `index.ts` file for easier imports

Example component structure:

```typescript
// components/shared/DataTable/DataTable.tsx
interface DataTableProps {
  data: any[];
  columns: Column[];
  // ...other props
}

export const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  // Component logic
};
```

## Hooks Usage

Custom hooks are located in the `hooks/` directory. Each hook should:

- Have a clear, single responsibility
- Be prefixed with `use`
- Include TypeScript types
- Have proper error handling

Example:

```typescript
// hooks/use-pagination.ts
export const usePagination = (totalItems: number, itemsPerPage: number) => {
  // Hook logic
};
```

## State Management

This project uses React's built-in state management solutions:

- `useState` for component-level state
- `Zustand` for shared state

## Styling

- Use Tailwind CSS for styling
- Follow the utility-first approach
- Use CSS modules for complex components
- Maintain consistent spacing and color schemes

## Development Workflow

1. Create a new branch for each feature/fix
2. Follow conventional commits
3. Write tests for new features
4. Create a PR for review
5. Ensure CI passes before merging

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run test       # Run tests
```

## Environment Variables

Required environment variables:

```bash
VITE_APP_API_URL=
# Add other required variables
```

## Deployment

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start
```
