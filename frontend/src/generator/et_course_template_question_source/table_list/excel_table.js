import {useQuery} from "@apollo/client";
import {get} from 'lodash';
import PropTypes from 'prop-types';
import API from '../apis';
import {Table, THead, TBody, TH, TR, Cell} from '../../_components/ter_table';

EtCourseTemplateQuestionSourceTerTable.defaultProps = {
  excludeColumns: [],
};

EtCourseTemplateQuestionSourceTerTable.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  where: PropTypes.object,
  searchBy: PropTypes.object,
  didLoadData: PropTypes.func,
  excludeColumns: PropTypes.array,
};

export default function EtCourseTemplateQuestionSourceTerTable(props) {
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
          <TH hidden={props.excludeColumns.includes("courseTemplateId")}>Course Template Id</TH>
        </TR>
      </THead>
      <TBody>
      {data && data.data.rows.map(item => (
        <TR key={item.id} hover>
          <Cell
            hidden={props.excludeColumns.includes("name")}
            type="VARCHAR(255)"
            value={get(item, 'name')}
            link={`/etCourseTemplateQuestionSource/${item.id}`}
          />
          <Cell
            hidden={props.excludeColumns.includes("courseTemplateId")}
            type="CHAR(36)"
            value={get(item, 'courseTemplateId')}
          />
        </TR>
      ))}
      </TBody>
    </Table>
  );
}
