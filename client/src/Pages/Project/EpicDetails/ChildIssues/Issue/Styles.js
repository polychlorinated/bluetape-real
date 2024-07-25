import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { color, font, mixin } from "../../../../../shared/utils/styles";
import { Avatar } from "../../../../../shared/components";

export const IssueLink = styled(Link)`
  display: block;
`;

export const Issue = styled.div`
  ${mixin.clickable} @media(max-width: 1100 px) {
    padding: 10px 8px;
  }
  padding: 10px 10px;
  background: #fff;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: space-between;
  box-shadow: 1px 1px 2px 0px rgba(9, 30, 66, 0.25);
  transition: background 0.1s;

  &:hover {
    background: ${color.backgroundLight};
  }

  ${props =>
    props.isBeingDragged &&
    css`
      transform: rotate(3deg);
      box-shadow: 5px 10px 30px 0px rgba(9, 30, 66, 0.15);
    `}
`;

export const Title = styled.p`
  @media (max-width: 1100px) {
    ${font.size(14.5)}
  }
  ${font.size(15)}
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Assignees = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-left: 2px;
  margin-top: -5px;
`;

export const AssigneeAvatar = styled(Avatar)`
  margin-left: -2px;
  box-shadow: 0 0 0 2px #fff;
`;
