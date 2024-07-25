import styled from "styled-components";

import { font } from "../../../../shared/utils/styles";
import Modal from "../../../../shared/components/Modal";
import { Form } from "../../../../shared/components";

export const StyledConfirmModal = styled(Modal)`
  padding: 35px 40px 40px;
`;

export const FormElement = styled(Form.Element)``;

export const Title = styled.div`
  ${font.medium}
  ${font.size(22)}
  line-height: 1.5;
`;

export const Message = styled.p`
  padding-bottom: 25px;
  white-space: pre-wrap;
  ${font.size(15)}
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
`;

export const Info = styled.div`
  padding-top: 10px;
  font-size: 12px;

  span {
    background-color: #f4f5f7;
    padding: 5px 3px;
    border-radius: 5px;
    font-weight: 500;
  }
`;
