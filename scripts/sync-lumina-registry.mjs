#!/usr/bin/env node
/**
 * Regenerate Lumina registry.json fragments and merged manifest for static shadcn build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const registryUi = path.join(root, "registry/lumina/ui");
const REGISTRY_BASE = "registry/lumina";

function uiItem(name, relativePath, fullPath, deps = ["utils"]) {
  return {
    fragment: {
      name,
      type: "registry:ui",
      title: titleCase(name),
      files: [{ path: relativePath, type: "registry:ui" }],
      registryDependencies: deps,
    },
    merged: {
      name,
      type: "registry:ui",
      title: titleCase(name),
      files: [{ path: fullPath, type: "registry:ui" }],
      registryDependencies: deps,
    },
  };
}

function blockItem(name, relativePath, fullPath, deps) {
  return {
    fragment: {
      name,
      type: "registry:block",
      title: titleCase(name),
      files: [{ path: relativePath, type: "registry:block" }],
      registryDependencies: deps,
    },
    merged: {
      name,
      type: "registry:block",
      title: titleCase(name),
      files: [{ path: fullPath, type: "registry:block" }],
      registryDependencies: deps,
    },
  };
}

function titleCase(name) {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function listRegistryUiNames() {
  return fs
    .readdirSync(registryUi)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, ""))
    .sort();
}

function writeRegistryFragments(blockNames) {
  const uiNames = listRegistryUiNames();
  const homepage = process.env.LUMINA_REGISTRY_URL ?? "https://lumina.vercel.app";

  const libFragment = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    items: [
      {
        name: "utils",
        type: "registry:lib",
        title: "Utils",
        files: [{ path: "utils.ts", type: "registry:lib" }],
      },
    ],
  };

  const themeFragment = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    items: [
      {
        name: "lumina",
        type: "registry:theme",
        title: "Lumina Theme",
        description: "Crextio design tokens — merge into your Tailwind CSS file",
        files: [{ path: "lumina.css", type: "registry:theme" }],
      },
    ],
  };

  const uiItems = uiNames.map((n) =>
    uiItem(n, `${n}.tsx`, `${REGISTRY_BASE}/ui/${n}.tsx`)
  );

  const blockItems = blockNames.map((b) =>
    blockItem(b.name, `${b.name}.tsx`, `${REGISTRY_BASE}/blocks/${b.name}.tsx`, b.deps)
  );

  const uiFragment = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    items: uiItems.map((item) => item.fragment),
  };

  const blocksFragment = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    items: blockItems.map((item) => item.fragment),
  };

  const luminaDir = path.join(root, REGISTRY_BASE);
  fs.writeFileSync(path.join(luminaDir, "lib/registry.json"), JSON.stringify(libFragment, null, 2));
  fs.writeFileSync(path.join(luminaDir, "theme/registry.json"), JSON.stringify(themeFragment, null, 2));
  fs.writeFileSync(path.join(luminaDir, "ui/registry.json"), JSON.stringify(uiFragment, null, 2));
  fs.writeFileSync(path.join(luminaDir, "blocks/registry.json"), JSON.stringify(blocksFragment, null, 2));

  const mergedRegistry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "lumina",
    homepage,
    items: [
      {
        name: "utils",
        type: "registry:lib",
        title: "Utils",
        files: [{ path: `${REGISTRY_BASE}/lib/utils.ts`, type: "registry:lib" }],
      },
      {
        name: "lumina",
        type: "registry:theme",
        title: "Lumina Theme",
        description: "Crextio design tokens — merge into your Tailwind CSS file",
        files: [{ path: `${REGISTRY_BASE}/theme/lumina.css`, type: "registry:theme" }],
      },
      ...uiItems.map((item) => item.merged),
      ...blockItems.map((item) => item.merged),
    ],
  };

  fs.writeFileSync(path.join(root, "registry.json"), JSON.stringify(mergedRegistry, null, 2));
  console.log("Wrote registry.json fragments and merged manifest");
}

const blockNames = [
  { name: "navbar", deps: ["utils", "button", "sheet"] },
  { name: "settings-menu", deps: ["utils", "button", "dropdown-menu", "badge", "menu-shortcut"] },
  { name: "notifications-popover", deps: ["utils", "button", "popover", "separator", "scroll-area", "badge"] },
  { name: "profile-menu", deps: ["utils", "button", "dropdown-menu", "avatar", "badge", "menu-shortcut"] },
  { name: "welcome-kpi", deps: ["utils", "kpi-pill", "stat-figure"] },
  { name: "profile-card", deps: ["utils", "card"] },
  { name: "progress-card", deps: ["utils", "card", "button"] },
  { name: "time-tracker-card", deps: ["utils", "card", "button"] },
  { name: "onboarding-progress", deps: ["utils", "card"] },
  { name: "onboarding-task-panel", deps: ["utils", "card", "button"] },
  { name: "sidebar-accordion", deps: ["utils", "card", "accordion"] },
  { name: "calendar-card", deps: ["utils", "card", "button", "popover", "dialog", "input", "label", "avatar-stack"] },
];

writeRegistryFragments(blockNames);
console.log(`Registered ${listRegistryUiNames().length} UI items`);
