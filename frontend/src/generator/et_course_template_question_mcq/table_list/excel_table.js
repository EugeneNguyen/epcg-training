import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtCourseTemplateQuestionMcqTerTable.defaultProps = {
  excludeColumns: [],
};

EtCourseTemplateQuestionMcqTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function EtCourseTemplateQuestionMcqTerTable(props) {
  const {loading, error, data, refetch} = useQuery(API.ALL_WITH_PAGE, {
    ...API.DEFAULT_OPTIONS,
    variables: {
      pagination: {limit: props.limit, offset: props.offset},
      where: props.where,
      searchBy: props.searchBy,
    },
    onCompleted: props.didLoadData,
  });

  if (loading && !data) return "Loading";
  if (error) return "Error";

  return (
    <Table>
      <THead>
        <TR>
          <TH hidden={props.excludeColumns.includes("questionCode")} size="80">Question Code</TH>
          <TH hidden={props.excludeColumns.includes("question")} size="80">Question</TH>
          <TH hidden={props.excludeColumns.includes("answerA")} size="80">Answer A</TH>
          <TH hidden={props.excludeColumns.includes("answerB")} size="80">Answer B</TH>
          <TH hidden={props.excludeColumns.includes("answerC")} size="80">Answer C</TH>
          <TH hidden={props.excludeColumns.includes("answerD")} size="80">Answer D</TH>
          <TH hidden={props.excludeColumns.includes("correctAnswer")}>Correct Answer</TH>
          <TH hidden={props.excludeColumns.includes("explanation")} size="80">Explanation</TH>
          <TH hidden={props.excludeColumns.includes("questionSourceId")}>Question Source</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            hidden={props.excludeColumns.includes("questionCode")}
            type="VARCHAR(255)"
            value={get(item, 'questionCode')}
            size="80"
            link={`/etCourseTemplateQuestionMCQ/${item.id}`}
            editId={item.id}
            editKey="questionCode"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("question")}
            type="TEXT"
            value={get(item, 'question')}
            size="80"
            editId={item.id}
            editKey="question"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("answerA")}
            type="TEXT"
            value={get(item, 'answerA')}
            size="80"
            editId={item.id}
            editKey="answerA"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("answerB")}
            type="TEXT"
            value={get(item, 'answerB')}
            size="80"
            editId={item.id}
            editKey="answerB"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("answerC")}
            type="TEXT"
            value={get(item, 'answerC')}
            size="80"
            editId={item.id}
            editKey="answerC"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("answerD")}
            type="TEXT"
            value={get(item, 'answerD')}
            size="80"
            editId={item.id}
            editKey="answerD"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("correctAnswer")}
            type="VARCHAR(255)"
            value={get(item, 'correctAnswer')}
            editId={item.id}
            editKey="correctAnswer"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("explanation")}
            type="TEXT"
            value={get(item, 'explanation')}
            size="80"
            editId={item.id}
            editKey="explanation"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("questionSourceId")}
            type="CHAR(36)"
            value={get(item, 'questionSource.name')}
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
