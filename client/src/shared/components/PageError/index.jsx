import React from "react";

import {
  ErrorPage,
  ErrorPageInner,
  ErrorBox,
  StyledIcon,
  Title
} from "./Styles";

const PageError = () => (
  <ErrorPage>
    <ErrorPageInner>
      <ErrorBox>
        <StyledIcon type="bug" />
        <Title>There’s been a glitch…</Title>
      </ErrorBox>
    </ErrorPageInner>
  </ErrorPage>
);

export default PageError;
