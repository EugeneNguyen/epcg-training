import API from '../../../apis';
import {useMutation} from "@apollo/client";

export default function ButtonFetch() {
  const [fetch] = useMutation(API.model.FETCH, {
    onCompleted: () => alert("Done"),
  });

  return (
    <button type="button" className="btn btn-primary" onClick={() => fetch()}>
      Fetch
    </button>
  )
}