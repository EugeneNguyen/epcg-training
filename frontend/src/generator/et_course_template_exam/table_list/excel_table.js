import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtCourseTemplateExamTerTable.defaultProps = {
  excludeColumns: [],
};

EtCourseTemplateExamTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function EtCourseTemplateExamTerTable(props) {
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
          <TH hidden={props.excludeColumns.includes("name")}>Name</TH>
          <TH hidden={props.excludeColumns.includes("duration")}>Duration</TH>
          <TH hidden={props.excludeColumns.includes("numberOfQuestion")}>Number Of Question</TH>
          <TH hidden={props.excludeColumns.includes("unlimitedTime")}>Unlimited Time</TH>
          <TH hidden={props.excludeColumns.includes("randomQuestionOrder")}>Random Question Order</TH>
          <TH hidden={props.excludeColumns.includes("randomChoiceOrder")}>Random Choice Order</TH>
          <TH hidden={props.excludeColumns.includes("isPublic")}>Is Public</TH>
          <TH hidden={props.excludeColumns.includes("courseTemplateId")}>Course Template</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            hidden={props.excludeColumns.includes("name")}
            type="VARCHAR(255)"
            value={get(item, 'name')}
            link={`/etCourseTemplateExam/${item.id}`}
          />
          <Cell
            hidden={props.excludeColumns.includes("duration")}
            type="INT"
            value={get(item, 'duration')}
            editId={item.id}
            editKey="duration"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("numberOfQuestion")}
            type="INT"
            value={get(item, 'numberOfQuestion')}
            editId={item.id}
            editKey="numberOfQuestion"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            hidden={props.excludeColumns.includes("unlimitedTime")}
            type="TINYINT(1)"
            value={get(item, 'unlimitedTime')}
          />
          <Cell
            hidden={props.excludeColumns.includes("randomQuestionOrder")}
            type="TINYINT(1)"
            value={get(item, 'randomQuestionOrder')}
          />
          <Cell
            hidden={props.excludeColumns.includes("randomChoiceOrder")}
            type="TINYINT(1)"
            value={get(item, 'randomChoiceOrder')}
          />
          <Cell
            hidden={props.excludeColumns.includes("isPublic")}
            type="TINYINT(1)"
            value={get(item, 'isPublic')}
          />
          <Cell
            hidden={props.excludeColumns.includes("courseTemplateId")}
            type="CHAR(36)"
            value={get(item, 'courseTemplate.name')}
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
