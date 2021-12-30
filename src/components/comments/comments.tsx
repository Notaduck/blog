import React, { FC, useEffect } from 'react'
import useDarkMode from 'use-dark-mode';

type Props = {
    issueTerm: string
}

const Comments : FC<Props> = ({ issueTerm }) => {

  const darkMode = useDarkMode(false);
  const commentsUUID = `comments_${issueTerm}`

  useEffect(() => {
    let anchor;
    const theme = darkMode.value ? 'github-dark' : 'github-light' // you could choose other themes too
    const script = document.createElement('script')
    anchor = document.getElementById(commentsUUID)
    if(!anchor) return null
    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true
    script.setAttribute('repo', 'Notaduck/blog')
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('theme', theme)
    anchor.appendChild(script)
    // return () => {
    //   anchor.innerHTML = ''
    // }
  })
  return (
    <>
      <div id={commentsUUID} className="post-comments" className="relative">
        <div className="utterances-frame"></div>
      </div>
    </>
  )
}

export default Comments
