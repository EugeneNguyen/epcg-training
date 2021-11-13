export default function Dialog({id, title, description, buttons}) {
  return (
    <div className="modal fade" id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-body p-4 text-center">
            <h5 className="mb-0">{title}</h5>
            <p className="mb-0">{description}</p>
          </div>
          <div className="modal-footer flex-nowrap p-0">
            {buttons.map(button => button.dismiss ? (
              <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right" data-bs-dismiss="modal">
                {button.title}
              </button>
            ) :(
              <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right" onClick={button.onClick}>
                {button.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};
