import {useQuery} from "@apollo/client";
import { GET_etEducationProvider } from '../apis';

function Table_etEducationProviderList() {
  const { loading, error, data } = useQuery(GET_etEducationProvider);

  if (!data) {
    return (
      <div>
        Loading ...
      </div>
    );
  }

  const items = data.et_education_provider_get_all;
  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">name</th>
        <th scope="col">createdAt</th>
        <th scope="col">updatedAt</th>
      </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table_etEducationProviderList;
