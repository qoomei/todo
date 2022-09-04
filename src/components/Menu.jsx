import { useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import MakeMenu from './MakeMenu'

const auth = getAuth()

function Menu(props) {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMenu = (menu) => {
    console.log(menu)
  }

  const handleLogout = () => {
    signOut(auth)
    props.setAccount(null)
  }

  return (
    <div className="modal fade" id="menuModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="menu mb-3">
              <MakeMenu handleMenu={handleMenu} label={'買い物リスト'} handle={'shop'} />
              <MakeMenu handleMenu={handleMenu} label={'チェックリスト'} handle={'check'} />
              <MakeMenu handleMenu={handleMenu} label={'持ち物リスト'} handle={'belongings'} />
              <button type="button" className="btn btn-link" data-bs-dismiss="modal" onClick={handleLogout}>
                ログアウト
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
