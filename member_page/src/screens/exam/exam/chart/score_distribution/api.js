import {gql} from "@apollo/client";

const GET_EXAM_BY_ID = gql`
query Et_course_exam_get_by_id($id: String, $token: String) {
  data: et_course_exam_get_by_id(id: $id) {
    attempts(where: {examId: $id}) {
      id
      score
      startTime
      endTime
    }
  }
  allAttempts: et_course_exam_get_by_id(id: $id) {
    id
    courseTemplateExam {
      id
      attempts {
        id
        score
      }
    }
  }
  me(token: $token) {
    id
    examAttempts(where: {examId: $id}) {
      id
      score
    }
  }
}
`;

export default {
  GET_EXAM_BY_ID,
};
