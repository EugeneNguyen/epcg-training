import moment from 'moment';
import PropTypes from 'prop-types';
import CellBase from './cell_base';

CellDatetime.propTypes = {
  dateFormat: PropTypes.string,
  editable: PropTypes.bool,
  value: PropTypes.any,

  id: PropTypes.string,
  valueKey: PropTypes.string,
  mutation: PropTypes.any,
  onCompleted: PropTypes.func,
};

export default function CellDatetime(props) {
  const dateValue = moment(props.value).isValid() ? moment(props.value).format('YYYY-MM-DD') : moment(parseInt(props.value)).format('YYYY-MM-DD');
  return (
    <CellBase
      id={props.id}
      valueKey={props.valueKey}
      mutation={props.mutation}
      onCompleted={props.onCompleted}
      editable={props.editable}
      renderDisplay={() => moment(parseInt(props.value)).format(props.dateFormat)}
      renderInput={() => (
        <input className="form-control" type="date" defaultValue={dateValue} name={props.valueKey} />
      )}
    />
  );
};
