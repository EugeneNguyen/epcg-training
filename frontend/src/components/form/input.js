import InputText from "./input_text";

function Input({type, ...args}) {
  if (type === 'text') {
    return <InputText {...args} />
  }
  return undefined;
}

export default Input;
