import PropTypes from 'prop-types';

import BaseCell from './base/cell';
import CellTextInput from './text_input';
import CellIntegerInput from './integer_input';
import CellDateInput from './date_input';
import CellCheckBoxInput from './checkbox_input';

export default function Cell(props) {
  if (props.hidden) return null;
  const {type, ...restProps} = props;
  if (type === 'INT' || type === 'FLOAT') return <CellIntegerInput {...restProps} />;
  if (type === 'DATETIME') return <CellDateInput {...restProps} />;
  if (type === 'TINYINT(1)') return <CellCheckBoxInput {...restProps} />;
  if (type.startsWith('VARCHAR') || type == 'TEXT') return <CellTextInput {...restProps} />;

  return <BaseCell {...restProps} />;
}

Cell.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  dateFormat: PropTypes.string,
  link: PropTypes.string,
  size: PropTypes.number,
  hidden: PropTypes.bool,

  editable: PropTypes.bool,
  editId: PropTypes.string,
  editKey: PropTypes.string,
  editMutation: PropTypes.any,
  editOnCompleted: PropTypes.func,
};
