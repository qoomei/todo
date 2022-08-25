import classNames from 'classnames'
import { useEffect, useState } from 'react'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import { Modal } from 'bootstrap/dist/js/bootstrap.esm.min.js'
import { ReactSortable } from 'react-sortablejs'
import styled from 'styled-components'
import './style.min.css'

const setVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
window.addEventListener('load', setVh)
window.addEventListener('resize', setVh)

const StyledBlockWrapper = styled.div`
  position: relative;
  background: white;
  padding: 10px 20px;
  margin-bottom: 10px;
  border: 1px solid lightgray;
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
  const [status, setStatus] = useState('progress')
  const statusClassNames = {
    pazzle: true,
    progress: status === 'progress',
    creared: status === 'creared',
  }

  useEffect(() => {
    const editTaskModal = document.getElementById('editTaskModal')
    setEditTaskModalObj(new Modal(editTaskModal))
  }, [])

  return (
    <div className="App">
      <div className="container-fluid fixed-top d-flex align-items-center header">.X.X.</div>
      <div className="container fixed-top main">
        <div className={classNames(statusClassNames)}></div>
        <ReactSortable list={task} setList={setTask} {...sortableOptions}>
          {task.map((item, index) => {
            return (
              <div className="d-flex">
                <div className="color-label" style={{ backgroundColor: item.color }}></div>
                <StyledBlockWrapper className="block" key={index}>
                  <div>{item.task}</div>
                  <div className="my-handle">::</div>
                </StyledBlockWrapper>
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
