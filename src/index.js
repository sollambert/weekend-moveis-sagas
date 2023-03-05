import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('SUBMIT_MOVIE', submitMovie);
}

//saga for getting details for specific movie from db 
function* fetchMovieDetails(action) {
    try {
        const movieDetails = yield axios.get(`/api/movie/${action.payload}`)
        const genreDetails = yield axios.get(`/api/genre/${action.payload}`)
        console.log('details:', movieDetails, genreDetails)
        yield wait(500);
        yield put({type: 'SET_MOVIE_DETAILS', payload: { loading: false,
            ...movieDetails.data,
            genres: genreDetails.data.map((genre) => genre.name)}})
    } catch (error) {
        console.log(error);
    }
}

async function wait(ms) {
    return new Promise(resolve =>  setTimeout(resolve, ms));
}

//saga for getting all movies from db
function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        yield wait(1000);
        yield put({type: 'SET_MOVIES',  payload: {loading: false, movies: movies.data}});
    } catch {
        console.log('get all error');
    }
        
}

//saga for getting all genres from db
function* fetchAllGenres() {
    try {
        const genres = yield axios.get('/api/genre');
        yield put({ type: 'SET_GENRES', payload: genres.data});
    } catch (error) {
        console.error(error);
    }
}

//saga for submitting a new movie
function* submitMovie(action) {
    try {
        console.log(action.payload);
        yield axios.post('/api/movie', {...action.payload});
        yield action.callback();
        yield put({type: 'FETCH_MOVIES'});
    } catch (error) {
        console.error(error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = {loading: true}, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// movie details reducer
const movieDetails = (state = {loading: true}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        case 'CLEAR_MOVIE_DETAILS':
            return {loading: true}
        default: 
        return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        movieDetails,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
