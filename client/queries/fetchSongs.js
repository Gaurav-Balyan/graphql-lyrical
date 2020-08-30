import gql from 'graphql-tag';

// Making query reusable by declaring in separate file
export default gql`
  {
    songs {
      id
      title
    }
  }
`;
