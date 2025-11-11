# Contributing to React Neumorphic

## Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning and changelog generation.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature (triggers minor version bump)
- **fix**: A bug fix (triggers patch version bump)
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **build**: Changes to build system or dependencies
- **ci**: Changes to CI configuration
- **chore**: Other changes that don't modify src or test files

### Examples

```bash
# New feature (1.0.0 → 1.1.0)
git commit -m "feat: add toggle component"
git commit -m "feat(button): add loading state"

# Bug fix (1.0.0 → 1.0.1)
git commit -m "fix: correct button shadow in dark mode"
git commit -m "fix(card): resolve padding issue"

# Breaking change (1.0.0 → 2.0.0)
git commit -m "feat!: redesign button API

BREAKING CHANGE: Button now uses 'size' prop instead of 'variant'"

# Documentation
git commit -m "docs: update installation guide"

# No release
git commit -m "chore: update dependencies"
```

## Development Workflow

1. **Fork and clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/react-neumorphic.git
cd react-neumorphic
```

2. **Install dependencies**

```bash
npm install
```

3. **Start Storybook**

```bash
npm run dev
```

4. **Make your changes**

- Add components in `src/components/ui/`
- Add stories for Storybook
- Update documentation

5. **Build and test**

```bash
npm run build
npm run build-storybook
```

6. **Commit with conventional commits**

```bash
git add .
git commit -m "feat: add new component"
```

7. **Push and create PR**

```bash
git push origin your-branch
```

## Automated Release Process

When you push to `main` branch:

1. **Semantic Release** analyzes commit messages
2. Determines the next version number
3. Generates CHANGELOG.md
4. Updates package.json version
5. Publishes to npm
6. Creates GitHub release with notes

## Adding New Components

Use the CLI to scaffold new components:

```bash
npm run add ComponentName
```

This creates:
- Component file with TypeScript
- Storybook story
- Index file for exports

## Questions?

Open an issue or discussion on GitHub!
