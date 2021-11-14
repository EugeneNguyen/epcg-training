import {Box} from "../../../../generator/_components";
import {useMutation, useQuery} from "@apollo/client";
import {useHistory, useParams} from "react-router-dom";
import API from "./api";
import _ from "lodash";
import {Button} from "../../../../generator/_components/button";
import AuthHelper from "../../../auth/helper";

export default function ExamInfoBox() {
  const {id} = useParams();
  const history = useHistory();
  const {data, loading, error} = useQuery(
    API.GET_EXAM,
    {
      ...API.DEFAULT_OPTIONS,
      variables: {id},
    },
  );

  const [createAttempt] = useMutation(API.CREATE_ATTEMPT);

  if (loading) {
    return <Box title="Exam Information" padding>Loading</Box>;
  }

  if (error) {
    return <Box title="Exam Information" padding>{error.message}</Box>;
  }

  if (!data) {
    return <Box title="Exam Information" padding>No Data</Box>;
  }

  return (
    <div className="space-y-2">
      <Box
        title="Exam Information"
        footer={
          <Button
            onClick={() => {
              createAttempt({variables: {token: AuthHelper.token(), id: _.get(data, 'data.courseTemplateExam.id')}})
                .then(({data}) => history.push(`/exam/attempt/${data.data.id}`));
            }}
          >
            Start new Attempt
          </Button>
        }
      >
        <Item label="Name" value={_.get(data, 'data.name')}/>
        <Item label="Duration (min)" value={_.get(data, 'data.courseTemplateExam.duration')}/>
        <Item label="Number of Question" value={_.get(data, 'data.courseTemplateExam.numberOfQuestion')}/>
      </Box>
    </div>
  );
}

function Item({label, value}) {
  return (
    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );
}