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
          <TH>Id</TH>
          <TH>Question Code</TH>
          <TH>Question</TH>
          <TH>Question Image</TH>
          <TH>Answer A</TH>
          <TH>Answer B</TH>
          <TH>Answer C</TH>
          <TH>Answer D</TH>
          <TH>Correct Answer</TH>
          <TH>Explanation</TH>
          <TH>Course Template</TH>
          <TH>Score</TH>
          <TH>Question Source</TH>
          <TH>Created At</TH>
          <TH>Updated At</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            type="CHAR(36)"
            value={get(item, 'id')}
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'questionCode')}
            link={`/etCourseTemplateQuestionMCQ/${item.id}`}
            editId={item.id}
            editKey="questionCode"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TEXT"
            value={get(item, 'question')}
            editId={item.id}
            editKey="question"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'questionImage.originalName')}
          />
          <Cell
            type="TEXT"
            value={get(item, 'answerA')}
            editId={item.id}
            editKey="answerA"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TEXT"
            value={get(item, 'answerB')}
            editId={item.id}
            editKey="answerB"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TEXT"
            value={get(item, 'answerC')}
            editId={item.id}
            editKey="answerC"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TEXT"
            value={get(item, 'answerD')}
            editId={item.id}
            editKey="answerD"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="VARCHAR(255)"
            value={get(item, 'correctAnswer')}
            editId={item.id}
            editKey="correctAnswer"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TEXT"
            value={get(item, 'explanation')}
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'courseTemplate.name')}
          />
          <Cell
            type="INT"
            value={get(item, 'score')}
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'questionSource.name')}
          />
          <Cell
            type="DATETIME"
            value={get(item, 'createdAt')}
          />
          <Cell
            type="DATETIME"
            value={get(item, 'updatedAt')}
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
