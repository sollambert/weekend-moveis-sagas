import { Link } from "react-router-dom";

function DetailsDisplay({movieDetails, handleEditing, clearDetails}) {
return (
    <div>
        <div>
            <button onClick={handleEditing}>Edit Entry</button>
        </div>
        <h1>{movieDetails.title}</h1>
        <img src={movieDetails.poster} width='185' height='274' />
        <ul>
            {movieDetails.genres.map((genre, i) => {
                return <li key={i} >{genre}</li>
            })}
        </ul>
        <p>{movieDetails.description}</p>
        <Link to="/" onClick={clearDetails}>HOME</Link>
    </div>
    )
}

export default DetailsDisplay;