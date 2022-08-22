import classNames from 'classnames'
import { useState } from 'react'
import './style.min.css'

const setVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
window.addEventListener('load', setVh)
window.addEventListener('resize', setVh)

function App() {
  const [status, setStatus] = useState('progress')
  const statusClassNames = {
    pazzle: true,
    progress: status === 'progress',
    creared: status === 'creared',
  }

  return (
    <div className="App">
      <div className="container-fluid fixed-top d-flex align-items-center header">.X.X.</div>
      <div className="container fixed-top main">
        <div className={classNames(statusClassNames)}></div>
        <p>A</p>
        <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>X</p>
        <p>Y</p>
        <p>Z</p>
      </div>
      <div className="container-fluid fixed-bottom d-flex align-items-center footer">.X.X.</div>
    </div>
  )
}

export default App
