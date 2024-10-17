import { Routes, Route, Link} from 'react-router-dom'
import { Home, Signs, Adhesive, Banner, Window, FleetGraphics, About, Invoice, Service, Logo, Contact, Decal, Shirt, Web, Blog, Error } from './pages';
import axios from 'axios';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

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
      <Route path="/about-us" element={<About/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/services" element={<Service/>}/>
      <Route path="/custom-signs" element={<Signs/>}/>
      <Route path="/decals-stickers" element={<Decal/>}/>
      <Route path="/banners" element={<Banner/>}/>
      <Route path="/t-shirts-sweatshirts-jackets" element={<Shirt/>}/>
      <Route path="/drywall-floor-concrete" element={<Adhesive/>}/>
      <Route path="/window-frost-tint" element={<Window/>}/>
      <Route path="/fleet-graphics" element={<FleetGraphics/>}/>
      <Route path="/new-logo" element={<Logo/>}/>
      <Route path="/pay-invoice" element={<Invoice/>}/>
       <Route path="/new-website" element={<Web/>}/>
      <Route path="/contact-us" element={<Contact/>}/>
      <Route path="*" element={<Error/>}/>
     </Routes>
    </>
  )
}

export default App;
