import {gql} from "@apollo/client";

const GET_COURSE = gql`
query me($token: String) {
  data: me(token: $token) {
    id
    coursesLink {
      id
      course {
        id
        name
      }
    }
  }
}
`;

export default {
  GET_COURSE,
};
