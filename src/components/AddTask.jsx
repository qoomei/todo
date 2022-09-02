import { AiOutlinePlus } from 'react-icons/ai'

function AddStudent(props) {
  const handleClick = (e) => {
    props.setEditTitle('追加')
    props.setUpdateEditTask((prev) => prev + 1)
    props.modalObj.show()
  }

  return (
    <div className="fixed-bottom add-task">
      <button type="button" id="editTask" className="btn btn-link" onClick={handleClick}>
        <AiOutlinePlus size={60} color={'white'} />
      </button>
    </div>
  )
}

export default AddStudent
