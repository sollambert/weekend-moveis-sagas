import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function EditDetails({ clearDetails, movieDetails, handleEditing }) {

    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres.genres);
    const loading = useSelector(store => store.genres.loading);
    const [values, setValues] = useState({ 
        title: '', 
        description: '', 
        poster: '',
        genre_ids: []
    });

    const [radios, setRadios] = useState([]);

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
        setValues({...values, ...movieDetails});
    }, [])

    //handle input change
    const handleChange = (e, key, genre_id) => {
        if (key == 'genres') {
            // console.log(e.target.value);
            setRadios(radios.map((radioValue) => {
                if (radioValue[e.target.value] != undefined) {
                    // console.log(radioValue[e.target.value])
                    console.log(values);
                    if (values.genre_ids.includes(genre_id)
                    && radioValue[e.target.value] == true) {
                        setValues({...values, genre_ids: values.genre_ids.filter((genre) => {
                            // console.log(genre)
                            if (genre != genre_id) {
                                return genre_id;
                            }
                        })});
                    }
                    else if (!values.genre_ids.includes(e.target.value)
                    && radioValue[e.target.value] == false) {
                        setValues({ ...values, [key]: values.genre_ids.push(genre_id) });
                    }
                    // console.log(radios);
                    // console.log(radioValue);
                    radioValue[e.target.value] = !radioValue[e.target.value];
                    return radioValue;
                } else {
                    return radioValue;
                }
            }))
        } else {
        setValues({ ...values, [key]: e.target.value });
        }
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

    console.log(radios);
    return (
        <>
        {((!loading) && radios.length == 0) ?
            setRadios(genres.map((genre) => {
                if (movieDetails.genres.includes(genre.name)) {
                    return { [genre.name]: true }
                } else {
                    return { [genre.name]: false }
                }
            }))
        : ''}
        {!loading && radios.length != 0 ?
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
                    <div>
                        {genres.map((genre) => {
                            return (
                                <div key={genre.id}>
                                    <label>{genre.name}</label>
                                    <input name={genre.name}
                                        type="radio"
                                        value={genre.name}
                                        checked={radios[genre.id - 1][genre.name]}
                                        onClick={e => handleChange(e, 'genres', genre.id)} />
                                </div>
                            )
                        })}
                    </div>
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
        : ''}
        </>
    )
}

export default EditDetails;