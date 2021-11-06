function ButtonReload({loading=false, onClick}) {
  if (loading) {
    return (
      <button className="btn btn-primary" type="button" disabled>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        {' '}
        Loading...
      </button>
    );
  } else {
    return (
      <button className="btn btn-primary" type="button" onClick={() => onClick()}>
        <i className="bi bi-arrow-clockwise"></i>
        {' '}
        Reload
      </button>
    );
  }
};

export default ButtonReload;