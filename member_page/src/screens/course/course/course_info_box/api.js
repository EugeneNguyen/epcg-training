import {gql} from "@apollo/client";

const GET_EXAM = gql`
query Et_course_exam_get_all($token: String, $id: String) {
  me(token: $token) {
    id
    examAttempts(where: {examId: $id}) {
      id
      templateExamId
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
