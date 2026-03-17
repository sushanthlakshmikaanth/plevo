import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Announcement from './pages/Announcement'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"     element={<Announcement />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
