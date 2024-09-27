import React from "react";
import { Link } from "gatsby";

// Define the prop types (if using TypeScript)
interface Props {
  path: string;
  title: string;
}

export const NavLink: React.FC<Props> = ({ path, title }) => (
  <Link
    to={path}
    className="ml-6 
               sm:ml-8
               text-sm
               m:text-base 
               font-medium 
               uppercase
               px-px  
               text-main
               hover:underline
               transition 
               duration-150 
               ease-in-out"
    activeClassName="text-accent text-gray-900 hover:text-leather-light"
    partiallyActive={true}
  >
    {title}
  </Link>
);
