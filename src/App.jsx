import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from '@mui/material/Container';
import './App.css'


const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff9800" },
  },
});

function App() {
  const menuItems = ["Dashboard", "About Us", "Tasks", "Contact"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar menuItems={menuItems} />
      <Container sx={{ mt: 4 }}>
        <Tasks />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
