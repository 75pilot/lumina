"use client";

import * as React from "react";
import { Navbar } from "@/registry/lumina/blocks/navbar";

export function NavbarDemo() {
  const [activeItem, setActiveItem] = React.useState("Dashboard");

  return (
    <Navbar
      items={["Dashboard", "People", "Hiring", "Reports"]}
      activeItem={activeItem}
      onNavigate={setActiveItem}
      logo={<span className="font-display text-lg font-bold">Crextio</span>}
    />
  );
}
