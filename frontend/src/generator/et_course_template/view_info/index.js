import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import {Row, Col} from 'reactstrap';
import API from '../apis';
import {AlertError} from '../../../components/alert';
import {Form, Input} from '../../../components/form';

export default function ViewEtCourseTemplateInfo() {
  const { id: objectId } = useParams();
  const history = useHistory();

  const [id, setid] = useState(null);
  const [name, setname] = useState(null);
  const [education_provider_id, seteducation_provider_id] = useState(null);
  const [createdAt, setcreatedAt] = useState(null);
  const [updatedAt, setupdatedAt] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id: objectId },
      onCompleted: (response) => {
        setid(response.et_course_template_get_by_id.id);
        setname(response.et_course_template_get_by_id.name);
        seteducation_provider_id(response.et_course_template_get_by_id.education_provider_id);
        setcreatedAt(response.et_course_template_get_by_id.createdAt);
        setupdatedAt(response.et_course_template_get_by_id.updatedAt);
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
            name="education_provider_id"
            displayLabel="Education Provider Id"
            value={education_provider_id}
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
