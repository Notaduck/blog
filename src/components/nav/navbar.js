import React from "react";
import { NavLink } from "./navLink";

export const NavBar = () => (
	<nav className='border-gray-300 border-b-2 border-t-2 pt-2 pb-2 flex justify-evenly'>
		<NavLink path='/articles' title='ARTICLES' />
		<NavLink path='/about' title='ABOUT' />
		<NavLink path='/contact' title='CONTACT' />
	</nav>
);
