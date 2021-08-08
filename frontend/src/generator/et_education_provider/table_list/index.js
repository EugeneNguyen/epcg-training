import {useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import {Button, Table} from 'reactstrap';
import API from '../apis';
import {AlertError} from '../../../components/alert';
import {ButtonLink} from '../../../components/button';
import Cell from '../../../components/table/cell';
import ButtonDelete from './button_delete';

export default function TableEtEducationProviderList() {
  const { loading, error, data, refetch } = useQuery(API.ALL, API.DEFAULT_OPTIONS);

  return (
    <>
      {error && <AlertError error={error} refetch={refetch} />}
      <Button onClick={refetch} size="sm" color="primary">Reload</Button>
      {' '}
      <ButtonLink to="/etEducationProvider/add" size="sm" color="primary">Add</ButtonLink>

      <Table>
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Created At</th>
          <th scope="col">Updated At</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
          {data && data.et_education_provider_get_all.map(item => (
            <tr>
              <Cell
                type="CHAR(36)"
                link={`/etEducationProvider/${item.id}`}
              >
                {item.id}
              </Cell>
              <Cell
                type="VARCHAR(255)"
              >
                {item.name}
              </Cell>
              <Cell
                type="DATETIME"
                dateFormat="lll"
              >
                {item.createdAt}
              </Cell>
              <Cell
                type="DATETIME"
                dateFormat="lll"
              >
                {item.updatedAt}
              </Cell>
              <td>
                <ButtonLink to={`/etEducationProvider/${item.id}/edit`} color="primary" size="sm">Edit</ButtonLink>
                {' '}
                <ButtonDelete id={item.id} didDelete={refetch} color="danger" size="sm">Delete</ButtonDelete>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
