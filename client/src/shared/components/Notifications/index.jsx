import React from 'react';
import Notifications from 'react-notifications-menu';
import {
  Image,
  Message,
  NotificationContainer,
  NotificationWrapper,
} from './Styles';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import api from '../../utils/api';

const NotificationHandler = ({ socket, userId }) => {
  const match = useRouteMatch();
  let data = socket.notifications
    .map((notification) => {
      if (
        notification.type === 'added_comment' ||
        notification.type === 'updated_comment'
      ) {
        return {
          id: notification.id,
          userId,
          image: '/Assets/comment.png',
          message: notification.message,
          projectId: notification.project.id,
          redirectUrl: notification.issue
            ? `${
                match.url === '/projects'
                  ? '/project/' +
                    notification.project.id +
                    '/backlog/issues' +
                    notification.issue.id
                  : match.url + '/issues/' + notification.issue.id
              }`
            : `${'/project/' + notification.project.id + '/backlog/'}`,
        };
      }
    })
    .reverse();

  const ReadAllNotifications = async () => {
    await api.get(`/notification/read_all/${userId}`);
  };
  data = data.filter(function(element) {
    return element !== undefined;
  });
  console.log(data);
  return (
    <NotificationWrapper>
      <Notifications
        data={data}
        notificationCard={NotificationCard}
        header={{
          title: 'Notifications',
          option: { text: 'Mark all as read', onClick: ReadAllNotifications },
        }}
      />
    </NotificationWrapper>
  );
};

const NotificationCard = ({ data }) => {
  const match = useRouteMatch();
  const NotificationClick = async () => {
    const response = await api.get(`/notification/read/${data.id}`);
  };

  return (
    <Link key={data.id} to={data.redirectUrl}>
      <NotificationContainer onClick={NotificationClick}>
        <Image>
          <img src={data.image} />
        </Image>
        <Message>{data.message}</Message>
      </NotificationContainer>
    </Link>
  );
};

const mapStateToProps = (state) => ({
  socket: state.socketState,
  userId: state.userState.user.id,
});

export default connect(mapStateToProps)(NotificationHandler);
