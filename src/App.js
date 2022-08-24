import classNames from 'classnames'
import { useEffect, useState } from 'react'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import { Modal } from 'bootstrap/dist/js/bootstrap.esm.min.js'
import './style.min.css'

const setVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
window.addEventListener('load', setVh)
window.addEventListener('resize', setVh)

function App() {
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
        <p>A</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>X</p>
        <p>Y</p>
        <p>Z</p>
      </div>
      <div className="container-fluid fixed-bottom d-flex align-items-center footer">.X.X.</div>
      <AddTask modalObj={editTaskModalObj} />
      <EditTask modalObj={editTaskModalObj} title="追加" />
    </div>
  )
}

export default App
