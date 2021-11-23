import Form from '../../../generator/_components/form/form';
import {useMutation} from "@apollo/client";
import API from "../apis";
import AuthHelper from '../helper'
import {toast} from "react-toastify";

export default function LoginScreen() {
  const [apiLogin, {data, loading, error}] = useMutation(API.LOGIN, {
    onCompleted: (data) => {
      AuthHelper.saveToken(data.data);
      toast.success('Login successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <Box title="Update password">
      <Form>

      </Form>
    </Box>
  )
}