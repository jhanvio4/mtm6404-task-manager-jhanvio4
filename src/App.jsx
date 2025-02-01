import './App.css';
import Navbar from './component/Navbar';
import Tasks from './component/Tasks';
import Footer from './component/Footer';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff9800",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Tasks />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
