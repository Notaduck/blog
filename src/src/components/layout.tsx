import * as React from "react";
import { Global } from "@emotion/react";
import { SEO } from "./seo";

type LayoutProps = { children: React.ReactNode; className?: string };

export const Layout = ({ children, className = `` }: LayoutProps) => (
  <React.Fragment>
    <Global
      styles={(theme) => ({
        "*": {
          boxSizing: `inherit`,
          "&:before": {
            boxSizing: `inherit`,
          },
          "&:after": {
            boxSizing: `inherit`,
          },
        },
        html: {
          fontSize: `18px`,
          WebkitTextSizeAdjust: `100%`,
        },
        img: {
          borderStyle: `none`,
        },
        pre: {
          fontFamily: `monospace`,
          fontSize: `1em`,
        },
        "[hidden]": {
          display: `none`,
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
