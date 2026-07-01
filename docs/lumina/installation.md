# Lumina — Crextio shadcn Registry

Lumina is a [shadcn/ui](https://ui.shadcn.com) registry that ships Crextio-themed components and dashboard blocks. Install only what you need — components copy into your project as source.

## Prerequisites

- React 18+
- Tailwind CSS v4
- shadcn/ui initialized: `npx shadcn@latest init -d`

## Install from static registry

Replace `<your-domain>` with your deployed Lumina host (e.g. `lumina.vercel.app` or `localhost:3000` during local dev).

```bash
# Theme — merge CSS into your Tailwind entry file
npx shadcn@latest add https://<your-domain>/r/lumina.json

# UI components
npx shadcn@latest add https://<your-domain>/r/button.json
npx shadcn@latest add https://<your-domain>/r/card.json
npx shadcn@latest add https://<your-domain>/r/dropdown-menu.json

# Dashboard blocks
npx shadcn@latest add https://<your-domain>/r/navbar.json
npx shadcn@latest add https://<your-domain>/r/welcome-kpi.json
```

## Local development install

With the dev server running (`pnpm dev`):

```bash
npx shadcn@latest add http://localhost:3000/r/button.json
```

## Theme customization

After installing `lumina`, merge the CSS snippet into your Tailwind file. Override shadcn semantic tokens:

```css
:root {
  --primary: #6366f1;
  --crextio-shell-warm: #eef2ff;
}
```

Override a single component via `className` or edit the copied source file (shadcn model).

## Catalog

Browse all built items at `https://<your-domain>/r/registry.json`.

## Tiers

| Tier | Examples |
|------|----------|
| **Base** | `button`, `badge`, `input`, `kpi-pill` |
| **Composite** | `card`, `dropdown-menu`, `popover`, `dialog` |
| **Blocks** | `navbar`, `progress-card`, `calendar-card` |

## Develop locally

```bash
pnpm registry:sync      # regenerate registry.json
pnpm registry:validate  # validate manifest
pnpm registry:build     # build public/r/*.json
```

## License

MIT
