import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SeasonPage = () => {
  const { serieId, seasonNumber } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEpisodes = () => {
    fetch(
      `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}?language=fr`,
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
        setEpisodes(data.episodes);
        setLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEpisodes();
  }, [serieId, seasonNumber]);

  if (loading) {
    return <div style={{ color: "white" }}>Chargement...</div>;
  }

  return (
    <>
      <h2 className="text-center" style={{ fontSize: "4rem", color: "white" }}>
        Saison {seasonNumber}
      </h2>
      <div className="d-flex flex-wrap gap-4 justify-content-center mt-5 episode">
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className="d-flex flex-column gap-2"
            style={{ width: "300px" }} onClick={()=>{navigate("/serie/"+serieId+"/season/"+seasonNumber+"/episode/"+episode.episode_number)}}
          > 
            <img
              src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
              alt={episode.name}
              style={{ width: "100%" }}
            />
            <h3 style={{ color: "white" }}>
              Episode {episode.episode_number} : {episode.name}
            </h3>
            <p style={{ color: "white" }}>{episode.overview}</p>
            <p style={{ color: "white",border: "1px solid white",padding: "10px",borderRadius: "20px",textAlign: "center",width: "100%"}}> Note: {episode.vote_average?.toFixed(1)}/10</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SeasonPage;
