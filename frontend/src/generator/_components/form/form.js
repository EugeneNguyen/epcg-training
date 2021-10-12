import _ from 'lodash';

function Form({onSubmitParams, ...props}) {
  const handleSubmit = (e) => {
    const params = {};
    for (const target of e.target) {
      if (target.name.length) {
        console.log(target.name);
        if (!params[target.name]) {
          params[target.name] = target.value;
        } else {
          if (_.isArray(params[target.name])) {
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
    </form>
  )
}

export default Form;
