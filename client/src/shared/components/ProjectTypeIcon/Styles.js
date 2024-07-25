import styled from "styled-components";

import { projectTypeColors } from "../../../shared/utils/styles";
import { Icon } from "../../../shared/components";

export const TypeIcon = styled(Icon)`
  color: ${props => projectTypeColors[props.color]};
`;
