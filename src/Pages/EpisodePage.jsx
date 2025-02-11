 import { useParams } from "react-router-dom";
 import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import PeopleCard from "../Components/PeopleCard";

 const EpisodePage = (props) => {
   const { serieId, seasonNumber, episodeNumber } = useParams();
   const [episode, setEpisode] = useState({});
   const [loading, setLoading] = useState(true);

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

   const fetchEpisode = async () => {
    setLoading(true);
     fetch(
       `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}/episode/${episodeNumber}?language=fr`,
       {
         headers: {
           Authorization:
             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDczNTRkNzZiZTM2NTcxODY4NDcyZGZhZWUyN2Q4NyIsIm5iZiI6MTY0Njk4ODUwNS4xMjgsInN1YiI6IjYyMmIwY2Q5ZDY4MTliMDAxYjVhMjUwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yag79kgVwxdazfAOqQIOXnt1G7xh8MUbSf5EARMpv9Q",
         }
       }
     )

     .then ((response) => response.json())
     .then((data) => {
         console.log(data);
         setEpisode(data);

       }).catch(error => {
         console.error(error);
       });
     }

     useEffect(() => {
        fetchEpisode();
    }, []);
    
    return <>
    <h2 className="text-center" style={{ fontSize: "4rem", color: "white" }}>
        {episode.name}
        </h2>
        <div className="d-flex justify-content-between mt-5 align-items-center">
            <div className="d-flex flex-column gap-3" style={{ width: "40%" }}>
            <p style={{ color: "white", textAlign: "justify" }}>{episode.overview}</p>
                <div className="d-flex gap-3 justify-content-between align-items-center" 
                    style={{width: "100%", border : "1px solid white", padding: "10px", borderRadius: "20px"}}>
                    <div style={{color: "white"}}>Note</div>
                    <div style={{color: "white"}}>{episode.vote_average}/10</div>
                </div>
                <div className="d-flex gap-3 justify-content-between align-items-center" 
                    style={{width: "100%", border : "1px solid white", padding: "10px", borderRadius: "20px"}}>
                    <div style={{color: "white"}}>Première diffusion</div>
                    <div style={{color: "white"}}>{episode.air_date ? new Date(episode.air_date).toLocaleDateString("fr") : "Pas de date"}</div>
                </div>
        </div>
            <img src={"https://image.tmdb.org/t/p/original"+episode.still_path} alt={episode.name} style={{ width: "50%" }} />
    </div>
    <h2 className="text-center mt-5" style={{ fontSize: "3rem", color: "white" }}>Acteurs</h2>
    {episode.guest_stars && <Carousel
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
                {episode.guest_stars && episode.guest_stars.map((stars, index) => {
                return <div key={index} className="d-flex  flex-column align-items-center gap-3">
                <PeopleCard  id={stars.id} name={stars.name} profile_path={stars.profile_path} /> </div>
     })}
            </Carousel> }
            <h2 className="text-center mt-5" style={{ fontSize: "3rem", color: "white" }}>Equipe</h2>
    {episode.crew && <Carousel
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
                {episode.crew.map((stars, index) => {
                return <div key={index} className="d-flex  flex-column align-items-center gap-3">
                <PeopleCard id={stars.id} name={stars.name} profile_path={stars.profile_path} /> </div>
     })}
            </Carousel> }
    </>;

   };

 export default EpisodePage;