import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './Page/MainPage';
import Main from './Page/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
