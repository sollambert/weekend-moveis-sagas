import { useState } from 'react';
import { useDispatch } from 'react-redux';

function MovieForm() {

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        title: '',
        description: '',
        poster: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <textarea rows="5" cols="45" value={input.description} placeholder="Description..."
                        onChange={e => handleChange(e, 'description')}></textarea>
                </div>
                <input type="text" placeholder="Poster URL" value={input.poster}
                    onChange={e => handleChange(e, 'poster')} />
                <input type="submit" value="SUBMIT" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default MovieForm;