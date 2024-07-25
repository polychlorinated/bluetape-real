import styled, { css } from 'styled-components';

export const HalfSide = styled.div`
  width: 50%;
  max-width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  ${(props) => sideVariants[props.variant]}
`;

const sideVariants = {
  left: css`
    padding-top: 10%;
    background: black;
  `,
  right: css`
    padding-top: 8%;
  `,
};
