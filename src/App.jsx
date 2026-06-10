import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import MentionsLegales from './pages/MentionsLegales.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Terminal from './components/Terminal.jsx'
import MatrixRain from './components/MatrixRain.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    // HashRouter → compatibilité GitHub Pages sans erreur 404 au rechargement.
    <HashRouter>
      <ScrollToTop />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
      </Routes>
      {/* Easter eggs globaux */}
      <MatrixRain />
      <Terminal />
    </HashRouter>
  )
}
