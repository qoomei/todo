import { useState } from 'react'

import { CirclePicker } from 'react-color'

function EditTask(props) {
  // タスク
  const [task, setTask] = useState('')
  // 入力チェック
  const [validated, setValidated] = useState('')
  // submitボタン
  const [submitButton] = useState(props.title)
  // color
  const [color, setColor] = useState('#f44336')

  // ダイアログタイトル
  const [title] = useState('項目の' + props.title)

  // カラー選択
  const handleColor = (color) => {
    setColor(color.hex)
  }

  // submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // 入力チェック
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()

      // 入力チェック
      setValidated('was-validated')

      return
    }

    props.modalObj.hide()
  }

  // タスク名変更時
  const onChangeTask = (e) => {
    setTask(e.target.value)
  }

  return (
    <div className="modal fade" id="editTaskModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4>
              <div className="modal-title">{title}</div>
            </h4>
          </div>
          <form className={validated} onSubmit={handleSubmit} noValidate>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="sname" className="form-label">
                  項目名
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="名前を入力"
                  value={task}
                  onChange={onChangeTask}
                  required
                />
                <div className="invalid-feedback">項目名を入力して下さい</div>
              </div>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="sname" className="form-label">
                  カラー
                </label>
                <CirclePicker color={color} width={'auto'} circleSize={38} onChangeComplete={handleColor} />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                閉じる
              </button>
              <button type="submit" className="btn btn-primary">
                {submitButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTask
