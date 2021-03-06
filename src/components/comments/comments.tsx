import React, { FC, useEffect } from "react";
import useDarkMode from "use-dark-mode";

type Props = {
  issueTerm: string;
};

export const Comments: FC<Props> = ({ issueTerm }) => {
  const { value: isDarkMode } = useDarkMode(false);
  const commentsUUID = `comments_${issueTerm}`;

  useEffect(() => {
    // docs - https://utteranc.es/
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", "Notaduck/blog");
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("label", "comment :speech_balloon:");
    script.setAttribute("theme", isDarkMode ? "github-dark" : "github-light");
    script.setAttribute("crossorigin", "anonymous");

    const scriptParentNode = document.getElementById(commentsUUID);
    scriptParentNode.appendChild(script);

    return () => {
      // cleanup - remove the older script with previous theme
      scriptParentNode.removeChild(scriptParentNode.firstChild);
    };
  }, [isDarkMode]);

  return <div id={commentsUUID} />;
};

