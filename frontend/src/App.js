import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Home from './pages/home';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
       {/* <Route path="*" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>


  );
}

export default App;
