import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';

import { InputDebounced, Modal, Button } from '../../../../shared/components';

import TrackingWidget from './TrackingWidget';
import { SectionTitle } from '../Styles';
import {
  TrackingLink,
  ModalContents,
  ModalTitle,
  Inputs,
  InputCont,
  InputLabel,
  Actions,
} from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsEstimateTracking = ({ issue, updateIssue }) => (
  <Fragment></Fragment>
);

const renderHourInput = (fieldName, issue, updateIssue) => (
  <InputDebounced
    placeholder="Estimate"
    filter={/^\d{0,6}$/}
    value={isNil(issue[fieldName]) ? '' : issue[fieldName]}
    onChange={(stringValue) => {
      const value = stringValue.trim() ? Number(stringValue) : null;
      if (value) updateIssue({ [fieldName]: value });
    }}
  />
);

ProjectBoardIssueDetailsEstimateTracking.propTypes = propTypes;

export default ProjectBoardIssueDetailsEstimateTracking;
