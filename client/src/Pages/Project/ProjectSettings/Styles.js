import styled from 'styled-components';

import { font } from '../../../shared/utils/styles';
import { Button, Form } from '../../../shared/components';

export const FormCont = styled.div`
  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 550px) {
    flex-direction: column;
    padding: 0.5rem;
    justify-content: flex-end;
  }
`;

export const FormElement = styled(Form.Element)`
  width: 100%;
`;

export const FormHeading = styled.h1`
  padding: 20px 0 10px;
  ${font.size(24)}
  ${font.medium}
`;

export const ActionButton = styled(Button)`
  margin-top: 30px;
`;

export const ActionButtonHeader = styled(Button)`
  margin-top: 0;
`;

export const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
export const ImageContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
`;
export const FullContainer = styled.div`
  max-height: 100%;
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
export const MapContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
`;
