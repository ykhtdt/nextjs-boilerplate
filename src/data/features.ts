type Feature = {
  key: string;
  imgSrc: string;
  imgAlt: string;
  description: string;
};

const features: Feature[] = [
  {
    key: "Next.js",
    imgSrc: "/intro/nextjs.svg",
    imgAlt: "Next.js icon",
    description:
      "Offers improved developer experience for building applications.",
  },
  {
    key: "Tailwind",
    imgSrc: "/intro/tailwind.svg",
    imgAlt: "Tailwind icon",
    description: "A utility-first CSS framework for rapid UI development.",
  },
  {
    key: "ESLint",
    imgSrc: "/intro/eslint.svg",
    imgAlt: "ESLint icon",
    description: "For clean and consistent code.",
  },
  {
    key: "Typescript",
    imgSrc: "/intro/typescript.svg",
    imgAlt: "Typescript icon",
    description: "Enhances JavaScript by adding static typing",
  },
  {
    key: "Shadcn UI",
    imgSrc: "/intro/shadcnui.svg",
    imgAlt: "Shadcn ui icon",
    description: "Components that copy and paste into your apps.",
  },
  {
    key: "Bundle analyzer",
    imgSrc: "/intro/analyzer.svg",
    imgAlt: "Bundle analyzer icon",
    description: "Analyze your bundle size.",
  },
  {
    key: "Jotai",
    imgSrc: "/intro/jotai.svg",
    imgAlt: "Jotai icon",
    description:
      "For flexible and scalable atom-based approach state management.",
  },
  {
    key: "Jest & React Testing Library",
    imgSrc: "/intro/jest.svg",
    imgAlt: "Jest icon",
    description: "For unit and integration testing.",
  },
  {
    key: "Storybook",
    imgSrc: "/intro/storybook.svg",
    imgAlt: "Storybook icon",
    description: "Easier to build, test, and showcase UI components.",
  },
];

export default features;
