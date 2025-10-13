import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  issueTerm: string;
};

const UTTERANCES_REPO = "Notaduck/blog";

const getTheme = () => {
  if (typeof document === "undefined") {
    return "github-light";
  }
  const root = document.documentElement;
  const theme = root.dataset.theme || (root.classList.contains("dark") ? "dark" : "light");
  return theme === "dark" ? "github-dark" : "github-light";
};

const Comments = ({ issueTerm }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<string>(() => getTheme());

  useEffect(() => {
    if (typeof MutationObserver === "undefined" || typeof document === "undefined") {
      return;
    }
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", UTTERANCES_REPO);
    script.setAttribute("theme", theme);
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("label", "comment :speech_balloon:");

    containerRef.current.appendChild(script);
  }, [issueTerm, theme]);

  const containerId = useMemo(
    () => `comments_${issueTerm.replace(/[^a-zA-Z0-9_-]/g, "_")}`,
    [issueTerm],
  );

  return (
    <div
      id={containerId}
      ref={containerRef}
      className="utterances-container not-prose my-12 w-full max-w-3xl"
    />
  );
};

export default Comments;
