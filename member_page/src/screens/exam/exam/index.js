import ExamInfoBox from "./exam_info_box";
import ExamAttemptBox from "./my_attempt";
import {useParams} from "react-router-dom";
import CourseMateBox from "./analytic/course";

export default function ExamScreen() {
  const {id} = useParams();
  return (
    <div className="flex space-x-4">
      <div className="w-8/12 space-y-4">
        <ExamAttemptBox examId={id}/>
        <CourseMateBox examId={id}/>
      </div>
      <div className="w-4/12">
        <ExamInfoBox/>
      </div>
    </div>
  );
}