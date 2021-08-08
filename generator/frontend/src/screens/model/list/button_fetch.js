import API from '../../../apis';
import {useMutation} from "@apollo/client";
import {toast} from 'react-toastify';

export default function ButtonFetch() {
  const [fetch] = useMutation(API.model.FETCH, {
    onCompleted: () => toast.success("Done"),
  });

  return (
    <button type="button" className="btn btn-primary" onClick={() => fetch()}>
      Fetch
    </button>
  )
}