import {useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function MovieDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const movieDetails = useSelector(store => store.movieDetails);

    useEffect(() => {
        dispatch({type: 'FETCH_MOVIE_DETAILS', payload: id});
    }, []);

    return (
        <div>
            <h1>{movieDetails.title}</h1>
            <img src={movieDetails.poster}/>
            <p>{movieDetails.description}</p>
            <Link to="/">HOME</Link>
        </div>
    )
}

export default MovieDetails;