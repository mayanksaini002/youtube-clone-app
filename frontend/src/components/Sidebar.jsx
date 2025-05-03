import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  MdHome,
  MdWhatshot,
  MdSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdWatchLater,
  MdThumbUp,
  MdPlaylistPlay,
  MdVideoCall
} from 'react-icons/md'
import './Sidebar.css'

const items = [
  { label: 'Home', icon: <MdHome />, route: '/' },
  { label: 'Shorts', icon: <MdVideoCall />, route: null },
  { label: 'Subscriptions', icon: <MdSubscriptions />, route: null },
  { divider: true },
  { label: 'Library', icon: <MdVideoLibrary />, route: null },
  { label: 'History', icon: <MdHistory />, route: null },
  { divider: true },
  { label: 'Your Videos', icon: <MdVideoLibrary />, route: null },
  { label: 'Watch Later', icon: <MdWatchLater />, route: null },
  { label: 'Liked Videos', icon: <MdThumbUp />, route: null },
  { label: 'Playlists', icon: <MdPlaylistPlay />, route: null }
]

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {items.map((it, idx) =>
        it.divider ? (
          <hr key={idx} className="divider" />
        ) : (
          <div
            key={it.label}
            className={
              'sidebar-item' + (pathname === it.route ? ' active' : '')
            }
            onClick={() => it.route && navigate(it.route)}
          >
            <span className="icon">{it.icon}</span>
            <span className="label">{it.label}</span>
          </div>
        )
      )}
    </aside>
  )
}

export default Sidebar
