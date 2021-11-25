import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

              
export default function FormEtCourseEdit({fixedParams, parent={}}) {
  if (parent.query) {
    return <FormEditWithParent fixedParams={fixedParams} parent={parent}/>
  }
  return <FormEdit fixedParams={fixedParams}/>
}

function FormEditWithParent({fixedParams, parent}) {
  const {data, error, loading} = useQuery(parent.query, {variables: parent.variables});
  if (loading) return null;
  if (error) return null;
  return (
    <FormEdit fixedParams={fixedParams} parent={data.data}/>
  );
}

function FormEdit({fixedParams, parent={}}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [name, setname] = useState(null);
  const [educationProviderId, seteducationProviderId] = useState(null);
  const [courseTemplateId, setcourseTemplateId] = useState(null);
  const [isPrivateCourse, setisPrivateCourse] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setname(response.data.name);
        seteducationProviderId(response.data.educationProviderId);
        setcourseTemplateId(response.data.courseTemplateId);
        setisPrivateCourse(response.data.isPrivateCourse);

      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
    const data = {
      name,
      educationProviderId,
      courseTemplateId,
      isPrivateCourse,
      ...fixedParams,
    };
    editApi({ variables: { id, data } })
      .then(() => {
        toast.success('Edit completed');
        history.goBack();
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <Box
      title="Edit etCourse"
      padding
      footer={(
        <Button onClick={handleSubmit}>
          Update
        </Button>
      )}
    >
      <Form onSubmitParams={handleSubmit}>
        {(!fixedParams || !fixedParams.name) && (
          <Input
            type="VARCHAR(255)"
            name="name"
            displayLabel="Name"
            value={name}
            onValueChange={(value) => setname(value)}
          />
        )}
        {(!fixedParams || !fixedParams.educationProviderId) && (
          <Input
            type="SELECT"
            query={require('../../et_education_provider/apis').default.ALL}
            idKey="id"
            labelKey="name"
            name="educationProviderId"
            displayLabel="Education Provider"
            value={educationProviderId}
            onValueChange={(value) => seteducationProviderId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.courseTemplateId) && (
          <Input
            type="SELECT"
            query={require('../../et_course_template/apis').default.ALL}
            idKey="id"
            labelKey="name"
            name="courseTemplateId"
            displayLabel="Course Template"
            value={courseTemplateId}
            onValueChange={(value) => setcourseTemplateId(value)}
            variables={{educationProviderId: fixedParams.educationProviderId}}
          />
        )}
        {(!fixedParams || !fixedParams.isPrivateCourse) && (
          <Input
            type="TINYINT(1)"
            name="isPrivateCourse"
            displayLabel="Is Private Course"
            value={isPrivateCourse}
            onValueChange={(value) => setisPrivateCourse(value)}
          />
        )}
      </Form>
    </Box>
  );
}
