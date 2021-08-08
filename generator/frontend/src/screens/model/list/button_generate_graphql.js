import API from '../../../apis';
import {useMutation} from "@apollo/client";

export default function ButtonGenerateGraphql({model}) {
  const [generateGraphql] = useMutation(API.model.GENERATE_GRAPHQL, {
    onCompleted: () => alert("Done"),
    variables: {
      model
    }
  });

  return (
    <button type="button" className="btn btn-primary btn-sm" onClick={() => generateGraphql()}>
      Generate GraphQL
    </button>
  )
}