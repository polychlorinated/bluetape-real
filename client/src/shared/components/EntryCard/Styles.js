import styled from "styled-components";

export const StyledEntryCard = styled.div`
  width: 100%;
  max-width: 450px;
  border-radius: 5px;
  padding: 50px;
  margin-bottom: 40px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.6);
  text-align: center;

  h2 {
    font-weight: 500;
    margin-bottom: 50px;
  }

  span {
    display: block;
    margin-top: 40px;
    font-size: 15px;
  }

  a {
    margin-left: 4px;
    color: #2f8bfd;
  }
`;
