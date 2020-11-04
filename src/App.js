import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Contact from './components/Contact';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  }
});

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Navbar collapseOnSelect expand="md">
          <Navbar.Brand as={Link} to="/">Portfolio</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="https://medium.com/@vanessaaleung">Blog</Nav.Link>
              <Nav.Link href="https://www.linkedin.com/in/vanessaaleung/">LinkedIn</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/contact' component={Contact} />
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
