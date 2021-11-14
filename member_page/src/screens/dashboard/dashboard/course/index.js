import {useQuery} from "@apollo/client";
import API from "./api";
import AuthHelper from "../../../auth/helper";
import {Box} from "../../../../generator/_components";
import CellLink from "../../../../generator/_components/table/cell/cell_link";

export default function DashboardCourseBox() {
  const {data, loading, error} = useQuery(
    API.GET_COURSE,
    {
      ...API.DEFAULT_OPTIONS,
      variables: {
        token: AuthHelper.token(),
      },
    },
  );

  if (loading) {
    return <Box title="Course" padding>Loading</Box>;
  }

  if (error) {
    return <Box title="Course" padding>{error.message}</Box>;
  }

  if (!data) {
    return <Box title="Course" padding>No Data</Box>;
  }

  return (
    <Box title="Course">
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
                    Status
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.data.coursesLink.map(cl => (
                  <tr>
                    <CellLink link={`/course/${cl.course.id}`} value={cl.course.name}/>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Admin
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
