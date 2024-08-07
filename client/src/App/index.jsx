import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';
import Toast from './Toast';
import Routes from './Routes';
import history from '../browserHistory';
import './fontStyles.css';
import './index.css';
import { connectSocket } from '../redux/socket/socket-actions';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const App = ({ connectSocket }) => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      connectSocket();
    }
  }, [token]);

  return (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <Toast />
      <Routes history={history} />
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  connectSocket: () => dispatch(connectSocket()),
});

export default connect(null, mapDispatchToProps)(App);