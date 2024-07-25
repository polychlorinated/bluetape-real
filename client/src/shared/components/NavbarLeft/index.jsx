import React from 'react';

import { Icon } from '../index';

import { NavLeft, LogoLink, Bottom, Item, ItemText, LogoText } from './Styles';
import Logo from '../Logo';
import { useHistory } from 'react-router-dom';
import useApi from '../../hooks/api';
import {
  getStoredRefreshToken,
  removeStoredAuthToken,
} from '../../utils/authToken';

const ProjectNavbarLeft = (props) => {
  const history = useHistory();
  const [, signOut] = useApi.post('/auth/logout');

  return (
    <NavLeft>
      {props.setSidebar ? (
        <Item
          onClick={() => {
            props.setSidebar(!props.sidebar);
          }}
        >
          <Icon
            style={props.sidebar ? { color: 'red' } : {}}
            type={props.sidebar ? 'arrow-left' : 'arrow-right'}
            size={27}
          />
          <ItemText>Show Routes</ItemText>
        </Item>
      ) : (
        ''
      )}

      <LogoLink to="/">
        <Logo color="#fff" />
        <LogoText>Bluetap</LogoText>
      </LogoLink>

      {props.page === 'account' ? (
        <Item onClick={() => history.push('/projects')}>
          <Icon type="arrow-left" size={22} top={1} left={3} />
          <ItemText>Projects</ItemText>
        </Item>
      ) : (
        <Item onClick={() => history.push('/account')}>
          <Icon type="settings" size={22} top={1} left={3} />
          <ItemText>Account</ItemText>
        </Item>
      )}

      <Bottom>
        <Item
          onClick={async () => {
            const refreshToken = getStoredRefreshToken();
            await signOut({ refreshToken });
            removeStoredAuthToken();
            history.push('/signin');
          }}
        >
          <Icon type="arrow-left" size={27} />
          <ItemText>Logout</ItemText>
        </Item>
      </Bottom>
    </NavLeft>
  );
};

export default ProjectNavbarLeft;
