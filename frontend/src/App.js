import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/login';
import Register from './components/register';
import ChatUi from './components/chatUi';
import ProtectedRoute from './components/protectedRoute';
import './App.css';

function App() {
  const token = Cookies.get('jwt_token');
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route 
          exact 
          path='/chatui' 
          element={<ProtectedRoute component={ChatUi}  token={token} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
