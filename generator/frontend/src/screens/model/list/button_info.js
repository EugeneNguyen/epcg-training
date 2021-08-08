import API from '../../../apis';
import {useMutation} from "@apollo/client";

export default function ButtonInfo({model}) {
  const [fetch] = useMutation(API.model.INFO, {
    onCompleted: () => alert("Done"),
    variables: {
      model
    }
  });

  return (
    <button type="button" className="btn btn-primary btn-sm" onClick={() => fetch()}>
      Get info
    </button>
  )
}