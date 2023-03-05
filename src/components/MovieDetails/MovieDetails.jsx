import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SyncLoader } from 'react-spinners';

import DetailsDisplay from './DetailsDisplay/DetailsDisplay';
import EditDetails from './EditDetails/EditDetails';

function MovieDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [values, setValues] = useState({ title: '', description: '' });


    const movieDetails = useSelector(store => store.movieDetails);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: id });
    }, []);

    const handleChange = (e, key) => {
        setValues({ ...values, [key]: e.target.value });
    }

    const clearDetails = () => {
        dispatch({ type: 'CLEAR_DETAILS' });
    }

    const handleEditing = () => {
        setValues(movieDetails);
        setEditing(!editing);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            {
                movieDetails.loading ?
                    <SyncLoader color={'#a0a0a0'} />
                    :
                    <>
                        {editing ?
                            <EditDetails
                                movieDetails={movieDetails}
                                handleChange={handleChange}
                                handleEditing={handleEditing}
                                clearDetails={clearDetails}
                                values={values} />
                            :
                            <DetailsDisplay
                                movieDetails={movieDetails}
                                handleEditing={handleEditing}
                                clearDetails={clearDetails} />
                        }
                    </>
            }
        </>
    )
}

export default MovieDetails;