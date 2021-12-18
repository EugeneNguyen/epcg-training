import {Box, useQuery} from "../../../../generator/_components";
import {useParams} from "react-router-dom";
import API from "./api";
import get from "lodash/get";
import ScoreDistributionChart from "../chart/score_distribution";
import classNames from "classnames";

export default function ExamInfoBox() {
  const {id} = useParams();
  const {data, loading, error} = useQuery(API.GET_EXAM, {variables: {id}});

  if (loading) return <Box title="Exam Information" padding>Loading</Box>;
  if (error) return <Box title="Exam Information" padding>{error.message}</Box>;
  if (!data) return <Box title="Exam Information" padding>No Data</Box>;

  return (
    <Box title="Exam Information">
      <Item label="Name" value={get(data, 'data.name')}/>
      <Item label="Duration (min)" value={get(data, 'data.courseTemplateExam.duration')}/>
      <Item label="Number of Question" value={get(data, 'data.courseTemplateExam.numberOfQuestion')}/>
      <div className={classNames('m-4')}>
        <ScoreDistributionChart examId={id}/>
      </div>
    </Box>
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