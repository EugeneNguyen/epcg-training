import {gql} from "@apollo/client";

const LOGIN = gql`
mutation tg_user_login($username: String, $password: String) {
  data: tg_user_login(username: $username, password: $password)
}
`;

const CHANGE_PASSWORD = gql`
mutation tg_user_change_password($token: String, $currentPassword: String, $newPassword: String) {
  data: tg_user_change_password(token: $token, currentPassword: $currentPassword, newPassword: $newPassword) {
    id
  }
}
`;

export default {
  LOGIN,
  CHANGE_PASSWORD,
};
