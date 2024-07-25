import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { StyledConfirmModal, Title, Actions, Info } from './Styles';
import { Button, Form } from '../../../../shared/components';
import { FormElement } from './Styles';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'danger']),
  title: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  renderLink: PropTypes.func.isRequired,
};

const defaultProps = {
  className: undefined,
  variant: 'primary',
  title: 'Warning',
  message: 'Are you sure you want to continue with this action?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
};

const Modal = ({
  className,
  title,
  confirmText,
  cancelText,
  onConfirm,
  renderLink,
}) => {
  const [isWorking, setWorking] = useState(false);

  const handleConfirm = (noOfWeeks, modal) => {
    setWorking(true);
    onConfirm(noOfWeeks, {
      close: () => {
        modal.close();
        setWorking(false);
      },
    });
  };

  return (
    <StyledConfirmModal
      className={className}
      testid="modal:confirm"
      withCloseIcon={false}
      renderLink={renderLink}
      renderContent={(modal) => (
        <Fragment>
          <Title>{title}</Title>
          <Form
            enableReinitialize
            initialValues={{
              noOfWeeks: 2,
            }}
            validations={{
              noOfWeeks: Form.is.required(),
            }}
            onSubmit={async (values, form) => {
              handleConfirm(values.noOfWeeks, modal);
            }}
          >
            <FormElement>
              <Info>
                *everything in <span>TASKS DONE</span> will be sent for review
                by admin
              </Info>
              <Actions>
                <Button variant="primary" type="submit" isWorking={isWorking}>
                  {confirmText}
                </Button>
                <Button hollow onClick={modal.close}>
                  {cancelText}
                </Button>
              </Actions>
            </FormElement>
          </Form>
        </Fragment>
      )}
    />
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
