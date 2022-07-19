import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from './pages/AdminRoom';
import { AuthContextProvider } from './contexts/AuthContext'
import Header from './components/Header';
import GlobalStyle from './styles/global';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import usePersistedState from './hooks/usePersistedState';

function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);

  const toggleTheme = () =>{
    setTheme(theme.title === 'light' ? dark : light);
  };
  return (
    
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <div className="App">
      <GlobalStyle/>
      <Header toggleTheme={toggleTheme}/>
      </div>
      
      <AuthContextProvider>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/rooms/new" element={<NewRoom/>} />
              <Route path="/rooms/:id" element={<Room/>} />
              
              
              <Route path="/admin/rooms/:id" element={<AdminRoom/>} />
          </Routes>
       </AuthContextProvider> 
       </ThemeProvider> 
   </BrowserRouter>
  );
}

export default App;
