# React Neumorphic UI

A modern neumorphic UI component library for React with shadcn-inspired CLI. Copy components directly into your project - no dependencies, full customization.

## ✨ Features

- 🎨 **Beautiful Neumorphic Design** - Soft, elegant shadows and depth
- ⚡ **Modern Stack** - React 19, TypeScript, Tailwind CSS 4
- �️ **C-LI Tool** - Add components with a single command
- 📦 **Copy, Don't Install** - Own your components, customize freely
- 🌙 **Dark Mode Ready** - Automatic light/dark theme support
- 📱 **Fully Responsive** - Mobile-first design approach
- ♿ **Accessible** - ARIA compliant components
- 🎭 **Storybook Docs** - Interactive component playground

## Quick Start

No installation required! Use `npx` to get started:

### 1. Initialize in your project

```bash
npx react-neumorphic init
```

This will:
- Prompt you for component paths (components, utils, CSS)
- Create utility functions (`cn` helper)
- Add neumorphic CSS styles with shadow utilities
- Auto-install dependencies (clsx, tailwind-merge)
- Create `neu.config.json` for CLI configuration

### 2. Add components

```bash
npx react-neumorphic add button
npx react-neumorphic add card
```

Components are fetched directly from GitHub and added to your project!

**Available components:**
- `button` - Neumorphic button with variants (default, soft, glass)
- `card` - Neumorphic card component
- `badge` - Badge component

### Alternative: Shorter Command (After First Use)

Once npx has cached the package, you can use the shorter alias:

```bash
npx react-neu init
npx react-neu add button
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

## Alternative: Install as Package

If you prefer to use components directly without copying source code:

```bash
npm install react-neumorphic
```

Then import:

```tsx
import { NeuButton } from 'react-neumorphic';
import 'react-neumorphic/styles';
```

## Available Components

- `button` - Neumorphic button with variants (default, soft, glass)
- `card` - Neumorphic card component
- More coming soon...

## CLI Alias (Optional)

For shorter commands, you can create an alias:

```bash
# Add to your ~/.bashrc or ~/.zshrc
alias neu="npx react-neu"

# Then use:
neu init
neu add button
```

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
