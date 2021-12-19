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
      renderDisplay={() => props.value || props.children}
      renderInput={() => (
        <input
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          defaultValue={props.value}
          name={props.valueKey}
        />
      )}
    />
  );
};