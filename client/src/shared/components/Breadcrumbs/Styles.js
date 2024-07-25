import styled from 'styled-components';

import { color, font } from '../../../shared/utils/styles';

export const Container = styled.div`
  @media screen and (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
  color: ${color.textMedium};
  ${font.size(15)};
`;

export const Divider = styled.span`
  position: relative;
  top: 2px;
  margin: 0 10px;
  ${font.size(18)};
`;
