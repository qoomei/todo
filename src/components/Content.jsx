import { useEffect, useState } from 'react'
import { Modal } from 'bootstrap/dist/js/bootstrap.esm.min.js'
import { db } from './firebaseConfig'
import { doc, collection, query, setDoc, orderBy, onSnapshot } from 'firebase/firestore'
import { ReactSortable } from 'react-sortablejs'
import styled from 'styled-components'
import { AiOutlineMenu } from 'react-icons/ai'

import GoogleLogout from './GoogleLogout'
import AddTask from './AddTask'
import EditTask from './EditTask'
import Footer from './Footer'

import '../style.min.css'
import ToTrash from './ToTrash'

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

function Content(props) {
  const [task, setTask] = useState([])
  const [editTaskModalObj, setEditTaskModalObj] = useState(null)
  const [toTrashModalObj, setToTrashModalObj] = useState(null)

  useEffect(() => {
    const editTaskModal = document.getElementById('editTaskModal')
    setEditTaskModalObj(new Modal(editTaskModal))

    const toTrashModal = document.getElementById('toTrashModal')
    setToTrashModalObj(new Modal(toTrashModal))

    getTasks()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // タスク読み込み
  const getTasks = () => {
    const colRef = collection(db, 'account', props.account, 'task1')
    const q = query(colRef, orderBy('index'))
    return onSnapshot(q, async (snapshot) => {
      let taskData = []
      await snapshot.forEach((document) => {
        const doc = document.data()
        taskData.push({ docid: document.id, index: doc.index, task: doc.task, color: doc.color, checked: doc.checked })
      })
      setTask(taskData)
    })
  }

  // タスク更新
  useEffect(() => {
    task.forEach((item, index) => {
      const docRef = doc(db, 'account', props.account, 'task1', item.docid)
      setDoc(docRef, { index: index, task: item.task, color: item.color, checked: item.checked })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task])

  // タスク全削除
  // const removeTask1 = async () => {
  //   const colRef = collection(db, 'account', props.account, 'task1')
  //   const q = query(colRef)
  //   const querySnapshot = await getDocs(q)
  //   querySnapshot.forEach(async (document) => {
  //     const userDocumentRef = doc(db, 'account', props.account, 'task1', document.id)
  //     await deleteDoc(userDocumentRef)
  //   })
  // }

  // タスククリック時
  const handleClickTaskItem = (e) => {
    // console.log(e.currentTarget)
  }

  // タスクチェックボックス変化時
  const onChangeTaskItem = (e) => {
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
      <Footer modalObj={toTrashModalObj} task={task} setTask={setTask} />
      <AddTask modalObj={editTaskModalObj} />
      <EditTask modalObj={editTaskModalObj} account={props.account} task={task} setTask={setTask} title="追加" />
      <ToTrash modalObj={toTrashModalObj} account={props.account} task={task} setTask={setTask} />
      <GoogleLogout account={props.account} setAccount={props.setAccount} />
    </div>
  )
}

export default Content
