import React, { useEffect, useState } from "react"
import { FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi"

export const Footer = () => {
  const iconSize = "1.5rem"

  const [currentYear, setCurrentYear] = useState("-----")

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  const links = [
    {
      slug: "https://github.com/notaduck/",
      label: "GitHub",
      icon: <FiGithub size={iconSize} />,
    },
    {
      slug: "https://www.linkedin.com/in/daniel-guldberg-aaes-12145b180/",
      label: "LinkedIn",
      icon: <FiLinkedin size={iconSize} />,
    },
    {
      slug: "https://www.facebook.com/daniel.guldberg.aaes/",
      label: "Facebook",
      icon: <FiFacebook size={iconSize} />,
    },
  ]

  return (
    <footer className="flex justify-between p-4">
      <div className="flex space-x-4">
        {links.map((link) => (
          <div
            key={link.slug}
            className="transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-140 "
          >
            <a
              href={link.slug}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className="focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-full"
            >
              <span className="sr-only">{link.label}</span>
              {link.icon}
            </a>
          </div>
        ))}
      </div>

      <div>
        © {currentYear}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
    </footer>
  )
}
