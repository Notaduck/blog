import { cn } from "../src/utils/cn";

describe("cn utility", () => {
  it("merges tailwind classes using the last occurrence", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("filters out falsy values and keeps unique classes", () => {
    const result = cn("text-lg", null, undefined, false && "text-sm", "font-bold", "text-lg");
    const classes = result.split(" ").filter(Boolean);
    expect(classes).toHaveLength(2);
    expect(classes).toEqual(expect.arrayContaining(["text-lg", "font-bold"]));
  });
});
