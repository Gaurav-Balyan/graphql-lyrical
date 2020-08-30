import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    // calling mutation
    this.props.mutate({
      variables: { id },
      // Optimistic update
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className='vote-box'>
            <i
              onClick={() => this.onLike(id, likes)}
              className='material-icons'
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

// Integrate graphql with component
export default graphql(mutation)(LyricList);
