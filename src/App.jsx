import { Routes, Route, Link} from 'react-router-dom'
import { Home, Signs, Adhesive, Banner, Window, FleetGraphics } from './pages';
import axios from 'axios';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast'

/* axios.defaults.baseURL = 'https://tbs-server.onrender.com'; */
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true
function App() {
  return (
    <>
     <Navbar />
     <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/custom-signs" element={<Signs/>}/>
      <Route path="/drywall-floor-concrete" element={<Adhesive/>}/>
      <Route path="/banners" element={<Banner/>}/>
      <Route path="/window-frost-tint" element={<Window/>}/>
      <Route path="/fleet-graphics" element={<FleetGraphics/>}/>
     </Routes>
    </>
  )
}

export default App;