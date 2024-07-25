import styled from "styled-components";

export const SprintInfo = styled.div`
  color: #5e6c84;
  font-size: 14px;
  ${props => props.sprintOverDue && "color: red;"}
`;

export const Right = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
