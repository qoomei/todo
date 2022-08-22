import classNames from 'classnames'
import { useState } from 'react'
import './style.min.css'

function App() {
  const [status, setStatus] = useState('progress')
  const statusClassNames = {
    pazzle: true,
    progress: status === 'progress',
    creared: status === 'creared',
  }

  return (
    <div className="App">
      <div className="container"></div>
      <div className={classNames(statusClassNames)}></div>
    </div>
  )
}

export default App
