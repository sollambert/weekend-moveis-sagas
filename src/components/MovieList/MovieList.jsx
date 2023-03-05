import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleClick = (e, id) => {
        history.push(`/${id}`);
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div onClick={(e) => handleClick(e, movie.id)} key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} width='185' height='274' />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;