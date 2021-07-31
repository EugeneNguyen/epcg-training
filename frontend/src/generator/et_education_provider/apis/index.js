import {gql} from "@apollo/client";

const GET_etEducationProvider = gql`
query ExampleQuery {
  et_education_provider_get_all {
      id
      name
      createdAt
      updatedAt
  }
}
`;

export {
  GET_etEducationProvider,
};
