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

const DEFAULT_OPTIONS = {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-and-network',
  errorPolicy: 'all',
}

export default {
  GET_EXAM,
  DEFAULT_OPTIONS,
};
