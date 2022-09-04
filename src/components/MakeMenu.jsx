function MakeMenu(props) {
  return (
    <button
      type="button"
      className="btn btn-link"
      data-bs-dismiss="modal"
      onClick={() => props.handleMenu(props.handle)}
    >
      {props.label}
    </button>
  )
}

export default MakeMenu
