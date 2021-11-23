import {useQuery} from "@apollo/client";
import API from "./api";
import AuthHelper from "../../../auth/helper";
import {Box, Table, TBody, TH, THead} from "../../../../generator/_components";
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
      <Table>
        <THead>
        <tr>
          <TH>Name</TH>
        </tr>
        </THead>
        <TBody>
        {data.data.coursesLink.map(cl => (
          <tr>
            <CellLink link={`/course/${cl.course.id}`} value={cl.course.name}/>
          </tr>
        ))}
        </TBody>
      </Table>
    </Box>
  );
}
