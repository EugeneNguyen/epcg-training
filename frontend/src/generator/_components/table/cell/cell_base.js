import {useState} from 'react';
import {useMutation} from "@apollo/client";
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import Form from '../../form/form';
import {Button} from '../../button';
import classNames from "classnames";

CellBase.propTypes = {
  editable: PropTypes.bool,
  renderDisplay: PropTypes.func,
  renderInput: PropTypes.func,
  size: PropTypes.number,

  id: PropTypes.string,
  valueKey: PropTypes.string,
  mutation: PropTypes.any,
  onCompleted: PropTypes.func,
};

CellBase.defaultProps = {
  size: 40,
}

export default function CellBase(props) {
  const [hover, setHover] = useState(false);
  const [editMode, setEditMode] = useState(false);

  if (!hover || !props.editable) {
    return (
      <td
        onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)}
        className={classNames(`px-6 py-4 w-${props.size} truncate`)}
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
        className={classNames(`px-6 py-4 w-${props.size} truncate`)}
      >
        <div className="flex flex-wrap justify-between">
          {props.renderDisplay()}
          <Button onClick={() => setEditMode(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </Button>
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
    <td className={classNames(`px-6 py-4 w-${props.size} truncate`)}>
      <Form onSubmitParams={(params) => edit({variables: {id: props.id, data: params}})}>
        <div className="flex flex-wrap space-x-1 items-center">
          <div className="flex-grow">
            {props.renderInput()}
          </div>
          <div className="space-x-1">
            <Button color="success">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
              </svg>
            </Button>
            <Button color="danger" onClick={() => props.setEditMode(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </Button>
          </div>
        </div>
      </Form>
    </td>
  );
}
