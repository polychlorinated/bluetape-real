import styled from 'styled-components';

import { color, font, mixin } from '../../../../shared/utils/styles';

export const List = styled.div`
  &:last-child {
    background-color: #0b875b;
  }
  &:first-child {
    background-color: #f4f5f7;
  }
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  min-height: 200px;
  width: 100%;
  padding-top: 5px;
  border-radius: 3px;
  background: ${color.backgroundLightest};
`;

export const Title = styled.div`
  padding: 13px 10px 17px;
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.size(12.5)};
  ${mixin.truncateText}
`;

export const IssuesCount = styled.span`
  text-transform: lowercase;
  ${font.size(13)};
`;

export const Issues = styled.div`
  height: 100%;
  padding: 0 5px;
`;

export const AddIssue = styled.div`
  display: flex;
  opacity: 0.3;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  gap: 5px;
  text-align: center;
  padding: 10px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(9, 30, 66, 0.25);
  transition: background 0.1s;
  ${mixin.clickable};
  @media (max-width: 1100px) {
    padding: 10px 8px;
  }

  &:hover {
    background: ${color.backgroundLight};
    opacity: 1;
  }
`;
