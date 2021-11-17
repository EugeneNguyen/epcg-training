import {Box} from "../../../components";
import {Button} from "../../../generator/_components/button";
import {useMutation} from "@apollo/client";
import API from '../api';
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import moment from "moment";

export default function QuestionListBox({questions, attemptId, setIndex, data}) {
  const history = useHistory();
  const [endAttempt] = useMutation(API.END_ATTEMPT, {variables: {id: attemptId}});
  const [time, setTime] = useState(moment());
  const endTime = moment(parseFloat(data.data.startTime)).add(data.data.duration, 'minute');
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(moment());
      const diffSec = endTime.diff(time, 'seconds');
      if (diffSec < 0) {
        endAttempt().then(() => history.push(`/exam/attempt/${attemptId}/result`));
      }
    }, 1000);
    return () => clearInterval(timerId);
  });
  const diffSec = endTime.diff(time, 'seconds');
  return (
    <Box
      title={`Time left: ${moment.utc(diffSec * 1000).format("HH:mm:ss")}`}
      footer={
        <Button onClick={() => endAttempt().then(() => history.push(`/exam/attempt/${attemptId}/result`))}>
          Submit
        </Button>
      }
    >
      <div className="grid grid-cols-5">
        {questions.map((question, index) => (
          <div
            onClick={() => setIndex(index)}
            className={`${question.rawAnswer ? 'bg-green-50' : 'bg-gray-50'} border p-4 text-center hover:bg-gray-200 cursor-pointer`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </Box>
  );
}
