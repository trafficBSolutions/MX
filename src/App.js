import { Routes, Route } from 'react-router-dom'
import { Home, Signs, Adhesive, Banner, Window, FleetGraphics, Logo, Contact, Decal, Shirt, Web, Error } from './pages';
import axios from 'axios';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'https://mx-server-epo1.onrender.com';
axios.defaults.withCredentials = true
function App() {
  return (
    <>
     <Navbar />
     <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<Error/>}/>
      <Route path="/custom-signs" element={<Signs/>}/>
      <Route path="/drywall-floor-concrete" element={<Adhesive/>}/>
      <Route path="/banners" element={<Banner/>}/>
      <Route path="/window-frost-tint" element={<Window/>}/>
      <Route path="/fleet-graphics" element={<FleetGraphics/>}/>
      <Route path="/new-logo" element={<Logo/>}/>
      <Route path="/contact-us" element={<Contact/>}/>
      <Route path="/decals-stickers" element={<Decal/>}/>
      <Route path="/t-shirts-sweatshirts-jackets" element={<Shirt/>}/>
      <Route path="/new-website" element={<Web/>}/>
     </Routes>
    </>
  )
}

export default App;
