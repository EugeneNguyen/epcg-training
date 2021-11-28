import {Box} from "../../../components";
import {Button} from "../../../generator/_components/button";
import {useMutation} from "@apollo/client";
import API from '../api';
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import moment from "moment";
import classNames from "classnames";

export default function QuestionListBox({questions, attemptId, setIndex, data}) {
  const history = useHistory();
  const [endAttempt] = useMutation(API.END_ATTEMPT, {variables: {id: attemptId}});

  const endTime = moment(parseFloat(data.data.startTime)).add(data.data.duration, 'minute');
  const unlimitedTime = data.data.templateExam.unlimitedTime;

  const tick = useTick();
  const diffSec = endTime.diff(tick, 'seconds');
  if (diffSec < 0 && !unlimitedTime) {
    endAttempt().then(() => history.push(`/exam/attempt/${attemptId}/result`));
  }

  return (
    <Box
      title={unlimitedTime ? "Questions" : `Time left: ${moment.utc(diffSec * 1000).format("HH:mm:ss")}`}
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
            className={classNames(
              'border p-4 text-center hover:bg-gray-200 cursor-pointer',
              {'bg-green-50': question.rawAnswer},
              {'bg-gray-50': !question.rawAnswer},
            )}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </Box>
  );
}

function useTick() {
  const [_sec, _setSec] = useState(moment());
  useEffect(() => {
    const timerId = setInterval(() => {
      _setSec(moment());
    }, 1000);
    return () => clearInterval(timerId);
  });
  return _sec;
}