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
import { Link } from 'react-router-dom';
import { BannerText } from '../../shared/components/Banner/Styles';
import { AuthPage } from '../Styles';
import toast from '../../shared/utils/toast';

const ForgotPassword = () => {
  const [{ isCreating }, forgotPassword] = useApi.post('/auth/forgot_password');
  return (
    <div className="signin__container">
      <AuthPage>
        <EntryCard>
          <Form
            enableReinitialize
            initialValues={{
              email: '',
            }}
            validations={{
              email: [Form.is.required(), Form.is.email()],
            }}
            onSubmit={async (values) => {
              try {
                await forgotPassword({
                  ...values,
                });
                toast.success('Reset link sent to email!');
              } catch (error) {
                toast.error(error);
              }
            }}
          >
            <FormElement>
              <FormHeading>Forgot password</FormHeading>

              <Form.Field.Input name="email" placeholder="Email" />
              <Actions>
                <ActionButton
                  type="submit"
                  variant="full"
                  isWorking={isCreating}
                >
                  Request Reset
                </ActionButton>
              </Actions>
              <Divider />
              <span>
                Have a password?
                <Link to="/signin">Sign in</Link>
              </span>
            </FormElement>
          </Form>
        </EntryCard>
      </AuthPage>
    </div>
  );
};

export default ForgotPassword;
