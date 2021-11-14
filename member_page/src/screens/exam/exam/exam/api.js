import {gql} from "@apollo/client";

const GET_EXAM = gql`
query Et_course_exam_get_by_id($id: String) {
  data: et_course_exam_get_by_id(id: $id) {
    id
    name
    courseTemplateExam {
      id
      name
      duration
      numberOfQuestion
    }
  }
}
`;

const CREATE_ATTEMPT = gql`
mutation Mutation($id: String, $token: String) {
  data: manual_create_attempt_from_course_template_exam(course_template_exam_id: $id, token: $token) {
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
  GET_EXAM,
  CREATE_ATTEMPT,
  DEFAULT_OPTIONS,
};
