import { useEffect, useState } from 'react'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import { Modal } from 'bootstrap/dist/js/bootstrap.esm.min.js'
import { ReactSortable } from 'react-sortablejs'
import styled from 'styled-components'
import { AiOutlineMenu } from 'react-icons/ai'
import './style.min.css'

const setVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
window.addEventListener('load', setVh)
window.addEventListener('resize', setVh)

const StyledTaskBody = styled.div`
  position: relative;
  background: white;
  padding: 8px 16px;
  margin-bottom: 10px;
  border-left-width: 0;
  border-radius: 0 10px 10px 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const sortableOptions = {
  animation: 300,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
  group: 'foo',
  handle: '.my-handle',
}

function App() {
  const [task, setTask] = useState([])
  const [editTaskModalObj, setEditTaskModalObj] = useState(null)

  useEffect(() => {
    const editTaskModal = document.getElementById('editTaskModal')
    setEditTaskModalObj(new Modal(editTaskModal))
  }, [])

  // タスククリック時
  const handleClickTaskItem = (e) => {
    // console.log(e.currentTarget)
  }

  // タスクチェックボックス変化時
  const onChangeTaskItem = (e) => {
    console.log(e.currentTarget.closest('.task-item').dataset.id)
    console.log(e.target.checked)
    const id = e.currentTarget.closest('.task-item').dataset.id
    const checked = e.target.checked
    const newTask = [...task]
    newTask[id].checked = checked
    setTask(newTask)
  }

  return (
    <div className="App">
      <div className="container-fluid fixed-top d-flex align-items-center header">.X.X.</div>
      <div className="container fixed-top main">
        <ReactSortable list={task} setList={setTask} {...sortableOptions}>
          {task.map((item, index) => {
            return (
              <div className="d-flex task-item" key={index} onClick={handleClickTaskItem}>
                <div className="color-label" style={{ backgroundColor: item.color }}></div>
                <StyledTaskBody className="block">
                  <div className="d-flex align-items-center">
                    <input type="checkbox" checked={item.checked} onChange={onChangeTaskItem} />
                    <div className="task-name">{item.task}</div>
                  </div>
                  <div className="my-handle">
                    <AiOutlineMenu size={32} color={'#999999'} />
                  </div>
                </StyledTaskBody>
              </div>
            )
          })}
        </ReactSortable>
      </div>
      <div className="container-fluid fixed-bottom d-flex align-items-center footer">.X.X.</div>
      <AddTask modalObj={editTaskModalObj} />
      <EditTask modalObj={editTaskModalObj} task={task} setTask={setTask} title="追加" />
    </div>
  )
}

export default App
