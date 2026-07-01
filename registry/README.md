# Lumina Registry

Crextio-themed [shadcn/ui](https://ui.shadcn.com) component registry. Published via **static JSON** at `/r/*.json`.

## Quick start

```bash
npx shadcn@latest add https://<your-domain>/r/lumina.json
npx shadcn@latest add https://<your-domain>/r/button.json
npx shadcn@latest add https://<your-domain>/r/navbar.json
```

See [docs/lumina/installation.md](../docs/lumina/installation.md) for full guide.

## Structure

```
registry/
  lumina/
    theme/lumina.css   # Theme tokens (registry:theme)
    lib/utils.ts       # cn() helper
    ui/                # 50+ themed shadcn components
    blocks/            # 12 dashboard blocks
registry.json        # Merged manifest for shadcn build
```

## Develop

```bash
pnpm registry:sync      # Regenerate registry.json
pnpm registry:validate  # Validate manifest
pnpm registry:build     # Build public/r/*.json
```

## Tiers

- **Base** — `button`, `badge`, `kpi-pill`, …
- **Composite** — `card`, `dropdown-menu`, `popover`, …
- **Blocks** — `navbar`, `progress-card`, `calendar-card`, …
