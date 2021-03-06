import {gql} from "@apollo/client";

const GET_ATTEMPTS = gql`
query Me($token: String, $where: EtExamAttemptWhere) {
  data: me(token: $token) {
    id
    examAttempts(where: $where) {
      id
      startTime
      endTime
      templateExam {
        id
        name
      }
      score
    }
  }
}
`;

const CREATE_ATTEMPT = gql`
mutation Mutation($examId: String, $token: String) {
  data: manual_create_attempt_from_course_template_exam(examId: $examId, token: $token) {
    id
  }
}
`;

const DEFAULT_OPTIONS = {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-and-network',
  errorPolicy: 'all',
}

export default {
  GET_ATTEMPTS,
  CREATE_ATTEMPT,
  DEFAULT_OPTIONS,
};
