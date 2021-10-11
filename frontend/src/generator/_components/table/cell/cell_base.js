import {useState} from 'react';
import {useMutation} from "@apollo/client";
import PropTypes from 'prop-types';
import {Button as ButtonStrap} from 'reactstrap';
import {toast} from 'react-toastify';
import Form from '../../form/form';

CellBase.propTypes = {
  editable: PropTypes.bool,
  renderDisplay: PropTypes.func,
  renderInput: PropTypes.func,

  id: PropTypes.string,
  valueKey: PropTypes.string,
  mutation: PropTypes.any,
  onCompleted: PropTypes.func,
};

export default function CellBase(props) {
  const [hover, setHover] = useState(false);
  const [editMode, setEditMode] = useState(false);

  if (!hover || !props.editable) {
    return (
      <td
        onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)}
        class="px-6 py-4 whitespace-nowrap"
      >
        {props.renderDisplay()}
      </td>
    );
  }

  if (!editMode) {
    return (
      <td
        onMouseLeave={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
        class="px-6 py-4 whitespace-nowrap"
      >
        <div className="flex flex-wrap justify-between">
          {props.renderDisplay()}
          <Button color="primary" icon="bi bi-pencil-square" onClick={() => setEditMode(true)} />
        </div>
      </td>
    );
  }
  return <TDEdit {...props} setEditMode={setEditMode}/>
}

function TDEdit(props) {
  const [edit] = useMutation(props.mutation, {
    onCompleted: () => {
      toast.success('Edit completed');
      props.onCompleted();
      props.setEditMode(false);
    },
  });

  return (
    <td
      class="px-6 py-4 whitespace-nowrap"
    >
      <Form
        className="flex flex-wrap space-x-1 items-center"
        onSubmitParams={(params) => edit({ variables: { id: props.id, data: params } })}
      >
      <div className="flex-grow">
        {props.renderInput()}
      </div>
      <div className="space-x-1">
        <Button color="success" icon="bi bi-check2-square" />
        <Button color="danger" icon="bi bi-x-square" onClick={() => props.setEditMode(false)} />
      </div>
      </Form>
    </td>
  );
}

function Button({icon, ...props}) {
  return (
    <ButtonStrap size="sm" {...props}>
      <i className={icon} />
    </ButtonStrap>
  );
}