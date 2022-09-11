import { useState, useEffect } from 'react'

import { CirclePicker } from 'react-color'
import { db } from './firebaseConfig'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'

function EditTask(props) {
  // タスク名
  const [taskName, setTaskName] = useState('')
  // color
  const [color, setColor] = useState('#f44336')
  // 入力チェック
  const [validated, setValidated] = useState('')

  // ダイアログタイトル
  const [title, setTitle] = useState('項目の' + props.title)

  // タイトル
  useEffect(() => {
    setTitle('項目の' + props.title)
  }, [props.title])

  // ダイアログ更新
  useEffect(() => {
    if (props.title === '追加') {
      setTaskName('')
      setColor('#f44336')
    } else {
      const target = props.targetTask
      setTaskName(target.task)
      setColor(target.color)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.updateEditTask])

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

    // DBに反映
    if (props.title === '追加') {
      const colRef = collection(db, 'account', props.account, props.category)
      addDoc(colRef, { index: props.task.length, task: taskName, color: color, checked: false })
    } else {
      const docRef = doc(db, 'account', props.account, props.category, props.targetTask.docid)
      updateDoc(docRef, {
        task: taskName,
        color: color,
      })
    }

    // ダイアログを閉じる
    props.modalObj.hide()
  }

  // タスク名変更時
  const onChangeTaskName = (e) => {
    setTaskName(e.target.value)
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
                  value={taskName}
                  onChange={onChangeTaskName}
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
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTask
