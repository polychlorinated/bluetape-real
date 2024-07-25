import React from "react";

import { Header, BoardName } from "../Styles";
import { HeaderRightContent } from "../../MyProjects/Board/Header/Styles";
import NotificationHandler from "../../../shared/components/Notifications";

const ProjectHistoryHeader = () => {
  return (
    <Header>
      <BoardName>History</BoardName>
      <HeaderRightContent>
          <NotificationHandler/>
      </HeaderRightContent>
    </Header>
  );
};

export default ProjectHistoryHeader;
