import API from "./api";
import AuthHelper from "../../../auth/helper";
import {Box, Table, TBody, TH, THead, useQuery} from "../../../../generator/_components";
import CellLink from "../../../../generator/_components/table/cell/cell_link";

export default function DashboardCourseBox() {
  const {data, loading, error} = useQuery(API.GET_COURSE, {variables: {token: AuthHelper.token()}});

  if (loading) return <Box title="My Courses" padding>Loading</Box>;
  if (error) return <Box title="My Courses" padding>{error.message}</Box>;
  if (!data) return <Box title="My Courses" padding>No Data</Box>;

  return (
    <Box title="My Courses">
      <Table>
        <THead>
        <tr>
          <TH>Name</TH>
        </tr>
        </THead>
        <TBody>
        {data.data.coursesLink.map(cl => (
          <tr>
            <CellLink link={`/course/${cl.course.id}`}>
              {cl.course.name}
            </CellLink>
          </tr>
        ))}
        </TBody>
      </Table>
    </Box>
  );
}
