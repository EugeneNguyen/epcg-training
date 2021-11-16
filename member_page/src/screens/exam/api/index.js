import {gql} from "@apollo/client";

const GET_EXAM_BY_ID = gql`
query Query($id: String) {
  data: et_course_exam_get_by_id(id: $id) {
    id
    name
    courseTemplateExamId
  }
}
`;

const DEFAULT_OPTIONS = {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-and-network',
  errorPolicy: 'all',
}

export default {
  GET_EXAM_BY_ID,
  DEFAULT_OPTIONS,
};
