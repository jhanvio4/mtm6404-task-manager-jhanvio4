import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from '@mui/material/Container';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Lists from './components/Lists';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff9800" },
  },
});

function App() {
  const menuItems = ["Dashboard", "About Us", "Tasks", "Contact"];

  return (
    <TaskProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tasks/:listId" element={<Tasks />} />
            </Routes>
          </Container>
          <Footer />
        </ThemeProvider>
      </Router>
    </TaskProvider>
  );
}

export default App;
