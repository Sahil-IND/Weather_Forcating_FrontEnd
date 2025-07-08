import { createRoutesFromElements,createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from '../pages/Home.jsx'
import CityWeather from '../pages/CityWeather.jsx'
import LocationWeather from '../pages/LocationWeather.jsx'


function App() {
  const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/city-weather' element={<CityWeather />} />
      <Route path='/location-weather' element={<LocationWeather />} />
      {/* <Route path='about' element={<About />} /> */}
    </Route>
  )
)

  return (
    <RouterProvider router={router} />
  )
}

export default App
