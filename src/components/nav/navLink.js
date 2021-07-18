import React from "react";
import { Link } from "gatsby";

const NavLink = ({ path, title }) => (
  <Link
    to={`${path}`}
    className="ml-6 
                   sm:ml-8
                   text-sm s
                   m:text-base 
                   font-medium 
                   px-px  
                   text-main
                   hover:underline
                   transition 
                   duration-150 
                   ease-in-out"
    activeClassName="text-leather text-gray-900 hover:text-leather-light  "
    partiallyActive={true}
  >
    {title}
  </Link>
);

export default NavLink;
