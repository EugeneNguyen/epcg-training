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
  const [education_provider_id, seteducation_provider_id] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setname(response.et_course_template_get_by_id.name);
        seteducation_provider_id(response.et_course_template_get_by_id.education_provider_id);
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
        name="education_provider_id"
        displayLabel="Education Provider Id"
        value={education_provider_id}
        onChange={(event) => seteducation_provider_id(event.target.value)}
      />
      <button type="submit" class="btn btn-primary">Submit</button>
    </Form>
  );
}
