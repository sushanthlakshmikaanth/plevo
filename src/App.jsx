import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Announcement from './pages/Announcement'
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Announcement />} />
        <Route path="/home"  element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
