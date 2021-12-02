import {gql} from "@apollo/client";

const GET_ATTEMPT_QUESTION_BY_QUESTION_ID = gql`
query Et_exam_attempt_question_get_all($questionId: String) {
  data: et_exam_attempt_question_get_all(where: {questionId: $questionId}) {
    id
    answer
    correct
  }
}
`;

export default {
  GET_ATTEMPT_QUESTION_BY_QUESTION_ID,
};
