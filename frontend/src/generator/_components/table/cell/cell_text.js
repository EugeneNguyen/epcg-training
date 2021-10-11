import PropTypes from 'prop-types';
import CellBase from './cell_base';

CellText.propTypes = {
  editable: PropTypes.bool,
  value: PropTypes.any,

  id: PropTypes.string,
  valueKey: PropTypes.string,
  mutation: PropTypes.any,
  onCompleted: PropTypes.func,
};

export default function CellText(props) {
  return (
    <CellBase
      id={props.id}
      valueKey={props.valueKey}
      mutation={props.mutation}
      onCompleted={props.onCompleted}
      editable={props.editable}
      renderDisplay={() => props.value}
      renderInput={() => (
        <input className="form-control" defaultValue={props.value} name={props.valueKey} />
      )}
    />
  );
};