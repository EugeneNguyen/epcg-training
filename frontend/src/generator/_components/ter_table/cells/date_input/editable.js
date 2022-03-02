import classNames from 'classnames';
import moment from 'moment';
import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";

import BaseHelper from '../base/helper';
import BaseCellInput from "../base/cell_edit";

export default function EditableCell(props) {
  const [value, setValue] = useState(props.value);
  useEffect(() => setValue(props.value), [props.value]);

  const [edit] = useMutation(props.editMutation);

  return (
    <BaseCellInput link={props.link} size={props.size}>
      <input
        type="date"
        value={moment(value).format('YYYY-MM-DD')}
        onChange={(event) => setValue(moment(event.target.value))}
        onBlur={() => BaseHelper.submit(props, edit, value)}
        className={classNames("px-1 font-sans text-sm text-gray-700 w-full")}
      />
    </BaseCellInput>
  )
}

EditableCell.propTypes = {
  ...BaseHelper.basePropTypes,
};