import * as React from "react";
import { Global, Interpolation, Theme } from "@emotion/react";
import { SEO } from "./seo";

// Define a type for the theme to ensure it includes `colors`.
interface CustomTheme extends Theme {
  colors?: {
    primary?: string;
    background?: string;
  };
}

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => (
  <React.Fragment>
    <Global
      styles={(theme: CustomTheme): Interpolation<CustomTheme> => ({
        "*": {
          boxSizing: "inherit",
          "&:before": {
            boxSizing: "inherit",
          },
          "&:after": {
            boxSizing: "inherit",
          },
        },
        html: {
          fontSize: "18px",
          WebkitTextSizeAdjust: "100%",
        },
        img: {
          borderStyle: "none",
        },
        pre: {
          fontFamily: "monospace",
          fontSize: "1em",
        },
        "[hidden]": {
          display: "none",
        },
        "::selection": {
          backgroundColor: theme?.colors?.primary,
          color: theme?.colors?.background,
        },
      })}
    />
    <SEO
      title={undefined}
      description={undefined}
      pathname={undefined}
      children={undefined}
    />
    <main className={className}>{children}</main>
  </React.Fragment>
);
