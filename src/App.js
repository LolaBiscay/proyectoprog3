import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './screens/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Favoritos from './screens/Favorites/Favorites';
import PeliculasPopulares from './components/PeliculasPopulares/PeliculasPopulares'
import SeriesPopulares from './components/SeriesPopulares/SeriesPopulares'
import DetallePeli from './components/DetallePeli/DetallePeli'
import DetalleSerie from './components/DetalleSerie/DetalleSerie'
import './App.css'
import NotFound from './screens/NotFound/NotFound';


function App() {
  return (
    <React.Fragment>
      <Header/>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/favoritos" component={Favoritos} />
          <Route path="/detallePeli/:id" component={DetallePeli} />
          <Route path="/detalleSerie/:id" component={DetalleSerie} />
          <Route path="/peliculasPopulares" component={PeliculasPopulares} />
          <Route path="/seriesPopulares" component={SeriesPopulares} />
          <Route path="" component={NotFound} />

        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
