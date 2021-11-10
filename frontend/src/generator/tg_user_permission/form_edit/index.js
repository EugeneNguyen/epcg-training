import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';

          
export default function FormTgUserPermissionEdit({fixedParams}) {
  const id = useParams().selectedObjectId;
  const history = useHistory();

  const [userId, setuserId] = useState(null);
  const [permissionId, setpermissionId] = useState(null);

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setuserId(response.data.userId);
        setpermissionId(response.data.permissionId);

      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = (params) => {
    const data = {
      userId,
      permissionId,
      ...fixedParams,
    };
    editApi({ variables: { id, data } })
      .then(() => {
        toast.success('Edit completed');
        history.goBack();
      })
  }

  return (
    <Box title="Add new tgUserPermission" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {(!fixedParams || !fixedParams.userId) && (
          <Input
            type="SELECT"
            query={require('../../tg_user/apis').default.ALL}
            idKey="id"
            labelKey="username"
            name="userId"
            displayLabel="User"
            value={userId}
            onValueChange={(value) => setuserId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.permissionId) && (
          <Input
            type="SELECT"
            query={require('../../tg_permission/apis').default.ALL}
            idKey="id"
            labelKey="name"
            name="permissionId"
            displayLabel="Permission"
            value={permissionId}
            onValueChange={(value) => setpermissionId(value)}
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
