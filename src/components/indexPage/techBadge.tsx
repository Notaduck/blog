import { IStaticImageProps } from "gatsby-plugin-image/dist/src/components/static-image.server";
import React, { FC } from "react"; 

type TTechBadge = {
    image: IStaticImageProps
}

export const TechBadge : FC<TTechBadge> = ({ image }) => (
    <span
      className={` min-h-40 min-w-40 bg-white shadow-xl  ml-2  rounded-full flex justify-center items-center p-5 m-2`}
    >
      {" "}
      {image}{" "}
    </span>
  );