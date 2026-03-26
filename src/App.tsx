import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage    from '@ds/screens/HomePage'
import ProjectPage from '@ds/screens/ProjectPage'
import AboutPage   from '@ds/screens/AboutPage'
import Aurora      from '@ds/components/Aurora/Aurora'
import { WORK }    from '@ds/data/work'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function AppRoutes() {
  const navigate = useNavigate()

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
        path="/"
        element={<HomePage onItemClick={(href: string) => navigate(href)} />}
      />
        <Route path="/about" element={<AboutPage onBack={() => navigate('/')} />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
      </Routes>
    </>
  )
}

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate  = useNavigate()
  const project   = WORK.find((w: { slug: string }) => w.slug === slug)

  if (!project) {
    return (
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
          Project not found.{' '}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/') }}
            style={{ color: 'var(--color-ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Go back
          </a>
        </p>
      </div>
    )
  }

  return (
    <ProjectPage
      project={project}
      onBack={() => navigate('/')}
    />
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Aurora />
      <AppRoutes />
    </BrowserRouter>
  )
}
