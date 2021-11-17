import {useState} from 'react';
import {useMutation} from "@apollo/client";
import {toast} from 'react-toastify';
import API from '../apis';
import {Button} from '../../_components/button';
import {Modal} from '../../_components';

export default function ButtonDelete({id, didDelete, children, ...props}) {
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
      <Button onClick={() => setModal(true)} {...props}>{children}</Button>
      <Modal
        show={modal}
        title="Warning"
        description="This action cannot be undone. Are you sure to delete it?"
        buttons={[
          {title: "Yes, delete it", onClick: () => apiDelete(), color: "danger"},
          {title: "No, cancel", onClick: () => setModal(false), outline: true},
        ]}
      />
    </>
  );
}
