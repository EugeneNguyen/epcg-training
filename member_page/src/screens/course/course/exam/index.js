import {Box} from "../../../../generator/_components";
import {useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import API from "./api";
import CellLink from "../../../../generator/_components/table/cell/cell_link";

export default function CourseExamBox() {
  const {id} = useParams();
  const {data, loading, error} = useQuery(
    API.GET_EXAM,
    {
      ...API.DEFAULT_OPTIONS,
      variables: {
        where: {
          courseId: id,
        }
      },
    },
  );

  console.log(data);

  if (loading) {
    return <Box title="Exams" padding>Loading</Box>;
  }

  if (error) {
    return <Box title="Exams" padding>{error.message}</Box>;
  }

  if (!data) {
    return <Box title="Exams" padding>No Data</Box>;
  }

  return (
    <Box title="Exams">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration (mins)
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    # of Questions
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.data.map(exam => (
                  <tr>
                    <CellLink link={`/course/${exam.id}`} value={exam.name}/>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {exam.courseTemplateExam.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {exam.courseTemplateExam.numberOfQuestion}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}