// @flow

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 32%;
  border: 2px solid #333;
  border-radius: 4px;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 46%;
  float: left;
  margin-right: 10px;
`;

// Props are IMMUTABLE (because of one-way data flow)
const ShowCard = (props: {
  // poster: string // if it's not required
  // if we have optional props, must set default!
  poster: string,
  title: string,
  year: string,
  description: string
}) => (
  <Wrapper>
    <Image
      src={`/public/img/posters/${props.poster}`}
      alt={`${props.title} Show Poster`}
    />
    <div>
      <h3>{props.title}</h3>
      <h4>({props.year})</h4>
      <p>{props.description}</p>
    </div>
  </Wrapper>
);

// Obselete with the introduction of Flow!
// // 95% of the use case for these is documentation!
// ShowCard.propTypes = {
//   // show: shape // if you don't know what it looks like coming in!
//   show: shape({
//     // poster: string // if it's not required
//     // if we have optional props, must set default!
//     poster: string.isRequired,
//     title: string.isRequired,
//     year: string.isRequired,
//     description: string.isRequired
//   }).isRequired
// };

export default ShowCard;
