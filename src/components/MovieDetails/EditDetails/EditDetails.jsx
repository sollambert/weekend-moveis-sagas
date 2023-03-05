import { Link } from "react-router-dom";

function EditDetails({ clearDetails, movieDetails, handleChange, handleEditing, values }) {
    return (
        <div>
            <form>
                <div>
                    <input type="submit" value="Save Entry" />
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