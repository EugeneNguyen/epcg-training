import API from '../../../apis';
import {useMutation} from "@apollo/client";
import {toast} from 'react-toastify';

export default function ButtonClear() {
  const [clear] = useMutation(API.model.CLEAR, {
    onCompleted: () => toast.success("Done"),
  });

  return (
    <button type="button" className="btn btn-danger" onClick={() => clear()}>
      Clear
    </button>
  )
}