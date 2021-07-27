import React from "react";
import { FC } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { TSection } from "./types";
import { Link } from "react-scroll";

export const Section: FC<TSection> = ({ children, id, to, btnText, reset }) => {
  const iconSize = 42;

  const icon = reset ? (
    <FiChevronUp size={iconSize} />
  ) : (
    <FiChevronDown size={iconSize} />
  );

  return (
    <section id={id} className="relative w-full min-h-full-minus-nav  ">
      {children}

      <Link
        to={to}
        offset={reset && -48}
        smooth
        className="absolute bottom-24 left-1/2  animate-bounce delay-100 flex flex-col items-center"
      >
        {icon} {btnText}
      </Link>
    </section>
  );
};
