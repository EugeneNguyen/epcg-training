import EditableCell from './editable';
import BaseCell from '../base/cell';
import BaseHelper from "../base/helper";

export default function CellCheckBoxInput(props) {
  if (props.editable) {
    return <EditableCell {...props} />
  }
  return (
    <BaseCell link={props.link} size={props.size}>
      <input
        type="checkbox"
        checked={props.children || props.value}
        disabled
      />
    </BaseCell>
  );
}

CellCheckBoxInput.propTypes = {
  ...BaseHelper.basePropTypes,
};
