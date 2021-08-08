import API from '../../../apis';
import {useMutation} from "@apollo/client";

export default function ButtonConsolidate({model}) {
  const [consolidate] = useMutation(API.model.CONSOLIDATE, {
    onCompleted: () => alert("Done"),
    variables: {
      model
    }
  });

  return (
    <button type="button" className="btn btn-primary btn-sm" onClick={() => consolidate()}>
      Consolidate
    </button>
  )
}