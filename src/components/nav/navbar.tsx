import { useState, FC } from "react";
import { Transition } from "@headlessui/react";
import useDarkMode from "use-dark-mode";
import { Link, navigate, PageProps } from "gatsby";
import { FaGreaterThan, FaHamburger, FaLessThan } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { content } from "../../content/data";
import { scroller } from "react-scroll";

export const NavBar: FC<PageProps> = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useDarkMode(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    if (location?.pathname === "/") {
      scroller.scrollTo("contact-section", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -50,
      });
    } else {
      navigate("/", { state: { scrollToContact: true } });
    }
  };

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
                    if (link?.label === "Contact") {
                      return (
                        <button
                          key={link.slug}
                          onClick={handleContactClick}
                          className="cursor-pointer font-inconsolata text-xl flex items-center h-full text-main-text hover:bg-highlight hover:text-white px-3 font-medium transition-all duration-300"
                        >
                          {link.label}
                        </button>
                      );
                    }

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
                    return (
                      <button
                        key={item?.slug}
                        onClick={() => {
                          setIsOpen(false);
                          handleContactClick();
                        }}
                        className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        {item?.label}
                      </button>
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
