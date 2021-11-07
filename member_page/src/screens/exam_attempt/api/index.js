import {gql} from "@apollo/client";

const GET_BY_ID = gql`
query et_exam_attempt_get_by_id($id: String) {
  data: et_exam_attempt_get_by_id(id: $id) {
    id
    userId
    templateExam {
      id
      name
      numberOfQuestion
    }
    duration
    startTime
    endTime
  }
}
`;

const GET_BY_ID_WITH_QUESTION = gql`
query et_exam_attempt_get_by_id($id: String) {
  data: et_exam_attempt_get_by_id(id: $id) {
    id
    userId
    templateExam {
      id
      name
      numberOfQuestion
    }
    questions {
      id
      order
      displayedQuestionData
      rawAnswer
    }
    duration
    startTime
    endTime
  }
}
`;

const GET_RESULT = gql`
query et_exam_attempt_get_by_id($id: String) {
  data: et_exam_attempt_get_by_id(id: $id) {
    id
    userId
    templateExam {
      id
      name
      numberOfQuestion
    }
    questions {
      id
      order
      fullQuestionData
      rawAnswer
      correct
    }
    duration
    startTime
    endTime
  }
}
`;

const ANSWER_WITH_ID = gql`
mutation manual_exam_attempt_answer($id: String, $rawAnswer: String) {
  data: manual_exam_attempt_answer(id: $id, rawAnswer: $rawAnswer) {
    id
    rawAnswer
  }
}
`;

const START_ATTEMPT = gql`
mutation manual_exam_attempt_start($id: String) {
  data: manual_exam_attempt_start(id: $id)
}
`;
const END_ATTEMPT = gql`
mutation manual_exam_attempt_answer($id: String) {
  data: manual_exam_attempt_answer(id: $id)
}
`;

const DEFAULT_OPTIONS = {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-and-network',
  errorPolicy: 'all',
}

export default {
  GET_BY_ID,
  GET_BY_ID_WITH_QUESTION,
  GET_RESULT,
  START_ATTEMPT,
  END_ATTEMPT,
  ANSWER_WITH_ID,
  DEFAULT_OPTIONS,
};
