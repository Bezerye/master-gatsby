import { useEffect, useState } from 'react';
// Fake variable to get vscode graphql template literal formatting & syntax highlight
const gql = String.raw;
const fragment = gql`
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

export default function useLatestData() {
  const [hotSlices, setHotslices] = useState();
  const [slicemasters, setSlicemasters] = useState();
  // Use a side effect to fetch data from grapql endpoint
  useEffect(function () {
    // When the component mounts, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${fragment}
              }
              hotSlices {
                ${fragment}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // set the data to state
        setHotslices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      // Check for error
      .catch((err) => console.log(err));
  }, []);
  return { hotSlices, slicemasters };
}
