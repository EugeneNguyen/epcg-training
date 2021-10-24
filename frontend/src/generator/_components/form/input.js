import InputText from './input_text';
import InputDatePicker from './input_date_picker';
import InputSelect from './input_select';
import InputHidden from './input_hidden';
import InputNumber from './input_number';
import InputCheckbox from './input_checkbox';

function Input({type, ...args}) {
  if (type === 'DATETIME') {
    return <InputDatePicker {...args} />
  }
  if (type === 'FLOAT' || type === 'INT') {
    return <InputNumber {...args} />
  }
  if (type === 'SELECT') {
    return <InputSelect {...args} />
  }
  if (type === 'HIDDEN') {
    return <InputHidden name={args.name} value={args.value} />
  }
  if (type === 'TINYINT(1)') {
    return <InputCheckbox {...args} />
  }
  return <InputText {...args} />;
}

export default Input;
