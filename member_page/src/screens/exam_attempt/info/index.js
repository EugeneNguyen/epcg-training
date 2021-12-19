import {useHistory, useParams} from "react-router-dom";
import API from "../api";
import {useMutation} from "@apollo/client";
import {Box, ButtonLink} from "../../../components";
import {get} from "lodash";
import {Button} from "../../../generator/_components/button";
import {useQuery} from "../../../generator/_components";
import classNames from "classnames";

export default function ScreenExamAttemptInfo() {
  const id = useParams().id;

  const {data, loading, error} = useQuery(API.GET_BY_ID, {variables: {id}});


  if (!data) {
    return "Loading ...";
  }

  return (
    <div className="space-y-2">
      <Box title="Exam Attempt Information" footer={<ButtonStart id={id} data={data}/>}>
        <dl className="m-0">
          <InfoItem title="Exam" value={get(data, 'data.templateExam.name', 'N/A')}/>
          <InfoItem title="Number of Questions" value={get(data, 'data.templateExam.numberOfQuestion', 'N/A')} odd/>
          <InfoItem title="Duration (min)" value={get(data, 'data.duration', 'N/A')}/>
        </dl>
      </Box>
    </div>
  );
}

function ButtonStart({id, data}) {
  const [startAttempt] = useMutation(API.START_ATTEMPT);
  const history = useHistory();
  if (data.startTime == null) {
    return (
      <Button onClick={() => startAttempt({variables: {id}}).then(() => history.push(`/exam/attempt/${id}/take`))}>
        Start attempt
      </Button>
    )
  }

  if (data.endTime == null) {
    return (
      <ButtonLink to={`/exam/attempt/${id}/take`}>
        Continue attempt
      </ButtonLink>
    )
  }

  return (
    <ButtonLink to={`/exam/attempt/${id}/result`}>
      Result
    </ButtonLink>
  )
}

function InfoItem({title, value, odd}) {
  return (
    <div className={classNames(
      'px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6',
      {'bg-gray-50': odd},
      {'bg-white': !odd},
    )}>
      <dt className="text-sm font-medium text-gray-500">
        {title}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );
}