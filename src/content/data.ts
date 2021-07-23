export type Type = {
  index: {
    text: string[];
    typical: (string | number)[];
  };
};

export const content: Type = {
  index: {
    text: ["Hi There!","I'm Daniel Guldberg Aaes.", "Welcome to GuldbergLab, my personal portfolio and blog", "I am a, "],
    typical: [
      "Full stack developer \u{1F680}",
      2000,
      "Backend developer. ",
      2000,
      "Linux geek. ",
      2000,
      "Keyboard geek. ",
      2000,
    ],
  },
};
