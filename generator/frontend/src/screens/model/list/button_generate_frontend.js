import API from '../../../apis';
import {useMutation} from "@apollo/client";

export default function ButtonGenerateFrontend({model}) {
  const [generateFrontend] = useMutation(API.model.GENERATE_FRONTEND, {
    onCompleted: () => alert("Done"),
    variables: {
      model
    }
  });

  return (
    <button type="button" className="btn btn-primary btn-sm" onClick={() => generateFrontend()}>
      Generate Frontend
    </button>
  )
}