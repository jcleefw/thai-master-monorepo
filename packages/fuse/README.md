# @thai-master/fuse

Fuse is the reusable component library for Thai Master application. It provides accessible, themed UI components built with React, TypeScript, Styled Components, and Radix UI.

## Features

- 🎨 **Themed Components**: All components use a vibrant color palette optimized for Thai language learning
- 🌏 **Thai Font Support**: Noto Sans Thai and Sarabun fonts with accurate tone mark positioning
- ♿ **Accessibility**: Built with Radix UI primitives for WCAG compliance
- 📖 **Storybook**: Interactive component documentation and development environment
- 🔧 **TypeScript**: Full type safety and autocomplete
- ⚡ **Vite**: Fast builds and HMR

## Installation

```bash
npm install @thai-master/fuse
```

## Usage

```typescript
import { Button, theme, GlobalStyles } from '@thai-master/fuse';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
}
```

## Development

### Running Storybook

Start the Storybook dev server to develop and preview components in isolation:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006` with:
- **Hot Module Replacement (HMR)**: Changes to components update instantly
- **Interactive Controls**: Modify props in real-time
- **Theme Integration**: All stories wrapped with ThemeProvider and GlobalStyles
- **Thai Font Preview**: Test Thai text rendering with tone marks

### Creating Stories

Stories should be created next to components using the CSF3 (Component Story Format 3) pattern:

```
src/components/MyComponent/
├── MyComponent.tsx
├── MyComponent.types.ts
├── MyComponent.styles.ts
├── MyComponent.stories.tsx  ← Story file
├── index.ts
└── tests/
    └── MyComponent.test.tsx
```

**Example Story (CSF3 Format):**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'My Component',
  },
};

export const WithThaiText: Story = {
  args: {
    children: 'สวัสดี ครับ - ก้า ก๊า ก่า ก๋า',
  },
};
```

### Building Static Storybook

Build a static version of Storybook for deployment:

```bash
npm run build-storybook
```

Output will be in `storybook-static/` directory.

### Testing

Run unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Building the Library

Build the Fuse library:

```bash
npm run build
```

This generates:
- `dist/fuse.js` - ES module
- `dist/fuse.umd.cjs` - UMD module
- `dist/index.d.ts` - TypeScript declarations

### Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Theme System

Fuse provides a comprehensive theme system with:

### Colors

| Color | HEX | Use Case |
|-------|-----|----------|
| `cream` | `#fff4e4` | Primary background (Old Lace) |
| `lavender` | `#f7e8a4` | Secondary background (Vanilla Custard) |
| `sage` | `#6efafb` | Accents (Electric Aqua) |
| `periwinkle` | `#0091ad` | Interactive elements (Pacific Cyan) |
| `coral` | `#ff57bb` | Highlights (Bubblegum Fizz) |
| `charcoal` | `#1A202C` | Primary text (7:1 contrast) |

### Typography

- **Primary Font**: Sarabun
- **Fallback Font**: Noto Sans Thai
- **Base Size**: 16px
- **Line Height**: 1.5
- **Tone Mark Support**: Full Unicode Thai support (U+0E00 to U+0E7F)

### Spacing Scale

- `xs`: 8px
- `sm`: 16px
- `md`: 24px
- `lg`: 32px
- `xl`: 48px

### Breakpoints

- `mobile`: 0px
- `tablet`: 768px
- `desktop`: 1024px

## Component Guidelines

### Naming Conventions

- Components: PascalCase (`Button`, `FlashCard`)
- Files: Match component name (`Button.tsx`)
- Types: Component name + Props (`ButtonProps`)
- Stories: Component name + `.stories.tsx` (`Button.stories.tsx`)
- Tests: Component name + `.test.tsx` (`Button.test.tsx`)

### File Structure

```
Component/
├── Component.tsx          # Component implementation
├── Component.types.ts     # TypeScript interfaces
├── Component.styles.ts    # Styled components
├── Component.stories.tsx  # Storybook stories
├── index.ts              # Barrel export
└── tests/
    └── Component.test.tsx # Unit tests
```

### Thai Language Support

When creating components that display Thai text:

- ✅ Use theme fonts (Sarabun/Noto Sans Thai)
- ✅ Test with tone marks (้ ๊ ่ ๋)
- ✅ Ensure minimum 48pt font size for canvas/practice modes
- ✅ Maintain 7:1 contrast ratio (charcoal on cream)
- ✅ Create story variants with Thai text examples

## Architecture

- **No App Logic**: Fuse components are generic and reusable
- **Props-Only Communication**: No direct access to app state (Zustand)
- **Styled Components**: All styling via styled-components (no Tailwind)
- **Radix UI**: Accessibility primitives for complex components
- **Peer Dependencies**: React, React DOM, and Styled Components

## Contributing

1. Create component in `src/components/`
2. Follow file structure guidelines
3. Write unit tests in `tests/` subdirectory
4. Create Storybook story with CSF3 format
5. Include Thai text examples in stories
6. Ensure TypeScript types are exported
7. Add component to `src/index.ts`
8. Build and test before committing

## License

MIT
