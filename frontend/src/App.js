import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Home from './pages/home';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
       {/* <Route path="*" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>


  );
}

export default App;
