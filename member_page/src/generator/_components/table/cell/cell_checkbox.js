import PropTypes from 'prop-types';
import CellBase from './cell_base';

CellCheckbox.propTypes = {
  editable: PropTypes.bool,
  value: PropTypes.any,

  id: PropTypes.string,
  valueKey: PropTypes.string,
  mutation: PropTypes.any,
  onCompleted: PropTypes.func,
};

export default function CellCheckbox(props) {
  return (
    <CellBase
      id={props.id}
      valueKey={props.valueKey}
      mutation={props.mutation}
      onCompleted={props.onCompleted}
      editable={props.editable}
      renderDisplay={() => (
        <input
          {...props}
          type="checkbox"
          checked={props.value}
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          disabled
        />
      )}
      renderInput={() => (
        <input
          {...props}
          type="checkbox"
          name={props.valueKey}
          checked={props.value}
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      )}
    />
  );
};