import ExamInfoBox from "./exam";
import ExamAttemptBox from "./attempt";

export default function ExamScreen() {
  return (
    <div className="flex space-x-4">
      <div className="w-8/12">
        <ExamAttemptBox/>
      </div>
      <div className="w-4/12">
        <ExamInfoBox/>
      </div>
    </div>
  );
}