import {gql} from "@apollo/client";

const GET_ATTEMPT_BY_ID = gql`
query Et_course_exam_get_by_id($id: String) {
  data: et_course_exam_get_by_id(id: $id) {
    id
    courseId
    courseTemplateExamId
  }
}
`;

const GET_COURSE_BY_ID = gql`
query Et_course_get_by_id($courseId: String, $courseTemplateExamId: String) {
  data: et_course_get_by_id(id: $courseId) {
    id
    enrolls {
      id
      user {
        id
        username
        name
        examAttempts(where: {templateExamId: $courseTemplateExamId}) {
          id
          numCorrect: questionsCount(where: {correct: true})
          numQuestion: questionsCount
          startTime
          endTime
        }
      }
    }
  }
}
`;

export default {
  GET_ATTEMPT_BY_ID,
  GET_COURSE_BY_ID,
};
