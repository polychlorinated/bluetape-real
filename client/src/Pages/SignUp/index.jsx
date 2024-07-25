import React, { useEffect } from 'react';

import { Form } from '../../shared/components';
import {
  ActionButton,
  Actions,
  Divider,
  FormElement,
  FormHeading,
} from '../Project/IssueCreate/Styles';
import EntryCard from '../../shared/components/EntryCard/EntryCard';
import useApi from '../../shared/hooks/api';
import HalfScreen from '../../shared/components/HalfSide';
import Mangekyo from '../../shared/components/Loaders/Mangekyo';
import SharinganBanner from '../../shared/components/Banner';
import { Link, useHistory } from 'react-router-dom';
import { BannerText } from '../../shared/components/Banner/Styles';
import { AuthPage } from '../Styles';
import toast from '../../shared/utils/toast';
import { setUser } from '../../redux/user/user-reducer';
import { connect } from 'react-redux';

const SignUp = ({ inviteInputVisible }) => {
  const [{ isCreating }, signUp] = useApi.post('/auth/register');
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
  }, [data, history]);

  return (
    <div className="signin__container">
      <AuthPage>
        <EntryCard>
          <Form
            enableReinitialize
            initialValues={{
              name: '',
              email: '',
              password: '',
              organization: '',
              role: 'member',
            }}
            validations={{
              name: Form.is.required(),
              email: [Form.is.required(), Form.is.email()],
              password: Form.is.required(),
              organization: Form.is.required(),
              role: Form.is.oneOf(['owner', 'member']),
            }}
            onSubmit={async (values, form) => {
              try {
                const user = await signUp({
                  ...values,
                  creationDate: Date.now(),
                });
                if (user.user.role === 'owner' && !user.user.isHalfOwner) {
                  toast.success('Organization Registered.');
                } else {
                  toast.success('User created successfully!');
                }
                setTimeout(() => {
                  history.push('/signin');
                }, 1000);
              } catch (error) {
                toast.error(error);
              }
            }}
          >
            <FormElement>
              <FormHeading>Sign up for your account</FormHeading>
              <Form.Field.Input name="name" placeholder="Full name" />
              <Form.Field.Input name="email" placeholder="Email" />
              <Form.Field.Input
                name="password"
                placeholder="New password"
                type="password"
              />
              <Form.Field.Input
                name="organization"
                placeholder="Organization name"
              />
              <Form.Field.Select
                name="role"
                options={[
                  {
                    value: 'member',
                    label: 'Member',
                  },
                  {
                    value: 'owner',
                    label: 'Owner',
                  },
                ]}
                variant="simple"
              />
              {inviteInputVisible && (
                <Form.Field.Input
                  name="invitationCode"
                  placeholder="Invitation code"
                />
              )}

              <Actions>
                <ActionButton
                  type="submit"
                  variant="full"
                  isWorking={isCreating}
                >
                  Sign up
                </ActionButton>
              </Actions>
              <Divider />
              <span>
                Already have an account?
                <Link to="/signin">Sign in</Link>
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

const mapStateToProps = (state) => ({
  inviteInputVisible: state.userState.inviteInputVisible,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
