import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useParams } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
// ATTENTION AUX IMPORTS !!!!!!

const PeoplePage = (props) => {
  const { id } = useParams();
  const [people, setPeople] = useState({});
  const [movies, setMovies] = useState([]);
  // const page avec un use state
  // const totalPage avec un use state

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Créé une fonction fetchPeopleByID qui va chercher les informations
  // d'une personne en fonction de son ID
  //  https://api.themoviedb.org/3/person/ + id
  const fetchPeopleByID = () => {
    // Prendre en compte la page sur laquelle on est et la passer en parametre dans l'url ?page= + page
    fetch("https://api.themoviedb.org/3/person/" + id + "?language=fr", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDczNTRkNzZiZTM2NTcxODY4NDcyZGZhZWUyN2Q4NyIsIm5iZiI6MTY0Njk4ODUwNS4xMjgsInN1YiI6IjYyMmIwY2Q5ZDY4MTliMDAxYjVhMjUwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yag79kgVwxdazfAOqQIOXnt1G7xh8MUbSf5EARMpv9Q",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPeople(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchMoviesByPeopleID = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?language=fr&with_people=" +
        id,
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
        setMovies(data.results);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // mettre à jour le use effect pour prendre en compte le changement de page
  useEffect(() => {
    fetchPeopleByID();
    fetchMoviesByPeopleID();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center", fontSize: "4rem", color: "white" }}>
        {people.name}
      </h2>
      {/* Afficher les information récuperer de l'API exemple biography,birthday,
        deathday,gender, profile_path, place_of_birth, name, also_known_as */}
      <div className="d-flex justify-content-between mt-5 align-items-center">
        <img
          src={"https://image.tmdb.org/t/p/original" + people.profile_path}
          alt={people.name}
          style={{ width: "40%" }}
        />
        <div className="d-flex flex-column gap-3" style={{ width: "50%" }}>
          <div
            style={{
              color: "white",
              textAlign: "justify",
              maxHeight: "300px",
              overflow: "auto",
            }}
          >
            {people.biography}
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
            <div style={{ color: "white" }}>Date de naissance</div>
            <div style={{ color: "white" }}>
              {new Date(people.birthday).toLocaleDateString("fr")}
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
            <div style={{ color: "white" }}>Date de décès</div>
            <div style={{ color: "white" }}>
              {people.deathday
                ? new Date(people.deathday).toLocaleDateString("fr")
                : "Pas mort"}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 style={{ color: "white" }}>Films</h2>
        <Carousel
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
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={[]}
          deviceType={props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {movies?.map((movie) => {
            return (
              <MovieCard
                id={movie.id}
                description={movie.overview}
                image={movie.poster_path}
                title={movie.title}
                key={movie.id}
              />
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default PeoplePage;
