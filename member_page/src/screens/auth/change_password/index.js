import Form from '../../../generator/_components/form/form';
import {useMutation} from "@apollo/client";
import API from "../apis";
import AuthHelper from '../helper'
import {toast} from "react-toastify";
import InputText from "../../../generator/_components/form/input_text";
import {useState} from "react";
import {Box, Button} from "../../../generator/_components";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [apiChangePassword] = useMutation(API.CHANGE_PASSWORD);

  const handleSubmit = () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New Password and Confirm New Password must be matched");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("Current Password and New Password must be different");
      return;
    }

    const data = {
      token: AuthHelper.token(),
      currentPassword,
      newPassword,
    };

    apiChangePassword({ variables: data })
      .then(() => {
        toast.success("Password changed. Request re-login");
        AuthHelper.removeToken();
      })
      .catch((error) => toast.error(error.message));
  }

  return (
    <Box
      title="Update password"
      padding
      footer={(
        <Button onClick={handleSubmit}>
          Change Password
        </Button>
      )}
    >
      <Form onSubmitParams={handleSubmit}>
        <InputText type="password" displayLabel="Current Password" value={currentPassword} onValueChange={setCurrentPassword}/>
        <InputText type="password" displayLabel="New Password" value={newPassword} onValueChange={setNewPassword}/>
        <InputText type="password" displayLabel="Confirm New Password" value={confirmNewPassword} onValueChange={setConfirmNewPassword}/>
      </Form>
    </Box>
  )
}