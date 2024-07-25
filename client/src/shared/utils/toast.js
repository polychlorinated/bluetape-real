import pubsub from 'sweet-pubsub';
import { get } from 'lodash';

const show = (toast) => pubsub.emit('toast', toast);

const success = (title, duration) => show({ title, duration });

const error = (err) => {
  show({
    type: 'danger',
    title: 'Error',
    message: get(err, 'message', err),
    duration: 0,
  });
};

const exported = { show, error, success };

export default exported;
