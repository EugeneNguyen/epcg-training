import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import { Alert } from 'reactstrap';
import API from '../apis';
import {Form, Input} from '../../../components/form';

export default function FormEtEducationProviderAdd() {
  const history = useHistory();
  const [apiAdd, { data, loading, error }] = useMutation(API.ADD, {
    onCompleted: () => {
      toast.success('Add completed');
      history.push('/etEducationProvider');
    }
  });

  const handleSubmit = (params) => {
    apiAdd({ variables: { data: params } });
  }

  return (
    <>
      {error && <Alert color="danger">{error}</Alert>}
      <Form onSubmitParams={handleSubmit}>
        <Input
          type="text"
          name="name"
          displayLabel="Name"
        />
      <button type="submit" class="btn btn-primary">Submit</button>
    </Form>
    </>
  );
}