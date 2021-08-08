import Header from "../../../components/header";
import {useQuery} from "@apollo/client";
import API from '../../../apis';
import ButtonClear from "./button_clear";
import ButtonFetch from "./button_fetch";
import ButtonInfo from "./button_info";
import ButtonConsolidate from "./button_consolidate";
import ButtonGenerateGraphql from "./button_generate_graphql";
import ButtonGenerateFrontend from "./button_generate_frontend";

function ModelList() {

  const {loading, error, data} = useQuery(API.model.GET_ALL);

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <>
      <p>Error</p>
      <ButtonFetch/>
    </>
  );

  return (
    <>
      <div className="btn-group" role="group">
        <ButtonFetch/>
        <ButtonClear/>
      </div>
      <table className="table table-bordered">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        {data.model_get_all.map(model => (
          <tr>
            <th scope="row">{model.name}</th>
            <td>
              <div className="btn-group" role="group">
                <ButtonInfo model={model.name}/>
                <ButtonConsolidate model={model.name}/>
                <ButtonGenerateFrontend model={model.name}/>
                <ButtonGenerateGraphql model={model.name}/>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}

export default ModelList;
