import {gql} from "@apollo/client";

const GET_EXAM_BY_ID = gql`
query Et_course_exam_get_by_id($id: String, $token: String) {
  data: et_course_exam_get_by_id(id: $id) {
    id
    course {
      id
      enrolls(where: {isCourseAdmin: false}) {
        id
        user {
          id
          username
          name
          examAttempts(where: {examId: $id}) {
            id
            score
            startTime
            endTime
          }
        }
      }
    }
  }
  me(token: $token) {
    id
    coursesLink(where: {isCourseAdmin: true}) {
      id
      courseId
    }
  }
}
`;

export default {
  GET_EXAM_BY_ID,
};
