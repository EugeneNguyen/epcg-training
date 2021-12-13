import {useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Box, Button} from '../../_components';


export default function FormTgFileAdd({fixedParams, parent={}}) {
  if (parent.query) {
    return <FormAddWithParent fixedParams={fixedParams} parent={parent}/>
  }
  return <FormAdd fixedParams={fixedParams}/>
}

function FormAddWithParent({fixedParams, parent}) {
  const {data, error, loading} = useQuery(parent.query, {variables: parent.variables});
  if (loading) return null;
  if (error) return null;
  return (
    <FormAdd fixedParams={fixedParams} parent={data.data}/>
  );
}

function FormAdd({fixedParams, parent={}}) {
  const history = useHistory();

  const [service, setservice] = useState(null);
  const [key, setkey] = useState(null);
  const [originalName, setoriginalName] = useState(null);
  const [extension, setextension] = useState(null);
  const [mimeType, setmimeType] = useState(null);
  const [size, setsize] = useState(null);
  const [meta, setmeta] = useState(null);
  const [ownerUserId, setownerUserId] = useState(null);
  const [createdAt, setcreatedAt] = useState(null);
  const [updatedAt, setupdatedAt] = useState(null);

  const [apiAdd] = useMutation(API.ADD);

  const handleSubmit = (addAnother) => () => {
    const data = {
      service,
      key,
      originalName,
      extension,
      mimeType,
      size,
      meta,
      ownerUserId,
      createdAt,
      updatedAt,
      ...fixedParams,
    };
    apiAdd({variables: {data}})
      .then(() => {
        toast.success('Add completed');
        if (!addAnother) {
          history.goBack();
        }
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <Box
      title="Add new tgFile"
      padding
      footer={(
        <div class="flex space-x-2">
          <Button onClick={handleSubmit(false)}>
            Submit
          </Button>
        </div>
      )}
    >
      <Form onSubmitParams={handleSubmit(false)}>
        {(!fixedParams || !fixedParams.service) && (
          <Input
            type="VARCHAR(255)"
            name="service"
            displayLabel="Service"
            value={service}
            onValueChange={(value) => setservice(value)}
          />
        )}
        {(!fixedParams || !fixedParams.key) && (
          <Input
            type="VARCHAR(255)"
            name="key"
            displayLabel="Key"
            value={key}
            onValueChange={(value) => setkey(value)}
          />
        )}
        {(!fixedParams || !fixedParams.originalName) && (
          <Input
            type="VARCHAR(255)"
            name="originalName"
            displayLabel="Original Name"
            value={originalName}
            onValueChange={(value) => setoriginalName(value)}
          />
        )}
        {(!fixedParams || !fixedParams.extension) && (
          <Input
            type="VARCHAR(255)"
            name="extension"
            displayLabel="Extension"
            value={extension}
            onValueChange={(value) => setextension(value)}
          />
        )}
        {(!fixedParams || !fixedParams.mimeType) && (
          <Input
            type="VARCHAR(255)"
            name="mimeType"
            displayLabel="Mime Type"
            value={mimeType}
            onValueChange={(value) => setmimeType(value)}
          />
        )}
        {(!fixedParams || !fixedParams.size) && (
          <Input
            type="INT"
            name="size"
            displayLabel="Size"
            value={size}
            onValueChange={(value) => setsize(value)}
          />
        )}
        {(!fixedParams || !fixedParams.meta) && (
          <Input
            type="TEXT"
            name="meta"
            displayLabel="Meta"
            value={meta}
            onValueChange={(value) => setmeta(value)}
          />
        )}
        {(!fixedParams || !fixedParams.ownerUserId) && (
          <Input
            type="CHAR(36)"
            name="ownerUserId"
            displayLabel="Owner User Id"
            value={ownerUserId}
            onValueChange={(value) => setownerUserId(value)}
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
      </Form>
    </Box>
  );
}
