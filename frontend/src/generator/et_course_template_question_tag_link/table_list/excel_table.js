import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtCourseTemplateQuestionTagLinkTerTable.defaultProps = {
  excludeColumns: [],
};

EtCourseTemplateQuestionTagLinkTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function EtCourseTemplateQuestionTagLinkTerTable(props) {
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
          <TH hidden={props.excludeColumns.includes("questionId")}>Question</TH>
          <TH hidden={props.excludeColumns.includes("questionTagId")}>Tag</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            hidden={props.excludeColumns.includes("questionId")}
            type="CHAR(36)"
            value={get(item, 'question.questionCode')}
          />
          <Cell
            hidden={props.excludeColumns.includes("questionTagId")}
            type="CHAR(36)"
            value={get(item, 'tag.name')}
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
