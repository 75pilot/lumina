Crextio — Design System
shadcn/ui + Tailwind CSS

---

1. Brand Identity

| Property | Value |
|---|---|
| Product | Crextio HR Admin Dashboard |
| Visual Language | Warm Minimal · Soft Yellow Gradient Shell · Dark Ink Cards |
| Audience | HR managers and team leads |
| Personality | Calm, organized, quietly optimistic |
| Signature Element | A creamy yellow ambient gradient that warms the right half of the page shell — distinct from the white card layer it sits behind |

---

2. Color Tokens

Core Palette

```js
// tailwind.config.ts → theme.extend.colors
colors: {
  brand: {
    yellow:      '#F5C842', // primary accent — active nav, badge fills, chart highlights
    'yellow-lt': '#FDF3C0', // light tint — pill backgrounds, progress fill (light)
    ink:         '#1C1C1C', // near-black — dark cards (Onboarding panel), primary text
    'ink-soft':  '#2E2E2E', // secondary dark — bar chart active bars
  },
  shell: {
    bg:          '#ECEDEF', // outer page shell (cool grey)
    card:        '#FFFFFF', // default card surface
    warm:        '#FDFAEE', // warm yellow gradient zone (right-side hero area)
    'warm-deep': '#F7F0C8', // deeper warm — gradient terminus
  },
  neutral: {
    50:  '#FAFAFA',
    100: '#F5F5F5',
    200: '#E8E8E8',
    300: '#D1D1D1',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  status: {
    done:    '#F5C842', // completed task dot — yellow
    pending: '#D1D1D1', // pending task dot — neutral grey
    active:  '#1C1C1C', // active/running — ink
  },
}
```

Semantic CSS Variables

```css
/* app/globals.css */
:root {
  /* Page */
  --background:            #ECEDEF;
  --shell-warm:            #FDFAEE;

  /* Surfaces */
  --card:                  #FFFFFF;
  --card-dark:             #1C1C1C;
  --card-foreground:       #171717;
  --card-dark-foreground:  #FFFFFF;
  --card-border:           #E8E8E8;

  /* Brand */
  --primary:               #F5C842;
  --primary-foreground:    #1C1C1C;
  --primary-light:         #FDF3C0;

  /* Text */
  --foreground:            #171717;
  --muted-foreground:      #737373;
  --subtle-foreground:     #A3A3A3;

  /* Interactive */
  --ring:                  #F5C842;
  --radius:                1rem; /* 16px */
  --radius-xl:             1.5rem; /* 24px — large card corners */
}
```

Gradient: Page Shell

```css
/* The defining visual of Crextio — warm yellow bloom, top-right */
.shell-gradient {
  background: radial-gradient(
    ellipse 70% 80% at 75% 20%,
    #FDFAEE 0%,
    #F7F0C8 35%,
    #ECEDEF 80%
  );
}
```

---

3. Typography

Font Stack

```js
// tailwind.config.ts
fontFamily: {
  sans:    ['Inter', 'ui-sans-serif', 'system-ui'],
  display: ['"DM Sans"', 'Inter', 'ui-sans-serif'], // Welcome heading only
  mono:    ['"JetBrains Mono"', 'ui-monospace'],     // time tracker digits
}
```

> Pairing rationale: DM Sans at heavy weight for the "Welcome in, Nixtio" display headline reads warm and slightly humanist — matching the yellow palette. Inter handles everything else with precision. JetBrains Mono keeps the `02:35` time display optically monospaced for clean digit alignment.

Type Scale

| Role | Class | Size | Weight | Color |
|---|---|---|---|---|
| Display heading | `font-display text-5xl font-black` | 3rem | 900 | `text-neutral-900` |
| Section heading | `text-xl font-semibold` | 1.25rem | 600 | `text-neutral-900` |
| Stat figure (hero) | `text-5xl font-bold` | 3rem | 700 | `text-neutral-900` |
| Stat figure (card) | `text-3xl font-bold` | 1.875rem | 700 | `text-neutral-900` |
| Card label | `text-sm font-medium` | 0.875rem | 500 | `text-neutral-900` |
| Body / description | `text-sm font-normal` | 0.875rem | 400 | `text-neutral-500` |
| Caption / sublabel | `text-xs font-normal` | 0.75rem | 400 | `text-neutral-400` |
| Time display | `font-mono text-4xl font-semibold` | 2.25rem | 600 | `text-neutral-900` |
| Nav item | `text-sm font-medium` | 0.875rem | 500 | `text-neutral-600` |
| Badge / pill | `text-xs font-semibold` | 0.75rem | 600 | varies |

---

4. Spacing & Layout

Page Grid

```css
/* 12-column fluid grid with warm gradient shell */
.dashboard-layout {
  display: grid;
  grid-template-columns: 1fr;      /* header row */
  gap: 0;
  min-height: 100vh;
  background: radial-gradient(ellipse 70% 80% at 75% 20%, #FDFAEE 0%, #F7F0C8 35%, #ECEDEF 80%);
  padding: 1.5rem; /* p-6 */
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto 1fr;
  gap: 1rem; /* gap-4 */
}
```

Column Assignments

| Section | Columns | Tailwind |
|---|---|---|
| Welcome + KPI bar | 12 / 12 | `col-span-12` |
| Employee profile card | 3 / 12 | `col-span-3` |
| Progress card | 3 / 12 | `col-span-3` |
| Time tracker card | 3 / 12 | `col-span-3` |
| Onboarding card | 3 / 12 | `col-span-3` |
| Profile sidebar (lower) | 3 / 12 | `col-span-3` |
| Calendar | 6 / 12 | `col-span-6` |
| Onboarding task list | 3 / 12 | `col-span-3` |

Spacing Scale

| Token | px | Tailwind |
|---|---|---|
| 2xs | 4px | `p-1` |
| xs | 8px | `p-2` |
| sm | 12px | `p-3` |
| md | 16px | `p-4` |
| lg | 24px | `p-6` |
| xl | 32px | `p-8` |

---

5. Border Radius

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `rounded-full` | 9999px | `rounded-full` | Nav pill, logo badge, icon buttons, avatar, progress bars |
| `rounded-3xl` | 24px | `rounded-3xl` | Large cards (profile photo card, onboarding dark card) |
| `rounded-2xl` | 16px | `rounded-2xl` | Standard cards (Progress, Time tracker, Calendar) |
| `rounded-xl` | 12px | `rounded-xl` | Inner panels, calendar event blocks |
| `rounded-lg` | 8px | `rounded-lg` | Buttons, device thumbnail |
| `rounded-md` | 6px | `rounded-md` | Small chips, tags |

---

6. Elevation & Shadow

```js
// tailwind.config.ts
boxShadow: {
  card:        '0 1px 4px 0 rgba(0,0,0,0.06)',
  'card-md':   '0 2px 12px 0 rgba(0,0,0,0.08)',
  'card-dark': '0 4px 24px 0 rgba(0,0,0,0.20)',
  inner:       'inset 0 1px 3px 0 rgba(0,0,0,0.06)',
}
```

Cards sit at three levels: white cards use `shadow-card`, the dark onboarding panel uses `shadow-card-dark`, calendar events use no shadow (flat + border).

---

7. Navigation Bar

```tsx
// components/layout/navbar.tsx
const navItems = ["Dashboard", "People", "Hiring", "Devices", "Apps", "Salary", "Calendar", "Reviews"]


  {/* Logo */}
  


    Crextio



  {/* Nav links */}
  


    {navItems.map((item) => (
      
        {item}
      
    ))}
  



  {/* Right icons */}
  


    
      
    
    Setting
    
      
    
    
      
    


```

Nav Active State Token

```css
/* Active: bg-neutral-900 text-white rounded-full */
/* Inactive: text-neutral-600, hover:bg-neutral-100 rounded-full */
/* Logo: border border-neutral-200 rounded-full px-4 py-1.5 */
```

---

8. Welcome Header + KPI Bar

```tsx



  {/* Greeting */}
  


    Welcome in, Nixtio
  



  {/* KPI progress pills + stat figures */}
  



    {/* Left: Progress pills */}
    


      {[
        { label: "Interviews", pct: "15%", style: "dark" },
        { label: "Hired",      pct: "15%", style: "yellow" },
        { label: "Project time", pct: "60%", style: "striped" },
        { label: "Output",     pct: "10%", style: "outline" },
      ].map(({ label, pct, style }) => (
        


          {label}
          
        


      ))}
    



    {/* Right: Hero stat figures */}
    


      {[
        { icon: Users,   value: "78",  label: "Employe" },
        { icon: UserPlus,value: "56",  label: "Hirings" },
        { icon: Monitor, value: "203", label: "Projects" },
      ].map(({ icon: Icon, value, label }) => (
        


          
          


            

{value}


            

{label}


          


        


      ))}
    


```

KPI Pill Component

```tsx
// Four visual variants — all use rounded-full
function KpiPill({ pct, style }: { pct: string; style: string }) {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold min-w-[72px]"

  const variants = {
    dark:    `${base} bg-neutral-900 text-white`,
    yellow:  `${base} bg-[#F5C842] text-neutral-900`,
    striped: `${base} border-2 border-dashed border-neutral-300 text-neutral-600`,
    outline: `${base} border border-neutral-200 text-neutral-600 bg-white`,
  }

  return {pct}
}
```

---

9. Card System

Base Card

```tsx
// components/ui/dashboard-card.tsx
export function DashboardCard({ className, children, dark = false, ...props }) {
  return (
    


      {children}
    


  )
}
```

Card Header Pattern

```tsx
// Consistent card header: title left, expand icon right


{title}


    


```

---

10. Employee Profile Card

```tsx



  {/* Full-bleed photo */}
  

  {/* Bottom overlay */}
  


    

Lora Piterson


    

UX/UI Designer



  {/* Salary pill — bottom right */}
  


    
      $1,200
    


```

---

11. Progress Card (Work Time / Bar Chart)

```tsx



    

Progress


    
      
    



  {/* Big work time figure */}
  


    6.1 h
    


      

Work Time


      

this week


    



  {/* Bar chart — 7 days */}
  

  {/* Day labels */}
  


    {["S","M","T","W","T","F","S"].map((d, i) => (
      {d}
    ))}
  


```

Bar Chart Tokens

```tsx
// Bar chart — each bar is a rounded pill
// Active bar (Friday): bg-[#F5C842], taller, has tooltip badge
// Normal bars (filled): bg-[#1C1C1C] at varying heights
// Faint bars: bg-neutral-200 (weekend / inactive)

function ProgressBarChart() {
  const bars = [
    { day: "S", height: "h-6",  fill: "bg-neutral-200" },
    { day: "M", height: "h-10", fill: "bg-[#1C1C1C]" },
    { day: "T", height: "h-14", fill: "bg-[#1C1C1C]" },
    { day: "W", height: "h-12", fill: "bg-[#1C1C1C]" },
    { day: "T", height: "h-20", fill: "bg-[#F5C842]", active: true, badge: "5h 23m" },
    { day: "F", height: "h-8",  fill: "bg-neutral-200" },
    { day: "S", height: "h-4",  fill: "bg-neutral-200" },
  ]

  return (
    


      {bars.map(({ height, fill, active, badge }, i) => (
        


          {active && badge && (
            
              {badge}
            
          )}
          


          


        


      ))}
    


  )
}
```

---

12. Time Tracker Card

```tsx



    

Time tracker


    
      
    



  {/* Circular timer */}
  


    

    {/* Controls */}
    


      
        
      
      
        
      
      
        
      
    


```

Circular Ring SVG

```tsx
function TimeRing({ value, label, sublabel }: { value: number; label: string; sublabel: string }) {
  const r = 56
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference

  return (
    


      
        {/* Track — dashed grey */}
        
        {/* Fill — yellow */}
        
      
      


        

{label}


        

{sublabel}


      


    


  )
}
```

---

13. Onboarding Card (top)

```tsx



    

Onboarding


    18%



  {/* Three-column mini progress bar group */}
  


    {[
      { pct: "30%", label: "Task",  fill: "bg-[#F5C842]", dark: false },
      { pct: "25%", label: "",      fill: "bg-neutral-900", dark: true },
      { pct: "0%",  label: "",      fill: "bg-neutral-300", dark: false },
    ].map(({ pct, label, fill, dark }, i) => (
      


        {pct}
        


          {label && {label}}
        


      


    ))}
  


```

---

14. Onboarding Task Panel (dark card)

```tsx

  {/* Header */}
  


    

Onboarding Task


    2/8



  {/* Task list */}
  


    {[
      { icon: Monitor,  label: "Interview",       date: "Sep 13, 08:30", done: true  },
      { icon: Zap,      label: "Team Meeting",     date: "Sep 13, 10:30", done: true, strike: true },
      { icon: MessageSquare, label: "Project Update", date: "Sep 13, 13:00", done: false },
      { icon: Pen,      label: "Discuss Q3 Goals", date: "Sep 13, 14:45", done: false },
      { icon: Link,     label: "HR Policy Review", date: "Sep 13, 16:30", done: false },
    ].map(({ icon: Icon, label, date, done, strike }) => (
      


        


          
        


        


          


            {label}
          


          

{date}


        


        {/* Status dot */}
        


          {done && }
        


      


    ))}
  


```

---

15. Profile Sidebar (lower)

```tsx

  {/* Devices section — expanded */}
  


    


      Devices
      
    


    


      


        
      


      


        

MacBook Air


        

Version M1


      


      
        
      
    



  {/* Collapsed sections */}
  {["Pension contributions", "Compensation Summary", "Employee Benefits"].map((section) => (
    


      {section}
      
    


  ))}

```

---

16. Calendar Card

```tsx

  {/* Month nav */}
  


    August
    

September 2024


    October



  {/* Day header row */}
  


    

 {/* time gutter */}
    {["Mon 22", "Tue 23", "Wed 24", "Thu 25", "Fri 26", "Sat 27"].map((d) => (
      


        


          {d.split(" ")[0]}
        


        


          {d.split(" ")[1]}
        


      


    ))}
  



  {/* Time rows */}
  {["8:00 am", "9:00 am", "10:00 am", "11:00 am"].map((time) => (
    


      {time}
      {/* Events slot-in here */}
    


  ))}

```

Calendar Event Block

```tsx
// "Weekly Team Sync" event — spans Tue col, dark fill


Weekly Team Sync

Discuss progress on projects


  {/* Avatar stack */}
  


    {avatars.map((src, i) => (
      
    ))}
  



// "Onboarding Session" event — spans Thu col, light fill


Onboarding Session

Introduction for new hires


    {avatars.map((src, i) => (
      
    ))}
  


```

---

17. Button Variants

```tsx
// components/ui/button.tsx — shadcn/ui cva config
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:   "bg-neutral-900 text-white hover:bg-neutral-700 rounded-full",
        yellow:    "bg-[#F5C842] text-neutral-900 hover:bg-[#E0B63A] rounded-full",
        outline:   "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 rounded-full",
        ghost:     "text-neutral-600 hover:bg-neutral-100 rounded-full",
        icon:      "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 rounded-full",
      },
      size: {
        sm:      "h-8 px-3 text-xs",
        default: "h-10 px-5 text-sm",
        lg:      "h-12 px-8 text-base",
        icon:    "h-8 w-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)
```

Usage map from the design:

| Context | Variant | Size |
|---|---|---|
| Nav active pill | `default` | `sm` |
| KPI dark pill | `default` | `sm` + `rounded-full` |
| KPI yellow pill | `yellow` | `sm` + `rounded-full` |
| KPI outline pill | `outline` | `sm` + dashed border |
| Timer play/pause | `icon` | `icon` |
| Timer alarm (active) | `default` | `icon` |
| Card expand arrow | `icon` | `icon` |

---

18. Accordion (Sidebar Sections)

```tsx
// Pension contributions, Compensation Summary, Employee Benefits
// Use shadcn/ui Accordion with custom styling


    
      Pension contributions
    
    
      {/* Content */}
    
```

---

19. Avatar & Avatar Stack

```tsx
// Single avatar
LP

// Stacked avatars (calendar events)



  {["/a1.jpg", "/a2.jpg", "/a3.jpg"].map((src, i) => (
    
      
    
  ))}



```

---

20. Icon System

- Library: `lucide-react`
- Default size: `h-4 w-4` (16px)
- Stroke width: `1.5` (default Lucide — matches the design's lightweight icon style)
- Colors: `text-neutral-400` for utility icons, `text-neutral-900` for active/primary

```tsx
import {
  Users, UserPlus, Monitor, Settings, Bell, User,
  ArrowUpRight, Play, Pause, AlarmClock,
  ChevronDown, ChevronUp, MoreVertical,
  Check, Calendar, Zap, MessageSquare, Pen, Link,
} from "lucide-react"
```

---

21. shadcn/ui Config

```json
// components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

```css
/* globals.css — shadcn CSS variable overrides */
@layer base {
  :root {
    --background:          242 243 239;   /* #ECEDEF */
    --foreground:          23 23 23;       /* #171717 */
    --card:                255 255 255;
    --card-foreground:     23 23 23;
    --popover:             255 255 255;
    --popover-foreground:  23 23 23;
    --primary:             245 200 66;    /* #F5C842 */
    --primary-foreground:  28 28 28;      /* #1C1C1C */
    --secondary:           245 245 245;
    --secondary-foreground:23 23 23;
    --muted:               245 245 245;
    --muted-foreground:    115 115 115;
    --accent:              253 243 192;   /* #FDF3C0 */
    --accent-foreground:   28 28 28;
    --destructive:         239 68 68;
    --destructive-foreground: 255 255 255;
    --border:              232 232 232;
    --input:               232 232 232;
    --ring:                245 200 66;
    --radius:              1rem;
  }
}
```

---

22. Tailwind Config (complete)

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow:      "#F5C842",
          "yellow-lt": "#FDF3C0",
          ink:         "#1C1C1C",
          "ink-soft":  "#2E2E2E",
        },
        shell: {
          bg:          "#ECEDEF",
          card:        "#FFFFFF",
          warm:        "#FDFAEE",
          "warm-deep": "#F7F0C8",
        },
      },
      fontFamily: {
        sans:    ["Inter", "ui-sans-serif", "system-ui"],
        display: ['"DM Sans"', "Inter", "ui-sans-serif"],
        mono:    ['"JetBrains Mono"', "ui-monospace"],
      },
      borderRadius: {
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 4px)",
        sm:   "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        card:       "0 1px 4px 0 rgba(0,0,0,0.06)",
        "card-md":  "0 2px 12px 0 rgba(0,0,0,0.08)",
        "card-dark":"0 4px 24px 0 rgba(0,0,0,0.20)",
        inner:      "inset 0 1px 3px 0 rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "shell-warm": "radial-gradient(ellipse 70% 80% at 75% 20%, #FDFAEE 0%, #F7F0C8 35%, #ECEDEF 80%)",
      },
      keyframes: {
        "ring-fill": {
          from: { strokeDashoffset: "351.86" },
          to:   { strokeDashoffset: "var(--ring-offset)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "ring-fill": "ring-fill 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-up":   "fade-up 0.25s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

---

23. Motion & Interaction

| Interaction | Duration | Easing | Implementation |
|---|---|---|---|
| Card hover lift | 150ms | ease-out | `hover:-translate-y-0.5 transition-transform` |
| Button press | 100ms | ease-in | `active:scale-[0.96] transition-transform` |
| Nav pill switch | 200ms | ease-out | `transition-colors duration-200` |
| Accordion expand | 250ms | ease-out | shadcn/ui default |
| Ring fill on mount | 800ms | cubic-bezier | SVG `stroke-dashoffset` animation |
| Tooltip badge pop | 150ms | spring | `animate-fade-up` |

---

24. Accessibility

- All cards use semantic HTML (`

`, `

`, ``, `

`).
- Focus ring: `focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2` — yellow ring visible on both white and dark surfaces.
- Minimum interactive touch target: **44×44px**.
- Color contrast: `#171717` text on `#FFFFFF` = **18.1:1** (AAA). `#F5C842` on `#1C1C1C` (dark card) = **8.2:1** (AAA).
- Time ring SVG: always include `aria-label="72% complete"` on the `` element.
- Striped dashed KPI pill: add `aria-label="60% — Project time"` since stroke pattern is visual-only.

```css
/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-ring-fill,
  .animate-fade-up {
    animation: none !important;
  }
  * {
    transition-duration: 0.01ms !important;
  }
}
```

---

End of Design System — Crextio HR Dashboard v1.0