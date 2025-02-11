import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SerieCard from './SerieCard';
import { useEffect, useState } from 'react';

const CarouselSeries = (props) => {
    const [series, setSeries] = useState([]);
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

    const fetchSeriesTopRated = () => {
        fetch('https://api.themoviedb.org/3/tv/top_rated?language=fr', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDczNTRkNzZiZTM2NTcxODY4NDcyZGZhZWUyN2Q4NyIsIm5iZiI6MTY0Njk4ODUwNS4xMjgsInN1YiI6IjYyMmIwY2Q5ZDY4MTliMDAxYjVhMjUwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yag79kgVwxdazfAOqQIOXnt1G7xh8MUbSf5EARMpv9Q'
            }
        })
        .then(response => response.json())
        .then(data => setSeries(data.results))
        .catch(error => console.error(error));

    };
        useEffect(() => {
            fetchSeriesTopRated();
        }, []);

    return <>
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
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={[]}
            deviceType={props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
           {series.map((serie, index) => {
          return (
            <div
              key={index}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <SerieCard
                id={serie.id}
                description={serie.overview}
                image={serie.poster_path}
                title={serie.title}
              />
            </div>
          );
        })}
        </Carousel>
    </>;
}

export default CarouselSeries;