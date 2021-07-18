import { Link } from "gatsby";
import React from "react";

const Header = ({ siteTitle }) => (
  <div className="mt-5 mb-10 flex justify-center underline">
    <Link to="/articles">
      <h1 className="font-thin text-6xl"> {siteTitle} </h1>
    </Link>
  </div>
);

export default Header;
