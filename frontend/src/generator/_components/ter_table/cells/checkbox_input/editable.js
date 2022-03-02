import {useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';

import BaseHelper from '../base/helper';
import BaseCellInput from "../base/cell_edit";

export default function EditableCell(props) {
  const [value, setValue] = useState(props.value);
  useEffect(() => setValue(props.value), [props.value]);

  const [edit] = useMutation(props.editMutation);

  return (
    <BaseCellInput link={props.link} size={props.size}>
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => {
          setValue(event.target.checked);
          BaseHelper.submit(props, edit, event.target.checked);
        }}
      />
    </BaseCellInput>
  )
}

EditableCell.propTypes = {
  ...BaseHelper.basePropTypes,
};