import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtExamAttemptTerTable.defaultProps = {
  excludeColumns: [],
};

EtExamAttemptTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
};

export default function EtExamAttemptTerTable(props) {
  const {loading, error, data, refetch} = useQuery(API.ALL_WITH_PAGE, {
    ...API.DEFAULT_OPTIONS,
    variables: {
      pagination: {limit: props.limit, offset: props.offset},
      where: props.where,
    },
    onCompleted: props.didLoadData,
  });

  if (loading && !data) return "Loading";
  if (error) return "Error";

  return (
    <Table>
      <THead>
        <TR>
          <TH className="">
            Id
          </TH>
          <TH className="">
            User
          </TH>
          <TH className="">
            Exam
          </TH>
          <TH className="">
            Template Exam
          </TH>
          <TH className="">
            Score
          </TH>
          <TH className="">
            Duration
          </TH>
          <TH className="">
            Start Time
          </TH>
          <TH className="">
            End Time
          </TH>
          <TH className="">
            Created At
          </TH>
          <TH className="">
            Updated At
          </TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            type="CHAR(36)"
            value={get(item, 'id')}
            link={`/etExamAttempt/${item.id}`}
            editId={item.id}
            editKey="id"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'user.username')}
            editId={item.id}
            editKey="userId"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'exam.name')}
            editId={item.id}
            editKey="examId"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'templateExam.name')}
            editId={item.id}
            editKey="templateExamId"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="INT"
            value={get(item, 'score')}
            editId={item.id}
            editKey="score"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="INT"
            value={get(item, 'duration')}
            link={`http://localhost:4000/#/exam/attempts/${item.id}`}
            editId={item.id}
            editKey="duration"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="DATETIME"
            value={get(item, 'startTime')}
            editId={item.id}
            editKey="startTime"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="DATETIME"
            value={get(item, 'endTime')}
            editId={item.id}
            editKey="endTime"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="DATETIME"
            value={get(item, 'createdAt')}
            editId={item.id}
            editKey="createdAt"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="DATETIME"
            value={get(item, 'updatedAt')}
            editId={item.id}
            editKey="updatedAt"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
