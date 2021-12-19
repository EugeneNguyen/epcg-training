import {isArray} from 'lodash';

function Form({onSubmitParams, ...props}) {
  const handleSubmit = (e) => {
    const params = {};
    for (const target of e.target) {
      if (target.name.length) {
        if (!params[target.name]) {
          params[target.name] = target.value;
        } else {
          if (isArray(params[target.name])) {
            params[target.name].push(target.value);
          } else {
            params[target.name] = [params[target.name], target.value];
          }
        }
      }
    }
    if (onSubmitParams) {
      onSubmitParams(params);
    }
    e.preventDefault();
  }

  return (
    <form {...props} onSubmit={handleSubmit} >
      <div class="grid grid-cols-1 gap-6 mt-4">
        {props.children}
      </div>
      <input type="submit" class="invisible" />
    </form>
  )
}

export default Form;
