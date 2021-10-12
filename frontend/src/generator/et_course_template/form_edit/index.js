import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

export default function FormEtCourseTemplateEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [name, setname] = useState(null);
  const [educationProviderId, seteducationProviderId] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setname(response.data.name);
        seteducationProviderId(response.data.educationProviderId);

      },
    }
  );
  const [editApi] = useMutation(API.EDIT, {
    onCompleted: () => {
      toast.success('Edit completed');
      history.goBack();
    }
  });

  const handleSubmit = (params) => {
    editApi({ variables: { id, data: params } });
  }

  return (
    <Box title="Add new etCourseTemplate" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {fixedParams && fixedParams.name ? (
          <Input type="HIDDEN" name="name" value={fixedParams.name} />
        ) : (
          <Input
            type="VARCHAR(255)"
            name="name"
            displayLabel="Name"
            value={name}
            onValueChange={(value) => setname(value)}
          />
        )}
        {fixedParams && fixedParams.educationProviderId ? (
          <Input type="HIDDEN" name="educationProviderId" value={fixedParams.educationProviderId} />
        ) : (
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
