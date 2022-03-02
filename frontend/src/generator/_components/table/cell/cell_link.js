import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import CellBase from './cell_base';

CellLink.propTypes = {
  link: PropTypes.string,
  editable: PropTypes.bool,
  value: PropTypes.any,

  id: PropTypes.string,
  valueKey: PropTypes.string,
  mutation: PropTypes.any,
  onCompleted: PropTypes.func,
};

export default function CellLink(props) {
  return (
    <CellBase
      id={props.id}
      valueKey={props.valueKey}
      mutation={props.mutation}
      onCompleted={props.onCompleted}
      editable={props.editable}
      renderDisplay={() => (
        <Link to={props.link} className="underline text-blue-500">
          {props.value || props.children}
        </Link>
      )}
      renderInput={() => (
        <input
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          defaultValue={props.value}
          name={props.valueKey}
        />
      )}
    />
  );
};
