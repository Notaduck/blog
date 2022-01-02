import styled from "@emotion/styled";
import React from "react";
import tw from "twin.macro";

const ToC = ({ headings }) => (
  <TOC>
    <Title className='underline'>Table of contents</Title>
    <InnerScroll>
      {headings.map((heading) => {
        if (heading.depth > 4) {
          return <div />;
        }

        return (
          <ToCElement key={heading.value}>
            <ToCLink
              href={`#${heading.value.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {heading.value}
            </ToCLink>
          </ToCElement>
        );
      })}
    </InnerScroll>
  </TOC>
);

const TOC = ({ children }) => (
  <ul className="bg-primary  border-black fixed hidde lg:flex flex-col rounded-2xl p-3 mt-8 my-3 w-full left-[calc(55%_+_400px)] top-[90px]">
    {children}
  </ul>
);

const Toc = styled.ul`
  ${tw`bg-white fixed hidden lg:flex flex-col rounded p-3 my-3`};
  width: 20rem;
  left: calc(50% + 400px);
  top: 80px;
  max-height: 30vh;
`;

const Title = tw.h2`text-2xl mb-2`;

const ToCElement = tw.li`py-1 leading-5 mb-4 mr-4 leading-3 list-none`;

const ToCLink = tw.a`hover:text-black transition duration-300 no-underline`;

const InnerScroll = styled.div`
  scrollbar-width: thin;
  scrollbar-color: #367ee9 rgba(48, 113, 209, 0.3);
  overflow: hidden auto;
`;

export default ToC;
