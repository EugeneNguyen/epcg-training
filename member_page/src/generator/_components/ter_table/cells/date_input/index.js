import PropTypes from 'prop-types';
import moment from 'moment';

import EditableCell from './editable';
import BaseCell from '../base/cell';
import BaseHelper from "../base/helper";

export default function CellDateInput(props) {
  if (props.editable) {
    return <EditableCell {...props} />
  }
  return (
    <BaseCell link={props.link} size={props.size}>
      {props.children || moment(props.value).format(props.dateFormat)}
    </BaseCell>
  );
}

CellDateInput.propTypes = {
  ...BaseHelper.basePropTypes,
  dateFormat: PropTypes.string,
};
