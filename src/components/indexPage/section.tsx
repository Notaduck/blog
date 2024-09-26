import { FC } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { TSection } from "./types";
import { Link } from "react-scroll";

export const Section: FC<TSection> = ({
  children,
  id,
  to,
  btnText,
  reset,
  headOrTail,
}) => {
  const iconSize = 42;

  const icon = reset ? (
    <FiChevronUp size={iconSize} />
  ) : (
    <FiChevronDown size={iconSize} />
  );

  return (
    <section
      id={id}
      className={`inline-flex flex-col relative w-full ${
        headOrTail ? "min-h-full-minus-nav" : "min-h-screen"
      }`}
    >
      <div className="flex-1">{children}</div>

      <div className="flex mx-auto my-8">
        <Link
          spy={true}
          to={to}
          offset={reset && -50}
          smooth
          className="cursor-pointer bottom-4 left-1/2  animate-bounce delay-100 flex flex-col items-center"
        >
          {icon} {btnText}
        </Link>
      </div>
    </section>
  );
};
