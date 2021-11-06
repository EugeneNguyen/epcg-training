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
      questionData
    }
    duration
    startTime
    endTime
  }
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
  DEFAULT_OPTIONS,
};
