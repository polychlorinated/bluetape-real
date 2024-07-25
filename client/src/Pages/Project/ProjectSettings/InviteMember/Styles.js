import styled from 'styled-components';

import { color, font } from '../../../../shared/utils/styles';
import { Button, Form } from '../../../../shared/components';

export const FormElement = styled(Form.Element)`
  padding: 25px 40px 35px;

  @media screen and (max-width: 600px) {
    background-color: rgb(255, 255, 255);
    position: fixed;
    top: 40%;
    left: 0;
    width: 100vw;
  }
`;

export const FormHeading = styled.div`
  padding-bottom: 15px;
  ${font.size(21)}
`;

export const Divider = styled.div`
  margin-top: 22px;
  border-top: 1px solid ${color.borderLightest};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;

export const ActionButton = styled(Button)`
  margin-left: 10px;
`;
