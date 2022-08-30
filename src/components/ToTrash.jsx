function ToTrash(props) {
  // 削除する
  const handleTrash = (e) => {
    e.preventDefault()
    // ダイアログを閉じる
    props.modalObj.hide()
  }

  return (
    <div className="modal fade" id="toTrashModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4>
              <div className="modal-title">削除の確認</div>
            </h4>
          </div>

          <div className="modal-body">
            <div className="mb-3">選択された項目を削除します。よろしいですか？</div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              閉じる
            </button>
            <button type="submit" className="btn btn-primary" onClick={handleTrash}>
              削除する
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToTrash
