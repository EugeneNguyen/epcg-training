import moment from 'moment'

export default function CellDatetime(props) {
  return (
    <td>{moment(parseInt(props.children)).format(props.dateFormat)}</td>
  );
};
