import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnippetProvider } from './context/SnippetContext.jsx'

createRoot(document.getElementById('root')).render(
  <SnippetProvider>
    <App />
  </SnippetProvider>,
)
