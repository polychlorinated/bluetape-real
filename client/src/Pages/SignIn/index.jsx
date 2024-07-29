import React, { useEffect } from 'react';

import { Form } from '../../shared/components';
import {
  ActionButton,
  Actions,
  Divider,
  FormElement,
  FormHeading,
} from '../Project/IssueCreate/Styles';
import './Styles.css';
import EntryCard from '../../shared/components/EntryCard/EntryCard';
import useApi from '../../shared/hooks/api';
import { Link, useHistory } from 'react-router-dom';
import { BannerText } from '../../shared/components/Banner/Styles';
import { AuthPage } from '../Styles';
import toast from '../../shared/utils/toast';
import { connect } from 'react-redux';
import { setUser } from '../../redux/user/user-reducer';
import ShowMap from '../../shared/components/ShowMap';
const SignIn = ({ setUser }) => {
  const [{ isCreating }, signIn] = useApi.post('/auth/login');
  const [{ data }] = useApi.get('/auth', {}, { cachePolicy: 'no-cache' });
  const history = useHistory();
  useEffect(() => {
    let mounted = true;
    if (mounted && data) {
      setUser(data.user);
      history.push('/projects');
    }
    return function cleanup() {
      mounted = false;
    };
  }, [data, history, setUser]);

  return (
    <div className="signin__container">
      <AuthPage>
        <EntryCard>
          <Form
            enableReinitialize
            initialValues={{
              email: '',
              password: '',
            }}
            validations={{
              email: [Form.is.required(), Form.is.email()],
              password: Form.is.required(),
            }}
            onSubmit={async (values, form) => {
              try {
                const user = await signIn({
                  ...values,
                });
                await setUser(user.user);
                history.push('/projects');
              } catch (error) {
                toast.error(error);
              }
            }}
          >
            <FormElement>
              <FormHeading>Sign in to your account</FormHeading>

              <Form.Field.Input name="email" placeholder="Email" />
              <Form.Field.Input
                name="password"
                placeholder="Password"
                type="password"
                autocomplete="current-password"
              />
              <Actions>
                <ActionButton
                  type="submit"
                  variant="full"
                  isWorking={isCreating}
                >
                  Log In
                </ActionButton>
              </Actions>
              <span style={{ marginTop: '15px' }}>
                <Link to="/forgot_pass">Forgot password?</Link>
              </span>
              <Divider />
              <span>
                Don't have an account?
                <Link to="/signup">Sign up</Link>
              </span>
            </FormElement>
          </Form>
        </EntryCard>
      </AuthPage>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
