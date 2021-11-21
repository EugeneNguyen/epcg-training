import {gql} from "@apollo/client";

const GET_EXAM = gql`
query Et_course_exam_get_all($where: EtCourseExamWhere, $token) {
  data: et_course_exam_get_all(where: $where) {
    name
    id
    courseTemplateExam {
      id
      duration
      numberOfQuestion
      unlimitedTime
    }
  }
  me(token: $token) {
    id
    examAttempts {
      id
      templateExamId
      questions {
        id
        correct
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
  GET_EXAM,
  DEFAULT_OPTIONS,
};
