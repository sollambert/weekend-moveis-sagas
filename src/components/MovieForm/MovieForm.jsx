import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function MovieForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres.genres);
    const loading = useSelector(store => store.genres.loading);

    const [radios, setRadios] = useState([]);

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    const [input, setInput] = useState({
        title: '',
        description: '',
        poster: '',
        genre_ids: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        if (input.title != ''
            && input.description != ''
            && input.poster != '') {
            dispatch({ type: "SUBMIT_MOVIE", payload: input, callback: clearInput });
            history.push('/');
        } else {
            alert('please fill out all fields')
        }
    }

    const handleChange = (e, key) => {
        if (key == 'genres') {
            console.log(e.target.value);
            setRadios(radios.map((radioValue) => {
                if (radioValue[e.target.value] != undefined) {
                    console.log(radioValue[e.target.value])
                    if (input.genre_ids.includes(e.target.value)
                    && radioValue[e.target.value] == true) {
                        setInput({...input, genre_ids: input.genre_ids.filter((genre) => {
                            console.log(genre)
                            if (genre != e.target.value) {
                                return genre;
                            }
                        })});
                    }
                    else if (!input.genre_ids.includes(e.target.value)
                    && radioValue[e.target.value] == false) {
                        setInput({ ...input, [key]: input.genre_ids.push(e.target.value) });
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
            setInput({ ...input, [key]: e.target.value });
        }
    }

    const cancelSubmit = () => {
        history.push('/');
    }

    const clearInput = () => {
        setInput({
            title: '',
            description: '',
            poster: '',
            genre_id: [],
        });
    }

    // console.log(input.genre_ids);
    // console.log(radios)
    // console.log(radios.length == 0)
    console.log(input.genre_ids)
    return (
        <>
            {((!loading) && radios.length == 0) ?
                setRadios(genres.map((genre) => {
                    return { [genre.name]: false }
                }))
            : ''}
            {!loading && radios.length != 0 ?
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
                    <div>
                        {genres.map((genre) => {
                            return (
                                <div key={genre.id}>
                                    <label>{genre.name}</label>
                                    <input name={genre.name}
                                        type="radio"
                                        value={genre.name}
                                        checked={radios[genre.id - 1][genre.name]}
                                        onClick={e => handleChange(e, 'genres')} />
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <input type="submit" value="SUBMIT" onClick={handleSubmit} />
                        <input type="button" value="CANCEL" onClick={cancelSubmit} />
                    </div>
                </form>
            </div>
            : ''}
        </>
    )
}

export default MovieForm;