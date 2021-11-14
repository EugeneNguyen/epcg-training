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

const DEFAULT_OPTIONS = {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-and-network',
  errorPolicy: 'all',
}

export default {
  GET_COURSE,
  DEFAULT_OPTIONS,
};
