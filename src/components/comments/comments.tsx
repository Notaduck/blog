import useTheme from "@src/hooks/useTheme";
import { FC, useEffect } from "react";

type Props = {
  issueTerm: string;
};

export const Comments: FC<Props> = ({ issueTerm }) => {
  const { isDarkMode } = useTheme()

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
    scriptParentNode?.appendChild(script);

    return () => {
      // cleanup - remove the older script with previous theme
      if (scriptParentNode?.firstChild != null) {
        scriptParentNode.removeChild(scriptParentNode?.firstChild);
      }
    };
  }, [isDarkMode, issueTerm]);

  return (
    <div id={commentsUUID}>
      <style>{`
        .utterances {
       max-width: 65ch; /* Limit the width */
          width: 100%; /* Ensure it takes the full width of the parent */
          height: auto; /* Allow the height to adjust as needed */
          margin-left: 0; /* Align to the left */
          margin-right: auto; /* Center the remaining space on the right */
        }
      `}</style>
    </div>
  );
};
