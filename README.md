# Lumina Registry

Crextio-themed [shadcn/ui](https://ui.shadcn.com) component registry. Components are built to static JSON files and served from `public/r/`.

## Quick start (consumers)

```bash
npx shadcn@latest add https://<your-domain>/r/lumina.json
npx shadcn@latest add https://<your-domain>/r/button.json
npx shadcn@latest add https://<your-domain>/r/navbar.json
```

See [docs/lumina/installation.md](docs/lumina/installation.md) for the full guide.

## Structure

```
registry/
  lumina/
    theme/lumina.css   # Theme tokens (registry:theme)
    lib/utils.ts       # cn() helper
    ui/                # 50+ themed shadcn components
    blocks/            # 12 dashboard blocks
registry.json          # Merged manifest for shadcn build
public/r/              # Built registry JSON (generated)
```

## Develop

```bash
pnpm install
pnpm registry:sync      # Regenerate registry.json from source files
pnpm registry:validate  # Validate via shadcn registry:build
pnpm registry:build     # Build public/r/*.json
pnpm dev                # Preview demo + served registry
```

## Tiers

- **Base** — `button`, `badge`, `kpi-pill`, …
- **Composite** — `card`, `dropdown-menu`, `popover`, …
- **Blocks** — `navbar`, `progress-card`, `calendar-card`, …

## License

MIT
