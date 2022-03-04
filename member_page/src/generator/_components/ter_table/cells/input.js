import PropTypes from 'prop-types';
import CellTextInput from './text_input';

export default function Cell(props) {
  const {type, ...restProps} = props;
  
  return  <CellTextInput {...restProps} />;
}

Cell.propTypes = {
  value: PropTypes.string,
  children: PropTypes.node,

  editable: PropTypes.bool,
  editId: PropTypes.string,
  editKey: PropTypes.string,
  editMutation: PropTypes.any,
  editOnCompleted: PropTypes.func,
};
