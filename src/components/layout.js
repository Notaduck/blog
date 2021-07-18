import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";


import "@fontsource/unica-one" // Defaults to weight 400.
import "./layout.css";
import "../styles/global.css";

import Header from "./header";
import NavBar from "./Nav/navbar";
import Footer from "./footer";
import ThemeToggle from "./themeToggle/themeToggle";

const Layout = ({ children }) => {

  const data = useStaticQuery(query);


  return (
    <>
      <div
        className={`
                    transition-all 
                    duration-300
                    flex 
                    flex-col  
                    min-h-screen
                    overflow-y-visible
                    sm:pl-20 sm:pr-20
                    lg:pl-30 lg:pr-30
                    xl:pl-60 xl:pr-60
                    pt-10
                    bg-primary
                    text-main-text
        
        `}
      >

        <ThemeToggle />
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <NavBar />
        <main className="mt-10 flex-1">{children}</main>
        <Footer />
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

export default Layout;
