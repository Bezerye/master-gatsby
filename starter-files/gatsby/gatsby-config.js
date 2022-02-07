import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: 'Slicks Slices',
    siteUrl: 'https://gatsby.pizza',
    description: 'A Gatsby website for educational purposes',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      // This is the name of the plugin
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'av63xvej',
        dataset: 'production',
        watchMode: 'true',
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
