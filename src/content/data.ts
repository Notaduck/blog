export type Type = {
  index: {
    text: string[];
    typical: (string | number)[];
  };
  nav: {
    titel: string;
    items: {
      label: string;
      slug: string;
    }[];
  };
};

export const content: Type = {
  index: {
    text: [
      "Hi There!",
      "I'm Daniel Guldberg Aaes.",
      "Welcome to GuldbergLab, my personal portfolio and blog",
      "I am, ",
    ],
    typical: [
      "a full stack developer \u{1F680}",
      2000,
      "passionated about devops",
      2000,
      "a Linux geek.",
      2000,
      "keyboard geek. ",
      2000,
    ],
  },
  nav: {
    titel: "guldberglab",
    items: [
      {
        label: "Home",
        slug: "/",
      },
      {
        label: "Blog",
        slug: "/blog",
      },
      {
        label: "Contact",
        slug: "/contact",
      },
    ],
  },
};
