import styled from 'styled-components';
import { color } from '../../../shared/utils/styles';

export const Rows = styled.div`
  display: flex;
  margin: 5px 0;
  flex-direction: column;

  .Collapsible {
    width: 100%;
    margin-top: 10px;
  }
`;

export const Trigger = styled.div`
  display: flex;
  background: #f4f5f7;
  border-radius: 2px;
  padding: 5px 5px;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  align-items: center;
  text-align: center;
  color: ${color.textMedium};
`;

export const TriggerInner = styled.div`
  display: flex;
`;

export const IconStyler = styled.div`
  display: flex;
  gap: 2rem;
  border-radius: 50%;
  padding: 0 2px;
`;
