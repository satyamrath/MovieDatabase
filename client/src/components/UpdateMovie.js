import React, { useState, useEffect } from 'react'
import './AddMovie.css';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';

export default function UpdateMovie() {
    const [MovieName, setMovieName] = useState('');
    const [Language, setLanguage] = useState('')
    const [ReleaseDate, setReleaseDate] = useState('');
    const [Budget, setBudget] = useState('');
    const [Collection, setCollection] = useState('');
    const [PosterUrl, setPosterUrl] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const [isProcessed, setIsProcessed] = useState(false);

    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const id = params.get('id');
    console.log('id', id);

    useEffect(() => {
        fetch(`/api/${id}`, {
            method: "GET"
        }).then((response) => {
            if(response.status !== 200){
                history.push('/');
            }
            response.json().then(response => {
                // console.log("Response",response);
                setMovieName(response.MovieName);
                setLanguage(response.Language);
                const newReleaseDate = moment(new Date(response.ReleaseDate)).format("YYYY-MM-DD");
                setReleaseDate(newReleaseDate);
                setBudget(response.Budget);
                setCollection(response.Collection);
                setPosterUrl(response.PosterUrl);
                setIsProcessed(true);
            })
        }).catch(err => {
            console.log(err.message);
            history.push('/');
        })
    }, [id]);

    const submitForm = (e) => {
        e.preventDefault();
        // console.log('form submitted');
        // console.log(typeof(ReleaseDate));
        // console.log(ReleaseDate);
        fetch(`/api/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                MovieName,
                Language,
                ReleaseDate,
                Budget,
                Collection,
                PosterUrl
            })
        }).then(response => {
            console.log(response);
            if(response.ok){
                alert('Updated Successfully');
                setError('');
                history.push('/');
            }else{
                setError("Some Error Occurred");
            }
        }).catch(err => {
            setError(err.message);
        })
    }

    return isProcessed?(
        <>
            <form onSubmit={e => {submitForm(e)}} class="movieDetailsForm" method="post">
                <h1>Movie Details</h1>
                <input type="text" value={MovieName} onChange={e => setMovieName(e.target.value)} name="MovieName" placeholder="Movie Name" required />
                <input type="text" value={Language} onChange={e => setLanguage(e.target.value)} name="Language" placeholder="Language" required />
                <input type="date" value={ReleaseDate} onChange={e => setReleaseDate(e.target.value)} name="ReleaseDate" placeholder="Release Date" required />
                <input type="number" value={Budget} onChange={e => setBudget(e.target.value)} name="Budget" placeholder="Budget" required /> 
                <input type="number" value={Collection} onChange={e => setCollection(e.target.value)} name="Collection" placeholder="Collection" required /> 
                <input type="url" value={PosterUrl} onChange={e => setPosterUrl(e.target.value)} name="PosterUrl" placeholder="Poster URL" required /> 
                <div class="bg-transparent text-light small my-2 error" role="alert">
                    {error}
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-danger" id="login-form-button" type="submit">Update</button>
                </div>
            </form>	
        </>
    ):
    (
        <>
            <div className="text-center my-5">
                <div className="spinner-grow text-dark" style={{"width": "3rem", "height": "3rem"}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}
