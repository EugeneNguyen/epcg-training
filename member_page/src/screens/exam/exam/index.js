import ExamInfoBox from "./exam";
import ExamAttemptBox from "./attempt";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import API from '../api';

export default function ExamScreen() {
  const {id} = useParams();
  const {data, loading, error} = useQuery(API.GET_EXAM_BY_ID, {
    variables: {id}
  })

  if (loading) return "Loading ...";
  if (error) return "Error ...";
  if (!data) return "No data ...";

  return (
    <div className="flex space-x-4">
      <div className="w-8/12">
        <ExamAttemptBox templateExamId={data.data.courseTemplateExamId}/>
      </div>
      <div className="w-4/12">
        <ExamInfoBox/>
      </div>
    </div>
  );
}