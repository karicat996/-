import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainRouter from './routes/MainRouter'
  
createRoot(document.getElementById('root')!).render(
  <div>
  <StrictMode>
    <MainRouter/>
  </StrictMode>,
  </div>
)
