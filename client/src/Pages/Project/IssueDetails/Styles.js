import styled from 'styled-components';

import { color, font } from '../../../shared/utils/styles';

export const Content = styled.div`
  display: flex;
  padding: 0 30px 60px;
  @media (max-width: 600px) {
    width: 100vw;
    flex-direction: column;
  }
`;

export const Left = styled.div`
  width: 65%;
  padding-right: 50px;
  @media (max-width: 450px) {
    width: 100%;
  }
`;

export const Right = styled.div`
  width: 35%;
  padding-top: 5px;
  @media (max-width: 450px) {
    width: 100%;
  }
`;

export const TopActions = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  padding: 21px 18px 0;
`;

export const TopActionsRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  & > * {
    margin-left: 4px;
  }
`;

export const SectionTitle = styled.div`
  margin: 24px 0 5px;
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.size(12.5)}
  ${font.bold}
`;
export const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
export const ReviewContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  & > * {
    width: 100%;
  }
`;
export const RatingsContainer = styled.div`
  width: max-content;
  align-self: flex-end;
`;
export const Reviewed = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    padding: 0.5rem;
  }
`;
