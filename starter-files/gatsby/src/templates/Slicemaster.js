import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const SlicemasterWrapper = styled.div`
  text-align: center;
`;

export default function Slicemaster({ data }) {
  const { slicemaster } = data;
  return (
    <>
      <SEO title={slicemaster.name} image={slicemaster.image.asset.fluid.src} />
      <SlicemasterWrapper>
        <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
        <h2>
          <span className="mark">{slicemaster.name}</span>
        </h2>
        <p>{slicemaster.description}</p>
      </SlicemasterWrapper>
    </>
  );
}

export const query = graphql`
  query Slicemaster($slicemaster: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slicemaster } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
