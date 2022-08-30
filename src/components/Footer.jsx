import { BsTrash } from 'react-icons/bs'

function Footer(props) {
  // 全選択
  const handleSelect = () => {
    props.setTask((prev) => {
      const newTask = prev.map((val) => {
        return {
          docid: val.docid,
          index: val.index,
          task: val.task,
          color: val.color,
          checked: true,
        }
      })
      return newTask
    })
  }

  // 削除
  const handleTrash = () => {
    props.modalObj.show()
  }

  // 全解除
  const handleDeselect = () => {
    props.setTask((prev) => {
      const newTask = prev.map((val) => {
        return {
          docid: val.docid,
          index: val.index,
          task: val.task,
          color: val.color,
          checked: false,
        }
      })
      return newTask
    })
  }

  return (
    <div className="container-fluid fixed-bottom d-flex align-items-center footer">
      <div className="menu" onClick={handleSelect}>
        すべて選択
      </div>
      <div className="menu" onClick={handleTrash}>
        <BsTrash size={32} color={'#ffffff'} />
      </div>
      <div className="menu" onClick={handleDeselect}>
        すべて解除
      </div>
    </div>
  )
}

export default Footer
