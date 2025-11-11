# React Neumorphic

A beautiful neumorphic UI component library for React with Tailwind CSS.

## Features

- 🎨 Beautiful neumorphic design
- ⚡ Built with React 19 & Tailwind CSS 4
- 📦 Tree-shakeable components
- 🌙 Dark mode support
- 📱 Fully responsive
- ♿ Accessible components
- 🎭 Storybook documentation

## Installation

```bash
npm install react-neumorphic
```

## Quick Start

### 1. Initialize in your project

```bash
npx neu init
```

This will prompt you for:
- Component installation path (default: `./src/components`)
- Utils installation path (default: `./src/lib`)
- Global CSS file path (default: `./src/index.css`)

### 2. Install dependencies

```bash
npm install clsx tailwind-merge
```

### 3. Add components

```bash
npx neu add button
npx neu add card
```

### 4. Use in your app

```tsx
import { NeuButton } from '@/components/ui/button';

function App() {
  return (
    <div className="p-8">
      <NeuButton variant="default">
        Click Me
      </NeuButton>
      
      <NeuButton variant="soft">
        Soft Button
      </NeuButton>
      
      <NeuButton variant="glass">
        Glass Button
      </NeuButton>
    </div>
  );
}
```

## Available Components

- `button` - Neumorphic button with variants (default, soft, glass)
- `card` - Neumorphic card component
- More coming soon...

## Documentation

Run Storybook locally to see all components and their documentation:

```bash
git clone https://github.com/YOUR_USERNAME/react-neumorphic
cd react-neumorphic
npm install
npm run dev
```

Visit `http://localhost:6006` to browse the component library.

## How It Works

Similar to shadcn/ui, this library copies component source code directly into your project. This gives you:

- Full control over the components
- Ability to customize as needed
- No dependency bloat
- Easy to understand and modify

## License

MIT
