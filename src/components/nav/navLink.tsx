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
               focus-visible:outline-hidden
               focus-visible:ring-2
               focus-visible:ring-accent
               focus-visible:ring-offset-2
               focus-visible:ring-offset-primary
               transition
               duration-150
               ease-in-out"
    activeClassName="text-highlight hover:text-accent"
    partiallyActive={true}
  >
    {title}
  </Link>
);
