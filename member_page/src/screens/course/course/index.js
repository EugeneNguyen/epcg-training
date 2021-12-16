import classNames from "classnames";
import ExamListBox from "./exam_list_box";
import CourseInfoBox from "./course_info_box";

export default function CourseScreen() {
  return (
    <div className={classNames('flex space-x-4')}>
      <div className={classNames('w-8/12')}>
        <ExamListBox/>
      </div>
      <div className={classNames('w-4/12')}>
        <CourseInfoBox/>
      </div>
    </div>
  );
}