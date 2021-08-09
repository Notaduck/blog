import { FaLinux } from "react-icons/fa";

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
      "My name is Daniel Guldberg A.",
      "Welcome to my personal portfolio and blog",
      // "I am, ",
    ],
    typical: [
      "I am, a full stack developer \u{2630}",
      2000,

      "with a passion for devops \u{1F680} ",
      2000,

      "A Linux geek linux  " ,
      2000,
      "a keyboard entuast \u{2328}",
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
