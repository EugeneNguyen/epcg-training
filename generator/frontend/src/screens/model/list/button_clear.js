import API from '../../../apis';
import {useMutation} from "@apollo/client";

export default function ButtonClear() {
  const [clear] = useMutation(API.model.CLEAR, {
    onCompleted: () => alert("Done"),
  });

  return (
    <button type="button" className="btn btn-danger" onClick={() => clear()}>
      Clear
    </button>
  )
}