import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtCourseTemplateExamQuestionTerTable.defaultProps = {
  excludeColumns: [],
};

EtCourseTemplateExamQuestionTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function EtCourseTemplateExamQuestionTerTable(props) {
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
          <TH hidden={props.excludeColumns.includes("examId")}>Exam Id</TH>
          <TH hidden={props.excludeColumns.includes("questionId")} size="80">Question</TH>
          <TH hidden={props.excludeColumns.includes("order")}>Order</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            hidden={props.excludeColumns.includes("examId")}
            type="CHAR(36)"
            value={get(item, 'examId')}
          />
          <Cell
            hidden={props.excludeColumns.includes("questionId")}
            type="CHAR(36)"
            value={get(item, 'question.questionCode')}
            size="80"
          />
          <Cell
            hidden={props.excludeColumns.includes("order")}
            type="INT"
            value={get(item, 'order')}
            editId={item.id}
            editKey="order"
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
