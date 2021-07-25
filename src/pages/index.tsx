import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { content } from "../content";
import Typical from "react-typical";
import { FiChevronDown } from "react-icons/fi";

const Index = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <Layout>
  <div className=" mt-auto flex-1 flex flex-col  items-center justify-center mx-auto ">
        <div className="w-10/12 mx-auto flex flex-col md:flex-row-reverse items-center justify-between ">
          <div className=" flex-1 flex flex-col w-full md:w-2/5">
            {/* <image src='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/104113705/original/6076831db34315e45bd2a31a9d79bb7b91d48e04/design-flat-style-minimalist-avatar-of-you.jpg'/> */}
            {/* <LazyLoadImage
            src={content.header.img}
            effect="blur"
            placeholderSrc={process.env.PUBLIC_URL + '/logo512.png'}
          /> */}
          </div>
          <div className=" text-main-text text-center md:text-left">
            <h2
              className={`${
                animated ? "" : "translate-y-10 opacity-0"
              } font-inconsolata transform transition duration-2000 ease-in-out text-3xl md:text-5xl font-bold`}
            >
              {content.index.text[0]}
              <br />
              {content.index.text[1]}
            </h2>

            <h2
              className={`${
                animated ? "" : "translate-y-10 opacity-0"
              } font-inconsolata transform transition duration-2000 ease-in-out text-2xl md:text-3xl font-bold`}
            >
              {content.index.text[2]}
              <br />
              <br />
            </h2>
            <h1
              className={`${
                animated ? "" : "translate-y-10 opacity-0"
              }  font-inconsolata transform transition duration-2000 ease-in-out font-bold text-2xl text-gray-500`}
            >
              {content.index.text[3]}{" "}
              <Typical
                steps={content.index.typical}
                loop={Infinity}
                className="inline-block"
              />
            </h1>
          </div>
        </div>
        <div className="mt-auto flex justify-around w-full items-center h-full ">
          <button className="flex flex-col items-center border-2 border-gray-400 rounded-3xl p-5">
            <p> Do you wanna now more?</p>
            <FiChevronDown />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
