export type Item = {
  name: string;
  key: string;
  href: string;
};

export const items: { name: string; key: string; subItem: Item[] }[] = [
  {
    name: 'Getting Started',
    key: 'start',
    subItem: [
      {
        name: 'Introduction',
        key: 'intro',
        href: '/examples',
      },
    ],
  },
  {
    name: 'Next.js',
    key: 'framework',
    subItem: [
      {
        name: 'Routing',
        key: 'routing',
        href: '/examples/nextjs/routing',
      },
    ],
  },
  {
    name: 'Jotai',
    key: 'state management',
    subItem: [
      {
        name: 'Store',
        key: 'store',
        href: '/examples/jotai/store',
      },
      {
        name: 'Atom',
        key: 'atom',
        href: '/examples/jotai/atom',
      },
    ],
  },
]