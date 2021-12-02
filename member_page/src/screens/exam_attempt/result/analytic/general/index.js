import ThisCourseChart from "./chart/this_course";
import AllCourseChart from "./chart/all_course";

export default function GeneralAnalyticBox({question}) {
  return (
    <div className="flex">
      <div className="w-6/12 p-4">
        <ThisCourseChart question={question}/>
      </div>
      <div className="w-6/12 p-4">
        <AllCourseChart question={question}/>
      </div>
    </div>
  );
}