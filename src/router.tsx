import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { DptPage } from './features/dpt/pages/DptPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <DptPage />
      }
    ]
  }
])
