import styled from 'styled-components';

import { sizes, font } from '../../shared/utils/styles';

const paddingLeft = sizes.appNavBarLeftWidth + sizes.secondarySideBarWidth + 40;

export const ProjectPage = styled.div`
  padding: 25px 32px 50px ${paddingLeft}px;
  overflow-y: auto;

  @media (max-width: 1100px) {
    padding: 25px 20px 50px ${paddingLeft - 20}px;
  }
`;

export const TitlesAndLists = styled.div`
  display: flex;
  flex-direction: column;
  margin: 26px 0;
`;

export const Header = styled.div`
  margin-top: 20px;
  display: flex;
  min-height: 32px;
  justify-content: space-between;
  @media (max-width: 550px) {
    flex-direction: column;
    padding: 0.5rem;
  }
`;

export const BoardName = styled.div`
  ${font.size(24)}
  ${font.medium}
  span {
    color: #5e6c84;
    font-size: 15px;
  }
`;

export const ActionContainer = styled.div`
  gap: 10px;
  display: flex;
  @media (max-width: 550px) {
    flex-direction: column;
    padding: 0.5rem;
  }
`;
export const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
export const ImageContainer = styled.div`
  height: 100%;
  max-width: 100%;
`;
export const FullContainer = styled.div`
  max-width: 100%;
  padding: 1rem;
  display: grid;

  grid-template-columns: 1fr 1fr;
  gap: 01rem;
  @media (max-width: 1000px) {
    max-height: fit-content;
    width: 100%;
    display: block;
    & > * {
      width: 100%;
      height: 100%;
    }
  }
`;
export const MapContainer = styled.div``;
