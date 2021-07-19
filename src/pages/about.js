import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { SEO } from '../components/seo'
import { Layout } from "../components/layout";

const About = ({ data }) => {

  const { site : { siteMetadata : { name, profession }}} = data
  const { file : { childImageSharp : { fluid : picture }}} = data

  return (
    <Layout>
      <SEO title="About" />
      <div className="xs:px-10">
        <div className="flex xs:flex-col md:flex-row justify-evenly mb-6">
          <Img
            className="rounded-full h-36 w-36 flex items-center justify-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            fluid={picture}
          />
          <div className="flex flex-col items-center align-center xs:pt-6 md:pt-0">
            <h2> Hi, my name is {name}. </h2>
            <h3> I am a {profession}</h3>
          </div> 
        </div>
        <section>
          <p> I am currently emplyed at </p>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    site {
      siteMetadata {
        name
        profession 
      }
    }
    file(name: { regex: "/me/" }) {
      id
      childImageSharp {
        fluid(grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default About;
