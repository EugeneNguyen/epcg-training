import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import {Row, Col} from 'reactstrap';
import API from '../apis';
import {AlertError} from '../../../components/alert';
import {Form, Input} from '../../../components/form';

export default function ViewEtEducationProviderInfo() {
  const { id: objectId } = useParams();
  const history = useHistory();

  const [id, setid] = useState(null);
  const [name, setname] = useState(null);
  const [createdAt, setcreatedAt] = useState(null);
  const [updatedAt, setupdatedAt] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id: objectId },
      onCompleted: (response) => {
        setid(response.et_education_provider_get_by_id.id);
        setname(response.et_education_provider_get_by_id.name);
        setcreatedAt(response.et_education_provider_get_by_id.createdAt);
        setupdatedAt(response.et_education_provider_get_by_id.updatedAt);
      },
    }
  );

  if (loading) return "Loading ...";
  if (error) return "Error";
  if (!data) return "No data";

  return (
    <Row>
      <Col sm={6}>
        <Form>
          <Input
            type="text"
            name="id"
            displayLabel="Id"
            value={id}
            disabled
          />
          <Input
            type="text"
            name="name"
            displayLabel="Name"
            value={name}
            disabled
          />
          <Input
            type="text"
            name="createdAt"
            displayLabel="Created At"
            value={createdAt}
            disabled
          />
          <Input
            type="text"
            name="updatedAt"
            displayLabel="Updated At"
            value={updatedAt}
            disabled
          />
        </Form>
      </Col>
    </Row>
  );
}
