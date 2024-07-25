import React from 'react';

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
import { BannerText } from '../../shared/components/Banner/Styles';
import { AuthPage } from '../Styles';
import toast from '../../shared/utils/toast';
import { useHistory, useRouteMatch } from 'react-router-dom';

const ResetPassword = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const [{ isCreating }, resetPassword] = useApi.post('/auth/reset_password');
  return (
    <div className="signin__container">
      <AuthPage>
        <EntryCard>
          <Form
            enableReinitialize
            initialValues={{
              password: '',
            }}
            validations={{
              password: Form.is.required(),
            }}
            onSubmit={async (values) => {
              try {
                await resetPassword({
                  ...values,
                  token: match.params.token,
                });
                toast.success('Password reset successful!');
                setTimeout(() => {
                  history.push('/signin');
                }, 500);
              } catch (error) {
                toast.error(error);
              }
            }}
          >
            <FormElement>
              <FormHeading>Reset Password</FormHeading>
              <Form.Field.Input
                name="password"
                placeholder="New Password"
                type="password"
              />
              <Actions>
                <ActionButton
                  type="submit"
                  variant="full"
                  isWorking={isCreating}
                >
                  Reset Password
                </ActionButton>
              </Actions>
              <Divider />
            </FormElement>
          </Form>
        </EntryCard>
      </AuthPage>
    </div>
  );
};

export default ResetPassword;
