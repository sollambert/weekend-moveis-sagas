import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MovieForm() {

    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);

    useEffect(() => {
        dispatch({type: 'FETCH_GENRES'});
    }, []);

    const [input, setInput] = useState({
        title: '',
        description: '',
        poster: '',
        genre_id: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        dispatch({type: "SUBMIT_MOVIE", payload: input});
        clearInput();
    }

    const handleChange = (e, key) => {
        setInput({ ...input, [key]: e.target.value });
    }

    const clearInput = () => {
        setInput({
            title: '',
            description: '',
            poster: '',
            genre_id: 1,
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Title" value={input.title}
                        onChange={e => handleChange(e, 'title')} />
                </div>
                <div>
                    <textarea rows="5" cols="40" value={input.description} placeholder="Description..."
                        onChange={e => handleChange(e, 'description')}></textarea>
                </div>
                <input type="text" placeholder="Poster URL" value={input.poster}
                    onChange={e => handleChange(e, 'poster')} />
                <input type="submit" value="SUBMIT" onClick={handleSubmit} />
                <select value={input.genre_id} onChange={(e) => handleChange(e, 'genre_id')}>
                    {genres.map((genre) => {
                        return <option key={genre.id} value={genre.id}>{genre.name}</option>
                    })}
                </select>
            </form>
        </div>
    )
}

export default MovieForm;