import ExamInfoBox from "./exam";
import ExamAttemptBox from "./attempt";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import API from './exam/api';
import CourseAnalyticBox from "./analytic/course";

export default function ExamScreen() {
  const {id} = useParams();
  const {data, loading, error} = useQuery(API.GET_EXAM, {
    variables: {id}
  })

  if (loading) return "Loading ...";
  if (error) return "Error ...";
  if (!data) return "No data ...";

  return (
    <div className="flex space-x-4">
      <div className="w-8/12 space-y-4">
        <ExamAttemptBox examId={id}/>
        <CourseAnalyticBox examId={id}/>
      </div>
      <div className="w-4/12">
        <ExamInfoBox/>
      </div>
    </div>
  );
}