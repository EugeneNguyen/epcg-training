import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box} from '../../_components';


export default function FormTgRolePermissionAdd({fixedParams}) {
  const history = useHistory();

  const [roleId, setroleId] = useState(null);
  const [permissionId, setpermissionId] = useState(null);
  const [createdAt, setcreatedAt] = useState(null);
  const [updatedAt, setupdatedAt] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = () => {
    const data = {
      roleId,
      permissionId,
      createdAt,
      updatedAt,
      ...fixedParams,
    };
    apiAdd({variables: {data}})
      .then(() => {
        toast.success('Add completed');
        history.goBack();
      })
  }

  return (
    <Box title="Add new tgRolePermission" padding>
      <Form onSubmitParams={handleSubmit}>
        <div class="grid grid-cols-1 gap-2">
        {(!fixedParams || !fixedParams.roleId) && (
          <Input
            type="CHAR(36)"
            name="roleId"
            displayLabel="Role Id"
            value={roleId}
            onValueChange={(value) => setroleId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.permissionId) && (
          <Input
            type="CHAR(36)"
            name="permissionId"
            displayLabel="Permission Id"
            value={permissionId}
            onValueChange={(value) => setpermissionId(value)}
          />
        )}
        {(!fixedParams || !fixedParams.createdAt) && (
          <Input
            type="DATETIME"
            name="createdAt"
            displayLabel="Created At"
            value={createdAt}
            onValueChange={(value) => setcreatedAt(value)}
          />
        )}
        {(!fixedParams || !fixedParams.updatedAt) && (
          <Input
            type="DATETIME"
            name="updatedAt"
            displayLabel="Updated At"
            value={updatedAt}
            onValueChange={(value) => setupdatedAt(value)}
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
