import {Box} from "../../../../generator/_components";
import {useMutation, useQuery} from "@apollo/client";
import {useHistory} from "react-router-dom";
import API from "./api";
import {Button} from "../../../../generator/_components/button";
import AuthHelper from "../../../auth/helper";
import Cell from "../../../../generator/_components/table/cell";
import CellLink from "../../../../generator/_components/table/cell/cell_link";

export default function ExamAttemptBox({templateExamId}) {
  const history = useHistory();
  const {data, loading, error} = useQuery(
    API.GET_ATTEMPTS,
    {
      ...API.DEFAULT_OPTIONS,
      variables: {token: AuthHelper.token(), where: {templateExamId}},
    },
  );

  const [createAttempt] = useMutation(API.CREATE_ATTEMPT);

  if (loading) return <Box title="Attempts" padding>Loading</Box>;
  if (error) return <Box title="Attempts" padding>{error.message}</Box>;
  if (!data) return <Box title="Attempts" padding>No Data</Box>;

  return (
    <Box
      title="Attempts"
      footer={
        <Button
          onClick={() => {
            createAttempt({variables: {token: AuthHelper.token(), id: templateExamId}})
              .then(({data}) => history.push(`/exam/attempt/${data.data.id}`));
          }}
        >
          Start new Attempt
        </Button>
      }
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {data.data.examAttempts.map(attempt => (
          <tr>
            <Cell value={attempt.templateExam.name}/>
            {!attempt.startTime ? (
              <CellLink link={`/exam/attempt/${attempt.id}`} value="Start"/>
            ) : !attempt.endTime ? (
              <CellLink link={`/exam/attempt/${attempt.id}/take`} value="Continue"/>
            ) : (
              <CellLink link={`/exam/attempt/${attempt.id}/result`} value="Check Result"/>
            )}
          </tr>
        ))}
        </tbody>
      </table>
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