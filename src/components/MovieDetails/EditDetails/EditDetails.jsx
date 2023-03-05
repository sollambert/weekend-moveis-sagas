import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function EditDetails({ clearDetails, movieDetails, handleEditing }) {

    const dispatch = useDispatch();
    const [values, setValues] = useState({ title: '', description: '', poster: ''});

    useEffect(() => {
        setValues(movieDetails);
    }, [])

    //handle input change
    const handleChange = (e, key) => {
        setValues({ ...values, [key]: e.target.value });
    }

    //submit the new changes for the movie to be updated on db
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "SUBMIT_DETAIL_EDIT", payload: values, callback: finishSubmit });
    }

    //callback for the SUBMIT_DETAIL_EDIT saga
    const finishSubmit = () => {
        handleEditing();
        clearDetails();
        dispatch({ type: "CLEAR_MOVIE_LIST" });
    }

    return (
        <div>
            <form>
                <div>
                    <input type="submit" value="Save Entry" onClick={handleSubmit} />
                    <input type="button" value="Cancel Edit" onClick={handleEditing} />
                </div>
                <div>
                    <label htmlFor="title">TITLE: </label>
                    <input name="title" type="text"
                        value={values.title}
                        onChange={e => handleChange(e, 'title')} />
                </div>
                <div>
                    <label htmlFor="poster">POSTER: </label>
                    <input name="poster" type="text"
                        value={values.poster}
                        onChange={e => handleChange(e, 'poster')} />
                </div>
                <img src={movieDetails.poster} width='185' height='274' />
                <ul>
                    {movieDetails.genres.map((genre, i) => {
                        return <li key={i} >{genre}</li>
                    })}
                </ul>
                <div>
                    <div>
                        <label htmlFor="description">DESCRIPTION</label>
                    </div>
                    <textarea
                        name="description"
                        rows="10"
                        cols="30"
                        onChange={e => handleChange(e, 'description')}
                        value={values.description} />
                </div>
            </form>
            <Link to="/" onClick={clearDetails}>HOME</Link>
        </div>
    )
}

export default EditDetails;