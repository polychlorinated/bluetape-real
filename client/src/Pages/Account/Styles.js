import styled from 'styled-components';

import { font } from '../../shared/utils/styles';
import { Button, Form } from '../../shared/components';
import { sizes } from '../../shared/utils/styles';

export const FormCont = styled.div`
  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 200px;
`;
export const ActionContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  justify-content: center;
  display: flex;
`;

export const AccountPage = styled.div`
  padding: 50px 350px 50px 412px;

  @media (max-width: 1100px) {
    padding: 25px 20px 50px 180px;
  }
  @media (max-width: 999px) {
    padding-left: ${180 - sizes.secondarySideBarWidthTwo}px;
  }
`;
export const Image = styled.img`
  height: 200px;
  width: 200px;
  max-height: 100%;
  max-width: 100%;
  border-radius: 50%;
`;
export const ImageContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
`;
export const ImageContainerFallBack = styled.div``;
