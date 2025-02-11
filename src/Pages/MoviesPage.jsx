import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import Pagination from 'react-bootstrap/Pagination';
import { Spinner } from "react-bootstrap";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(500);
  const [loading, setLoading] = useState(true);


  const fetchMovies = () => {
    setLoading(true);
    fetch("https://api.themoviedb.org/3/discover/movie?language=fr&page="+page ,{
      method: "GET",
      headers: {
        Authorization : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDczNTRkNzZiZTM2NTcxODY4NDcyZGZhZWUyN2Q4NyIsIm5iZiI6MTY0Njk4ODUwNS4xMjgsInN1YiI6IjYyMmIwY2Q5ZDY4MTliMDAxYjVhMjUwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yag79kgVwxdazfAOqQIOXnt1G7xh8MUbSf5EARMpv9Q"
      }
    })
    .then(response => response.json())
    .then(data => { 
      // setTotalPages(data.total_pages);
      setMovies(data.results);
      setLoading(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }).catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    fetchMovies();
  }, [page]);

  

  return <>
    <h2 className="text-center mb-3" style={{ color: "white", fontSize: "3rem" }}>Films</h2>
    {loading == true ? <>
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="grow" variant="primary"/>
      </div>
    </> : <>
      <div className='d-flex flex-wrap gap-3 justify-content-center'>
        {movies.map((movie, index) => (
          <MovieCard key={index} image={movie.poster_path} title={movie.title} descritpion={movie.overview} id={movie.id} />
        ))}
      </div>
      <Pagination className="justify-content-center mt-5 pb-3">
        {page > 1 && <>
          <Pagination.First onClick={() => { setPage(1) } } />
          <Pagination.Prev onClick={() => { setPage( page - 1 ) } }/>
          <Pagination.Item onClick={() => { setPage(1) } } >{1}</Pagination.Item>
        </>}

        {(page - 5) >= 1 && <>
          <Pagination.Ellipsis onClick={() => { setPage(page - 5 ) } } />
        </>}

        {/* {page > 1 && <>
          <Pagination.Item onClick={() => { setPage(page - 1) } } >{page - 1}</Pagination.Item>
        </>} */}


        <Pagination.Item active>{page}</Pagination.Item>

        {/* {page < totalPages && <>
          <Pagination.Item onClick={() => { setPage(page + 1) } } >{page + 1}</Pagination.Item>
        </>} */}

        {(page + 5) <= totalPages && <>
          <Pagination.Ellipsis onClick={() => { setPage(page + 5) } } />
        </>}


        {page < totalPages && <>
          <Pagination.Item onClick={() => { setPage(totalPages) } } >{totalPages}</Pagination.Item>
          <Pagination.Next onClick={() => { setPage(page + 1) } } />
          <Pagination.Last onClick={() => { setPage(totalPages) } }/>
        </>}

      </Pagination>
    </>}

    
  </>;
}

export default MoviesPage;