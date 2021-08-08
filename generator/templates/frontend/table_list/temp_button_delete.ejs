import {useState} from 'react';
import {useMutation} from "@apollo/client";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import API from '../apis';
import {toast} from 'react-toastify';

export default function ButtonDelete({id, didDelete, ...props}) {
  const [modal, setModal] = useState(false);
  const [apiDelete, { data, loading, error }] = useMutation(API.DELETE, {
    onCompleted: () => {
      setModal(false);
      toast.success('Delete completed');
      didDelete && didDelete();
    },
    variables: {id}
  });

  return (
    <>
      <Button onClick={() => setModal(true)} {...props}>Delete</Button>
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>Warning</ModalHeader>
        <ModalBody>
          This action cannot be undone. Are you sure to delete it?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={apiDelete}>Yes, delete it</Button>{' '}
          <Button color="secondary" onClick={() => setModal(false)}>No, cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
