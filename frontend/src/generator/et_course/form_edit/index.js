import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

              
export default function FormEtCourseEdit({fixedParams}) {
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

  const handleSubmit = (params) => {
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
  }

  return (
    <Box title="Add new etCourse" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
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
            variables={{educationProviderId: fixedParams.educationProviderId || educationProviderId}}
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
        </div>
        <div class="flex mt-2">
          <button
            type="submit"
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Submit
          </button>
        </div>
      </Form>
    </Box>
  );
}
