import {useParams} from "react-router-dom";
import API from "../api";
import {useQuery} from "@apollo/client";
import {Box, ButtonLink} from "../../../components";
import _ from "lodash";

export default function ScreenExamAttemptInfo() {
  const id = useParams().id;

  const {data} = useQuery(
    API.GET_BY_ID,
    {
      ...API.DEFAULT_OPTIONS,
      variables: {
        id,
      },
    },
  );

  return data ? (
    <div className="space-y-2">
      <Box title="Exam Attempt Information" padding>
        <dl className="m-0">
          <InfoItem title="Exam" value={_.get(data, 'data.templateExam.name', 'N/A')}/>
          <InfoItem title="Number of Questions" value={_.get(data, 'data.templateExam.numberOfQuestion', 'N/A')} odd/>
          <InfoItem title="Duration (min)" value={_.get(data, 'data.duration', 'N/A')}/>
        </dl>
      </Box>
      <div>
        <ButtonLink to={`/exam/attempt/${id}/take`}>
          Start test
        </ButtonLink>
      </div>
    </div>
  ) : null;
}

function InfoItem({title, value, odd}) {
  return (
    <div className={`${odd == true ? 'bg-gray-50' : 'bg-white'} px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
      <dt className="text-sm font-medium text-gray-500">
        {title}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );
}