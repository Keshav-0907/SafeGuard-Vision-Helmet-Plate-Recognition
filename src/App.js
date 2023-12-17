import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Addnew from './Pages/Addnew';
import './App.css';
import Navbar from './Components/Navbar';
import Alert from './Pages/Alert';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/addnew' element={<Addnew />} />
        <Route path='/alert' element={<Alert />} />
        <Route path="*" element={<h1>Not Found 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
