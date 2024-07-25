import styled from 'styled-components';

export const NotificationWrapper = styled.div`
  display: flex;
  margin-top: 3px;
  z-index: 2;
`;

export const NotificationContainer = styled.div`
  display: flex;
  padding: 15px;
  background-color: #dfe1e6;
  border-bottom: 1px solid grey;
  cursor: pointer;
`;

export const Image = styled.div`
  display: flex;
  margin-right: 10px;
  min-width: 50px;
`;

export const Message = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
`;
