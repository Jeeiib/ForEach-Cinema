import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PeopleCard = ({name, profile_path, id}) => {
    const navigate = useNavigate();

    return <>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={"https://image.tmdb.org/t/p/original"+profile_path} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Button variant="primary" onClick={ ()=> { navigate("/people/"+id) } }>Voir People</Button>
            </Card.Body>
        </Card>
    </>;
}
 
export default PeopleCard;