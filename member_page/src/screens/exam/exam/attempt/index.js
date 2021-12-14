import {Box, Table, TBody, TH, THead, useQuery} from "../../../../generator/_components";
import {useMutation} from "@apollo/client";
import {useHistory} from "react-router-dom";
import API from "./api";
import {Button} from "../../../../generator/_components/button";
import AuthHelper from "../../../auth/helper";
import Cell from "../../../../generator/_components/table/cell";
import CellLink from "../../../../generator/_components/table/cell/cell_link";

export default function ExamAttemptBox({examId}) {
  const history = useHistory();
  const token = AuthHelper.token();
  const {data, loading, error} = useQuery(API.GET_ATTEMPTS, {
    variables: {token, where: {examId}},
  });

  const [createAttempt, {loading: createLoading}] = useMutation(API.CREATE_ATTEMPT);

  if (loading) return <Box title="My Attempts" padding>Loading</Box>;
  if (error) return <Box title="My Attempts" padding>{error.message}</Box>;
  if (!data) return <Box title="My Attempts" padding>No Data</Box>;

  return (
    <Box
      title="My Attempts"
      footer={data.data.examAttempts && data.data.examAttempts.length == 0 && (
        <Button
          onClick={() => {
            createAttempt({variables: {token, examId}})
              .then(({data}) => history.push(`/exam/attempt/${data.data.id}`));
          }}
          disabled={createLoading}
        >
          {createLoading ? "Preparing new attempt ..." : "Start new Attempt"}
        </Button>
      )}
    >
      <Table>
        <THead>
          <tr>
            <TH>Name</TH>
            <TH>Result</TH>
            <TH>Action</TH>
          </tr>
        </THead>
        <TBody>
          {data.data.examAttempts.map(attempt => (
            <tr>
              <Cell value={attempt.templateExam.name}/>
              {attempt.endTime ? (
                <Cell value={`${attempt.score}%`}/>
              ) : (
                <Cell value=""/>
              )}
              {!attempt.startTime ? (
                <CellLink link={`/exam/attempt/${attempt.id}`} value="Start"/>
              ) : !attempt.endTime ? (
                <CellLink link={`/exam/attempt/${attempt.id}/take`} value="Continue"/>
              ) : (
                <CellLink link={`/exam/attempt/${attempt.id}/result`} value="Check Result"/>
              )}
            </tr>
          ))}
        </TBody>
      </Table>
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