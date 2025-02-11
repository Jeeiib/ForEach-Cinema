import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { useParams } from "react-router-dom";
import PeopleCard from "../Components/PeopleCard";
import MovieCard from "../Components/MovieCard";

const MoviePage = (props) => {
  const { name } = useParams();
  const [movie, setMovie] = useState({});
  const [providers, setProviders] = useState([]);
  const [credits, setCredits] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

  const fetchMovieById = () => {
    fetch("https://api.themoviedb.org/3/movie/" + name + "?language=fr", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDczNTRkNzZiZTM2NTcxODY4NDcyZGZhZWUyN2Q4NyIsIm5iZiI6MTY0Njk4ODUwNS4xMjgsInN1YiI6IjYyMmIwY2Q5ZDY4MTliMDAxYjVhMjUwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yag79kgVwxdazfAOqQIOXnt1G7xh8MUbSf5EARMpv9Q",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchProviders = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        name +
        "/watch/providers?language=fr",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDczNTRkNzZiZTM2NTcxODY4NDcyZGZhZWUyN2Q4NyIsIm5iZiI6MTY0Njk4ODUwNS4xMjgsInN1YiI6IjYyMmIwY2Q5ZDY4MTliMDAxYjVhMjUwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yag79kgVwxdazfAOqQIOXnt1G7xh8MUbSf5EARMpv9Q",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProviders(data.results?.FR?.flatrate || []);
      });
  };

  useEffect(() => {
    fetchProviders();
  }, [name]);

  const fetchCreditsByMovieId = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/" + name + "/credits?language=fr",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDczNTRkNzZiZTM2NTcxODY4NDcyZGZhZWUyN2Q4NyIsIm5iZiI6MTY0Njk4ODUwNS4xMjgsInN1YiI6IjYyMmIwY2Q5ZDY4MTliMDAxYjVhMjUwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yag79kgVwxdazfAOqQIOXnt1G7xh8MUbSf5EARMpv9Q",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCredits(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

const fetchSimilarMovies = () => {
    fetch("https://api.themoviedb.org/3/movie/" + name + "/similar?language=fr", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDczNTRkNzZiZTM2NTcxODY4NDcyZGZhZWUyN2Q4NyIsIm5iZiI6MTY0Njk4ODUwNS4xMjgsInN1YiI6IjYyMmIwY2Q5ZDY4MTliMDAxYjVhMjUwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yag79kgVwxdazfAOqQIOXnt1G7xh8MUbSf5EARMpv9Q",
        },
      })
       .then((response) => response.json())
         .then((data) => {
              console.log(data);
                setSimilarMovies(data.results);
            }).catch(error => {
                console.error(error);
            });
        }

  useEffect(() => {
    fetchMovieById();
    fetchCreditsByMovieId();
    fetchSimilarMovies();
  }, []);

  return (
    <>
      <h2 className="text-center" style={{ fontSize: "4rem", color: "white" }}>
        {movie.title}
      </h2>
      <div className="d-flex justify-content-between mt-5 align-items-center">
        <p style={{ color: "white", width: "40%", textAlign: "justify" }}>
          {movie.overview}
        </p>
        <img
          src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
          alt={movie.title}
          style={{ width: "50%" }}
        />
      </div>
      <div className="d-flex justify-content-between mt-5">
        <div
          className={"d-flex flex-column align-items-center gap-3"}
          style={{ width: "50%" }}
        >
          <h3 className="text-center" style={{ color: "white" }}>
            Genres
          </h3>
          <div
            className="d-flex gap-3 flex-wrap justify-content-center"
            style={{ width: "100%" }}
          >
            {movie.genres != undefined &&
              movie.genres.map((genre, index) => {
                return (
                  <Button
                    key={index}
                    variant="primary"
                    style={{ width: "30%" }}
                  >
                    {genre.name}
                  </Button>
                );
              })}
          </div>
        </div>
        <div
          className={"d-flex flex-column align-items-center gap-3"}
          style={{ width: "40%" }}
        >
          <div
            className="d-flex gap-3 justify-content-between align-items-center"
            style={{
              width: "100%",
              border: "1px solid white",
              padding: "10px",
              borderRadius: "20px",
            }}
          >
            <div style={{ color: "white" }}>Note</div>
            <div style={{ color: "white" }}>{movie.vote_average}/10</div>
          </div>
          <div
            className="d-flex gap-3 justify-content-between align-items-center"
            style={{
              width: "100%",
              border: "1px solid white",
              padding: "10px",
              borderRadius: "20px",
            }}
          >
            <div style={{ color: "white" }}>Date de sortie</div>
            <div style={{ color: "white" }}>
              {new Date(movie.release_date).toLocaleDateString("fr")}
            </div>
          </div>
          <div
            className="d-flex gap-3 justify-content-between align-items-center"
            style={{
              width: "100%",
              border: "1px solid white",
              padding: "10px",
              borderRadius: "20px",
            }}
          >
            <div style={{ color: "white" }}>Budget</div>
            <div style={{ color: "white" }}>{movie.budget}$</div>
          </div>
          <div
            className="d-flex gap-3 justify-content-between align-items-center"
            style={{
              width: "100%",
              border: "1px solid white",
              padding: "10px",
              borderRadius: "20px",
            }}
          >
            <div style={{ color: "white" }}>Revenue</div>
            <div style={{ color: "white" }}>{movie.revenue}$</div>
          </div>
          <div
            className="d-flex gap-3 justify-content-between align-items-center"
            style={{
              width: "100%",
              border: "1px solid white",
              padding: "10px",
              borderRadius: "20px",
            }}
          >
            <div style={{ color: "white" }}>Film +18</div>
            <div style={{ color: "white" }}>
              {movie.adult == true ? "Oui" : "Non"}
            </div>
          </div>
          <div
            className="d-flex gap-3 justify-content-between align-items-center"
            style={{
              width: "100%",
              border: "1px solid white",
              padding: "10px",
              borderRadius: "20px",
            }}
          >
            <div style={{ color: "white" }}>Disponible sur</div>
            <div style={{ color: "white", display: "flex", gap: "10px" }}>
              {providers.length > 0
                ? providers.map((provider, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    />
                  ))
                : "Non disponible en streaming"}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-center mt-5" style={{ fontSize: "3rem", color: "white" }}>Acteurs</h2>
{credits.cast && <Carousel
         // className='mt-auto mb-auto w-90vh'
         swipeable={true}
         draggable={false}
         showDots={false}
         responsive={responsive}
         ssr={true} // means to render carousel on server-side.
         infinite={true}
         autoPlay={props.deviceType !== "mobile" ? true : false}
         autoPlaySpeed={2500}
         keyBoardControl={true}
         customTransition="all .5"
         transitionDuration={500}
         containerClass="carousel-container"
         removeArrowOnDeviceType={[]}
         deviceType={props.deviceType}
         dotListClass="custom-dot-list-style"
         itemClass="carousel-item-padding-40-px"
     >
         {credits.cast.map((stars, index) => {
         return <div key={index} className="d-flex  flex-column align-items-center gap-3">
         <PeopleCard id={stars.id} name={stars.name} profile_path={stars.profile_path} /> </div>
})}
     </Carousel> }
          <h2 className="text-center mt-5" style={{ fontSize: "3rem", color: "white" }}>Equipe</h2>
    {credits.crew && <Carousel
                // className='mt-auto mb-auto w-90vh'
                swipeable={true}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={2500}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={[]}
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {credits.crew.map((stars, index) => {
                return <div key={index} className="d-flex  flex-column align-items-center gap-3">
                <PeopleCard id={stars.id} name={stars.name} profile_path={stars.profile_path} /> </div>
     })}
     </Carousel> }
     <h2 className="text-center mt-5" style={{ fontSize: "3rem", color: "white" }}>Films similaires</h2>
    {similarMovies && <Carousel
                // className='mt-auto mb-auto w-90vh'
                swipeable={true}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={2500}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={[]}
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {similarMovies.map((movie, index) => {
                    return <div key={index} className="d-flex  flex-column align-items-center gap-3">
                    <MovieCard  id={movie.id} descritpion={movie.overview} image={movie.poster_path} title={movie.title} /> </div>
     })}
     </Carousel> }
    
    </>
  );
};

export default MoviePage;
