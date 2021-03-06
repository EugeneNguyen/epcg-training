import {gql} from "@apollo/client";

const GET_EXAM = gql`
query Et_course_exam_get_all($where: EtCourseExamWhere, $token: String) {
  data: et_course_exam_get_all(where: $where) {
    id
    name
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
      score
      endTime
    }
  }
}
`;

export default {
  GET_EXAM,
};
