import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { font, sizes, color, mixin, zIndexValues } from '../../utils/styles';

export const NavLeft = styled.aside`
  z-index: ${zIndexValues.navLeft};
  position: fixed;
  top: 27px;
  left: 0;
  overflow-x: hidden;
  height: 60vh;
  width: ${sizes.appNavBarLeftWidth}px;
  background: ${color.backgroundDarkPrimary};
  transition: all 0.1s;
  border-bottom-right-radius: 2rem;

  ${mixin.hardwareAccelerate}
  &:hover {
    width: 200px;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.6);
  }
`;

export const LogoLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  justify-content: center;
  left: 4;
  margin: 20px 0 10px;
  transition: left 0.1s;
`;

export const LogoText = styled.div`
  color: white;
  font-size: 20px;
  position: relative;
  right: 12px;
  visibility: hidden;
  opacity: 0;
  text-transform: uppercase;
  transition: all 0.1s;
  transition-property: right, visibility, opacity;

  ${font.bold}
  ${NavLeft}:hover & {
    right: -10px;
    visibility: visible;
    opacity: 1;
  }
`;

export const Bottom = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
`;

export const Item = styled.div`
  position: relative;
  width: 100%;
  height: 42px;
  line-height: 42px;
  padding-left: 64px;
  color: #deebff;
  transition: color 0.1s;
  display: flex;
  align-items: center;
  text-align: center;

  ${mixin.clickable}
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  i {
    position: absolute;
    left: 18px;
  }
`;

export const ItemText = styled.div`
  position: relative;
  right: 12px;
  visibility: hidden;
  opacity: 0;
  text-transform: uppercase;
  transition: all 0.1s;
  transition-property: right, visibility, opacity;

  ${font.bold}
  ${font.size(12)}
  ${NavLeft}:hover & {
    right: -10px;
    visibility: visible;
    opacity: 1;
  }
`;
