import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MovieCard = ({image, title, descritpion, id}) => {
    const navigate = useNavigate();


    return <>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={"https://image.tmdb.org/t/p/original"+image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text style={{ height: "100px", overflow: "hidden"}}>
                    {descritpion}
                </Card.Text>
                <Button variant="primary" onClick={ ()=> { navigate("/movie/"+id) } }>Voir film</Button>
            </Card.Body>
        </Card>
    </>;
}

export default MovieCard;