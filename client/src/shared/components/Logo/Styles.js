import styled from "styled-components";

export const StyledLogo = styled.div`
  background-image: url("/Assets/Logos/mangekyo-logo.png");
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-size: 40px;
  background-repeat: no-repeat;
`;
