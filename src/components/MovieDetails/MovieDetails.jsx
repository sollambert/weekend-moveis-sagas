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

    const movieDetails = useSelector(store => store.movieDetails);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: id });
    }, []);

    const clearDetails = () => {
        dispatch({ type: 'CLEAR_DETAILS' });
    }

    const handleEditing = () => {
        setEditing(!editing);
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
                                handleEditing={handleEditing}
                                clearDetails={clearDetails}/>
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