import styled from 'styled-components';

import { sizes } from '../../shared/utils/styles';

const paddingLeft = sizes.appNavBarLeftWidth + 50;

export const ProjectPage = styled.div`
  padding: 30px 50px 50px ${paddingLeft}px;

  @media (max-width: 68.75em) {
    padding: 25px 20px 50px ${paddingLeft - 20}px;
  }
  @media (max-width: 999px) {
    padding-left: ${paddingLeft - 20 - sizes.secondarySideBarWidth}px;
  }
`;
export const ProjectContainer = styled.div`
  @media (max-width: 68.75em) {
    padding: 25px 20px 50px ${paddingLeft - 20}px;
  }
  @media (max-width: 999px) {
    padding-left: ${paddingLeft - 20 - sizes.secondarySideBarWidth}px;
  }
`;
