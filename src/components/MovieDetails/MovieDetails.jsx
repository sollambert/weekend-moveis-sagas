import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SyncLoader } from 'react-spinners';

function MovieDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();
    

    const movieDetails = useSelector(store => store.movieDetails);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: id });
    }, []);

    const clearDetails = () => {
        dispatch({ type: 'CLEAR_MOVIE_DETAILS'});
    }

    return (
        <>
            {
                movieDetails.loading ?
                <SyncLoader color={'#a0a0a0'}/>
                :
                    <div>
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
            }
        </>
    )
}

export default MovieDetails;