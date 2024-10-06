import { useState, FC } from "react";
import { Transition } from "@headlessui/react";
import useDarkMode from "use-dark-mode";
import { Link, PageProps } from "gatsby";
import { FaGreaterThan, FaHamburger, FaLessThan } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { content } from "../../content/data";
import { Link as ScrollLink } from "react-scroll"; // Import the react-scroll Link

export const NavBar: FC<PageProps> = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useDarkMode(false);

  return (
    <div>
      <nav className={`bg-primary ${!darkMode.value && "border-b-2 shadow-sm"}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center w-full h-full justify-between">
              <Link
                to="/"
                className="font-inconsolata text-2xl font-bold uppercase flex items-center h-full text-main-text px-3 font-medium transition-all duration-300"
              >
                <FaLessThan /> {content.nav.titel} <FaGreaterThan />
              </Link>
              <div className="h-full hidden md:block">
                <div className="h-full flex items-baseline py-auto">
                  {content.nav.items.map((link) => {
                    // Check if the link is "Contact" to conditionally render it
                    if (link?.label === "Contact") {
                      return location?.pathname === "/" ? (
                        <ScrollLink
                          key={link.slug}
                          spy={true}
                          to="contact-section" // The ID of the contact section
                          smooth={true}
                          offset={-50}
                          className="cursor-pointer font-inconsolata text-xl flex items-center h-full text-main-text hover:bg-highlight hover:text-white px-3 font-medium transition-all duration-300"
                        >
                          {link.label}
                        </ScrollLink>
                      ) : (
                        <Link
                          key={link.slug}
                          to={`${link.slug}#contact-section`} // Navigate to the contact section on other pages
                          className="font-inconsolata text-xl flex items-center h-full text-main-text hover:bg-highlight hover:text-white px-3 font-medium transition-all duration-300"
                        >
                          {link.label}
                        </Link>
                      );
                    }

                    // Render other links as normal
                    return (
                      <Link
                        key={link.slug}
                        to={link.slug}
                        className="font-inconsolata text-xl flex items-center h-full text-main-text hover:bg-highlight hover:text-white px-3 font-medium transition-all duration-300"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-main-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <FaHamburger className="block h-6 w-6" />
                ) : (
                  <ImCross className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {content.nav.items.map((item) => {
                  if (item.label === "Contact") {
                    return location.pathname === "/" ? (
                      <ScrollLink
                        key={item.slug}
                        spy={true}
                        to="contact-section"
                        smooth={true}
                        offset={-50}
                        className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        {item.label}
                      </ScrollLink>
                    ) : (
                      <Link
                        key={item.slug}
                        to={`${item.slug}#contact-section`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={item.slug}
                      to={item.slug}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};
