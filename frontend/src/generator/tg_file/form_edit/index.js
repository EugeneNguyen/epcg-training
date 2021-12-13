import {useMutation, useQuery} from "@apollo/client";
import {useParams, useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import API from '../apis';
import {Form, Input} from '../../_components/form';
import {Button} from '../../_components/button';
import {Box} from '../../_components';

                      
export default function FormTgFileEdit({fixedParams, parent={}}) {
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

  const { loading, error, data, refetch } = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: { id },
      onCompleted: (response) => {
        setservice(response.data.service);
        setkey(response.data.key);
        setoriginalName(response.data.originalName);
        setextension(response.data.extension);
        setmimeType(response.data.mimeType);
        setsize(response.data.size);
        setmeta(response.data.meta);
        setownerUserId(response.data.ownerUserId);
        setcreatedAt(response.data.createdAt);
        setupdatedAt(response.data.updatedAt);

      },
    }
  );

  const [editApi] = useMutation(API.EDIT);

  const handleSubmit = () => {
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
    editApi({ variables: { id, data } })
      .then(() => {
        toast.success('Edit completed');
        history.goBack();
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <Box
      title="Edit tgFile"
      padding
      footer={(
        <Button onClick={handleSubmit}>
          Update
        </Button>
      )}
    >
      <Form onSubmitParams={handleSubmit}>
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
