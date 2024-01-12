export type Category = {
  key: string;
  name: string;
};

export const categories: Category[] = [
  {
    key: "movie",
    name: "movie",
  },
  {
    key: "clothing",
    name: "clothing",
  },
]

export const movieCategories: Category[] = [
  {
    key: "action",
    name: "action",
  },
  {
    key: "crime",
    name: "crime",
  },
  {
    key: "fantasy",
    name: "fantasy",
  },
  {
    key: "comedy",
    name: "comedy",
  },
];

export const clothinglCategory: Category[] = [
  {
    key: "top",
    name: "top",
  },
  {
    key: "outer",
    name: "outer",
  },
  {
    key: "pants",
    name: "pants",
  },
  {
    key: "shoes",
    name: "shoes",
  },
];