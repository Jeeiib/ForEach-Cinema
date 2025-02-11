import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import MoviesPage from './Pages/MoviesPage'
import MoviePage from './Pages/MoviePage'
import NavBar from './Components/NavBar';
import { Container } from 'react-bootstrap';
import PeoplesPage from './Pages/PeoplesPage';
import PeoplePage from './Pages/PeoplePage';
import SeriesPage from './Pages/SeriesPage';
import SeriePage from './Pages/SeriePage';
import SeasonPage from './Pages/SeasonPage';
import EpisodePage from './Pages/EpisodePage';


function App() {
  return <>
    <BrowserRouter>
      <NavBar />
      <Container className='mt-5'>
        <Routes>
          <Route path="/" element={<HomePage /> } />
          {/* <Route path="/" element={<HomePage></HomePage> } /> */}
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movie/:name' element={<MoviePage />} />
          <Route path='/peoples' element={<PeoplesPage />} />
          <Route path='/people/:id' element={<PeoplePage />} />
          <Route path='/series' element={<SeriesPage />} />
          <Route path ='/serie/:name' element={<SeriePage />} />
          <Route path ='/tv/:serieId/season/:seasonNumber' element={<SeasonPage />} />
          <Route path="/serie/:serieId/season/:seasonNumber/episode/:episodeNumber" element={<EpisodePage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </>
}

export default App
