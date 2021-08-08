function Form({onSubmitParams, ...props}) {
  const handleSubmit = (e) => {
    const params = {};
    for (const target of e.target) {
      if (target.name.length) {
        params[target.name] = target.value;
      }
    }
    if (onSubmitParams) {
      onSubmitParams(params);
    }
    e.preventDefault();
  }

  return (
    <form {...props} onSubmit={handleSubmit}>
      {props.children}
    </form>
  )
}

export default Form;
