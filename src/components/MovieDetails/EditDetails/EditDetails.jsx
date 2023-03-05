import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function EditDetails({ clearDetails, movieDetails, handleEditing }) {

    useEffect(() => {
        setValues(movieDetails);
    },[])
    
    const dispatch = useDispatch();
    const [values, setValues] = useState({ title: '', description: '' });

    const handleChange = (e, key) => {
        setValues({ ...values, [key]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        dispatch({type: "SUBMIT_DETAIL_EDIT", payload: values, callback: handleEditing});
    }
    
    return (
        <div>
            <form>
                <div>
                    <input type="submit" value="Save Entry" onClick={handleSubmit}/>
                    <input type="button" value="Cancel Edit" onClick={handleEditing} />
                </div>
                <div>
                    <input type="text"
                        value={values.title}
                        onChange={e => handleChange(e, 'title')} />
                </div>
                <img src={movieDetails.poster} width='185' height='274' />
                <ul>
                    {movieDetails.genres.map((genre, i) => {
                        return <li key={i} >{genre}</li>
                    })}
                </ul>
                <div>
                    <textarea
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