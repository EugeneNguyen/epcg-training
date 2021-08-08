import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../../components/form';

export default function FormEtCourseTemplateEdit() {
  const { id } = useParams();
  const history = useHistory();

  const [name, setname] = useState(null);
  const [educationProviderId, seteducationProviderId] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setname(response.et_course_template_get_by_id.name);
        seteducationProviderId(response.et_course_template_get_by_id.educationProviderId);
      },
    }
  );
  const [edit] = useMutation(API.EDIT, {
    onCompleted: () => {
      toast.success('Edit completed');
      history.push('/etCourseTemplate');
    }
  });

  if (loading) return "Loading ...";
  if (error) return "Error";
  if (!data) return "No data";

  return (
    <Form onSubmitParams={(params) => edit({ variables: { id, data: params } })}>
      <Input
        type="text"
        name="name"
        displayLabel="Name"
        value={name}
        onChange={(event) => setname(event.target.value)}
      />
      <Input
        type="text"
        name="educationProviderId"
        displayLabel="Education Provider"
        value={educationProviderId}
        onChange={(event) => seteducationProviderId(event.target.value)}
      />
      <button type="submit" class="btn btn-primary">Submit</button>
    </Form>
  );
}
