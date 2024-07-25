import { socketService } from '../../shared/utils/socket-service';
import api from '../../shared/utils/api';
import { getStoredAuthToken } from '../../shared/utils/authToken';

const socketConstants = {
  CONNECT: 'CONNECT',
};

const notificationConstants = {
  TOGGLE_NOTIFICATION_POPUP: 'TOGGLE_NOTIFICATION_POPUP',
  CLOSE_NOTIFICATION_POPUP: 'CLOSE_NOTIFICATION_POPUP',
  ADD_NOTIFICATIONS: 'ADD_NOTIFICATIONS',
  READ_NOTIFICATIOS: 'READ_NOTIFICATIOS',
  FETCH_NOTIFICATIONS_REQUEST: 'FETCH_NOTIFICATIONS_REQUEST',
  FETCH_NOTIFICATIONS_SUCCESS: 'FETCH_NOTIFICATIONS_SUCCESS',
};

let initialState = {
  socket: {},
  isOpen: false,
  notifications: [],
  allNotificationsCount: 0,
};

export const connectSocket = () => async (dispatch) => {
  const socket = await socketService.connect();

  socket.on('fetch_notifications', () => {
    fetchNotifications(dispatch);
  });
};

const readNotifications = (payload) => {
  return {
    type: notificationConstants.READ_NOTIFICATIOS,
    payload: payload,
  };
};

export const fetchNotifications = (dispatch) => {
  const data = api
    .get(`/notification/get/${getStoredAuthToken()}`)
    .then((data) => {
      dispatch({
        type: notificationConstants.ADD_NOTIFICATIONS,
        payload: {
          notifications: data,
          allNotificationsCount: data.filter(
            (notification) => notification.read === false
          ).length,
        },
      });
    });
};

const toggleNotificationPopup = () => {
  return {
    type: notificationConstants.TOGGLE_NOTIFICATION_POPUP,
  };
};

const closeNotificationPopup = () => {
  return { type: notificationConstants.CLOSE_NOTIFICATION_POPUP };
};

const addNotification = () => {
  return { type: notificationConstants.ADD_NOTIFICATION };
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case socketConstants.CONNECT:
      return {
        ...state,
        socket: action.payload,
      };
    case notificationConstants.READ_NOTIFICATIOS:
      return {
        ...state,
        notifications: action.payload,
      };
    case notificationConstants.ADD_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.notifications,
        allNotificationsCount: action.payload.allNotificationsCount,
      };

    default:
      return state;
  }
};

export default socketReducer;
