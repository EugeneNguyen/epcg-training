import {gql} from "@apollo/client";

const GET_EXAM = gql`
query Et_course_exam_get_all($token: String) {
  me(token: $token) {
    id
    examAttempts {
      id
      templateExamId
      exam {
        id
        courseId
      }
      score
      endTime
      questionsCount
      correctCount: questionsCount(where: {correct: true})
    }
  }
}
`;

export default {
  GET_EXAM,
};
