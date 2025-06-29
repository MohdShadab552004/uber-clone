import {Route, Routes } from 'react-router-dom'
import RideHomePage from './pages/RideHomePage'
import { UserProvider } from './context/UserContext'
import RidePage from './pages/RidePage'

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<RideHomePage />} />
        <Route path='/ride' element={<RidePage />} />
      </Routes>
    </UserProvider>
  )
}

export default App