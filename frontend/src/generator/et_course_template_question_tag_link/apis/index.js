import {gql} from "@apollo/client";

const ALL = gql`
query et_course_template_question_tag_link_get_all($where: EtCourseTemplateQuestionTagLinkWhere) {
  data: et_course_template_question_tag_link_get_all(where: $where) {
    id
    questionId
    questionTagId
    createdAt
    updatedAt
  }
}
`;

const ALL_WITH_PAGE = gql`
query et_course_template_question_tag_link_get_all_with_page($pagination: EtCourseTemplateQuestionTagLinkPaginationInput, $where: EtCourseTemplateQuestionTagLinkWhere) {
  data: et_course_template_question_tag_link_get_all_with_page(pagination: $pagination, where: $where) {
    rows {
      id
      question {
        id
        questionCode
      }
      questionId
      tag {
        id
        name
      }
      questionTagId
      createdAt
      updatedAt
    }
    pagination {
      total
      offset
      limit
    }
  }
}
`;

const GET_BY_ID = gql`
query et_course_template_question_tag_link_get_by_id($id: String) {
  data: et_course_template_question_tag_link_get_by_id(id: $id) {
    id
    question {
      id
      questionCode
    }
    questionId
    tag {
      id
      name
    }
    questionTagId
    createdAt
    updatedAt
  }
}
`;


const ADD = gql`
mutation et_course_template_question_tag_link_add($data: EtCourseTemplateQuestionTagLinkInput) {
  et_course_template_question_tag_link_add(data: $data) {
    id
    questionId
    questionTagId
    createdAt
    updatedAt
  }
}
`;

const EDIT = gql`
mutation et_course_template_question_tag_link_edit($id: String, $data: EtCourseTemplateQuestionTagLinkInput) {
  et_course_template_question_tag_link_edit(id: $id, data: $data) {
    id
    questionId
    questionTagId
    createdAt
    updatedAt
  }
}
`;

const DELETE = gql`
mutation et_course_template_question_tag_link_delete($id: String) {
  et_course_template_question_tag_link_delete(id: $id)
}
`;

const DEFAULT_OPTIONS = {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-and-network',
  errorPolicy: 'all',
}

export default {
  ALL,
  ALL_WITH_PAGE,
  GET_BY_ID,
  ADD,
  EDIT,
  DELETE,
  DEFAULT_OPTIONS,
};
