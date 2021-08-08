function InputText({displayLabel, name, ...props}) {
  return (
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">{displayLabel}</label>
      <input name={name} {...props} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
  );
}

export default InputText;
