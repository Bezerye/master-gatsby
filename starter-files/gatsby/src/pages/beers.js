import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const BeersWrapper = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 4rem;
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: gird;
    align-items: center;
    font-size: 1rem;
    color: black;
  }
`;

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
      <h2 className="center">
        We have {beers.length} available. Dine in Only!{' '}
      </h2>
      <BeersWrapper>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`★`.repeat(rating)}
                {`☆`.repeat(5 - rating)}
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeersWrapper>
    </>
  );
}

export const query = graphql`
  query GiefBeer {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
