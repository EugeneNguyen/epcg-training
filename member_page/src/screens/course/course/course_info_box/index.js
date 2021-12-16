import {Box, useQuery} from "../../../../generator/_components";
import {useParams} from "react-router-dom";
import API from "./api";
import AuthHelper from "../../../auth/helper";
import classNames from "classnames";
import _ from "lodash";

export default function CourseInfoBox() {
  const {id} = useParams();
  const {data, loading, error} = useQuery(API.GET_EXAM, {
    variables: {
      where: {
        courseId: id,
      },
      token: AuthHelper.token(),
    },
  });

  if (loading) return <Box title="Course Info" padding>Loading</Box>;
  if (error) return <Box title="Course Info" padding>{error.message}</Box>;
  if (!data) return <Box title="Course Info" padding>No Data</Box>;

  return (
    <Box title="Course Info">
      <dl className="m-0">
        <Item label="# of Attempts">
          {data.me.examAttempts.length}
        </Item>
        <Item label="Average Score">
          {_.round(_.meanBy(data.me.examAttempts.map(attempt => attempt.score)))}%
        </Item>
        <Item label="Average (by question)">
          {_.sum(data.me.examAttempts.map(attempt => attempt.correctQuestionsCount))}/{_.sum(data.me.examAttempts.map(attempt => attempt.questionsCount))}
          {' '}
          ({_.round(_.sum(data.me.examAttempts.map(attempt => attempt.correctQuestionsCount)) * 100 / _.sum(data.me.examAttempts.map(attempt => attempt.questionsCount)))}%)
        </Item>
      </dl>
    </Box>
  );
}

function Item({label, value, children, odd}) {
  return (
    <div className={classNames(
      {"bg-gray-50": odd},
      {"bg-white": !odd},
      "px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
    )}>
      <dt className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value || children}
      </dd>
    </div>
  )
}