import {toast} from 'react-toastify';
import PropTypes from "prop-types";

function submit(props, edit, value) {
  if (value === props.value) return;
  edit({
    variables: {
      id: props.editId,
      data: {[props.editKey]: value},
    }
  })
    .then(() => {
      toast.success('Edit completed');
      props.editOnCompleted && props.editOnCompleted();
    })
    .catch(error => toast.error(error));
}

const basePropTypes = {
  value: PropTypes.string,
  children: PropTypes.node,
  link: PropTypes.string,
  size: PropTypes.number,

  editable: PropTypes.bool,
  editId: PropTypes.string,
  editKey: PropTypes.string,
  editMutation: PropTypes.any,
  editOnCompleted: PropTypes.func,
}

const BaseHelper = {
  submit,
  basePropTypes,
};

export default BaseHelper;
