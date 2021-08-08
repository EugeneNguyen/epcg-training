import {gql} from "@apollo/client";

const GET_ALL = gql`
  query model_get_all {
    model_get_all {
      name
    }
  }
`;

const CLEAR = gql`
mutation Model_clearMutation {
  model_clear {
    name
  }
}
`

const FETCH = gql`
mutation Model_fetchMutation {
  model_fetch {
    name
  }
}
`

const INFO = gql`
mutation Model_infoMutation($model: String) {
  model_info(model: $model) {
    name
  }
}
`

const CONSOLIDATE = gql`
mutation Model_consolidateMutation($model: String) {
  model_consolidate(model: $model) {
    name
  }
}
`

const GENERATE_FRONTEND = gql`
mutation Model_generate_frontendMutation($model: String) {
  model_generate_frontend(model: $model) {
    name
  }
}
`

const GENERATE_GRAPHQL = gql`
mutation Model_generate_graphqlMutation($model: String) {
  model_generate_graphql(model: $model) {
    name
  }
}
`

export default {
  GET_ALL,
  CLEAR,
  FETCH,
  INFO,
  CONSOLIDATE,
  GENERATE_FRONTEND,
  GENERATE_GRAPHQL,
};
