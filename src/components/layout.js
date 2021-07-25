import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import "@fontsource/unica-one"; // Defaults to weight 400.
import "../styles/global.css";
import { useLocation } from "@reach/router";
import Header from "./header";
import { NavBar } from "./nav";
import { ThemeToggle } from "./themeToggle";
import { Footer } from "./footer";
import { Container } from "./shared";

export const Layout = ({ pageContext, children }) => {
  const data = useStaticQuery(query);
  const [isIndexPage, setIsIndexPage] = useState();
  const location = useLocation();
  useEffect(() => {
    setIsIndexPage(location.pathname !== "/");
  }, [location.pathname]);

  return (
    <>
      <div
        className={`
                    ${isIndexPage && " transition-all duration-300 "}
                    flex 
                    flex-col  
                    min-h-screen
                    overflow-y-visible
                    bg-primary
                    text-main-text
        
        `}
      >
        <ThemeToggle />
        <NavBar />
        {!isIndexPage ? (
          <main className="flex-1 px-4 sm:px-0">{children}</main>
        ) : (
          <Container className='flex-1 min-h-screen'>
            {/* <main className=" min-h-(screen-16) mt-10 px-4 py-6 sm:px-0">{children}</main> */}
            <main className="flex-grow flex flex-col p-4">{children}</main>
          </Container>
        )}

        <Container>
          <Footer />
        </Container>
      </div>
    </>
  );
};

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
