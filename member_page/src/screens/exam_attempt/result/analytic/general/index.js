import ThisCourseChart from "./chart/this_course";

export default function GeneralAnalyticBox({attemptId, qOrder}) {
  return (
    <div className="flex">
      <div className="w-6/12 p-4">
        <ThisCourseChart attemptId={attemptId} qOrder={qOrder}/>
      </div>
      <div className="w-6/12 p-4">
      </div>
    </div>
  );
}