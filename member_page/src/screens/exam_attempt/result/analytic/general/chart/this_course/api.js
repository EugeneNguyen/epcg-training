import {gql} from "@apollo/client";

const GET_ATTEMPT_BY_ID = gql`
query Et_exam_attempt_get_by_id($id: String) {
  data: et_exam_attempt_get_by_id(id: $id) {
    id
    exam {
      id
      course {
        id
        enrolls {
          id
          user {
            id
            username
            name
            examAttempts {
              id
              examId
              questions {
                id
                order
                answer
                correct
              }
            }
          }
        }
      }
    }
  }
}
`;

export default {
  GET_ATTEMPT_BY_ID,
};
