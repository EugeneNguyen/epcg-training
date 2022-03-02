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
          <TH className="">
            Id
          </TH>
          <TH className="">
            Name
          </TH>
          <TH className="">
            Duration
          </TH>
          <TH className="">
            Number Of Question
          </TH>
          <TH className="">
            Unlimited Time
          </TH>
          <TH className="">
            Random Question Order
          </TH>
          <TH className="">
            Random Choice Order
          </TH>
          <TH className="">
            Is Public
          </TH>
          <TH className="">
            Course Template
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
            type="VARCHAR(255)"
            value={get(item, 'name')}
            link={`/etCourseTemplateExam/${item.id}`}
            editId={item.id}
            editKey="name"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="INT"
            value={get(item, 'duration')}
            editId={item.id}
            editKey="duration"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="INT"
            value={get(item, 'numberOfQuestion')}
            editId={item.id}
            editKey="numberOfQuestion"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'unlimitedTime')}
            editId={item.id}
            editKey="unlimitedTime"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'randomQuestionOrder')}
            editId={item.id}
            editKey="randomQuestionOrder"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'randomChoiceOrder')}
            editId={item.id}
            editKey="randomChoiceOrder"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="TINYINT(1)"
            value={get(item, 'isPublic')}
            editId={item.id}
            editKey="isPublic"
            editMutation={API.EDIT}
            editOnCompleted={() => refetch()}
            editable
          />
          <Cell
            type="CHAR(36)"
            value={get(item, 'courseTemplate.name')}
            editId={item.id}
            editKey="courseTemplateId"
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
