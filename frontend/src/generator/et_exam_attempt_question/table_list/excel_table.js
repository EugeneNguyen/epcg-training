import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtExamAttemptQuestionTerTable.defaultProps = {
  excludeColumns: [],
};

EtExamAttemptQuestionTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
};

export default function EtExamAttemptQuestionTerTable(props) {
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
            Attempt Id
          </TH>
          <TH className="">
            Question Id
          </TH>
          <TH className="">
            Order
          </TH>
          <TH className="">
            Displayed Question Data
          </TH>
          <TH className="">
            Full Question Data
          </TH>
          <TH className="">
            Answer
          </TH>
          <TH className="">
            Raw Answer
          </TH>
          <TH className="">
            Correct
          </TH>
          <TH className="">
            Flag
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
            editId={item.id}
            editKey="id"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'attemptId')}
            editId={item.id}
            editKey="attemptId"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'questionId')}
            editId={item.id}
            editKey="questionId"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="INT"
            value={get(item, 'order')}
            editId={item.id}
            editKey="order"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TEXT"
            value={get(item, 'displayedQuestionData')}
            editId={item.id}
            editKey="displayedQuestionData"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TEXT"
            value={get(item, 'fullQuestionData')}
            editId={item.id}
            editKey="fullQuestionData"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'answer')}
            editId={item.id}
            editKey="answer"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'rawAnswer')}
            editId={item.id}
            editKey="rawAnswer"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'correct')}
            editId={item.id}
            editKey="correct"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'flag')}
            editId={item.id}
            editKey="flag"
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
