import { Fragment } from 'react';
import './App.css';
import Header from './components/Header'
import Search from './components/Search'
import Result from './components/Result'
import Footer from './components/Footer'

const App = () => {
  return (
    <Fragment className="App">
      <Header/>
      <Search/>
      <Result/>
    </Fragment>
  );
}

export default App;
