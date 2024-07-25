import styled from "styled-components";
import { Icon } from "../../../../shared/components";

export const GridContainer = styled.div`
  .pointer {
    cursor: pointer;
  }

  .rgt-wrapper {
    min-height: 100%;
  }
`;

export const ProjectRow = styled.div`
  cursor: pointer;
`;

export const TypeIcon = styled(Icon)`
  color: ${props => props.color};
`;
