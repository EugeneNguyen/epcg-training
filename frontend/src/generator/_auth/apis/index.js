import {gql} from "@apollo/client";

const LOGIN = gql`
mutation tg_user_login($username: String, $password: String) {
  data: tg_user_login(username: $username, password: $password)
}
`;


export default {
  LOGIN,
};
