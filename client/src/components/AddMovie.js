import React, { useState } from 'react'
import './AddMovie.css';
import { useHistory } from 'react-router-dom';

export default function AddMovie() {
    const history = useHistory();
    const [MovieName, setMovieName] = useState('');
    const [Language, setLanguage] = useState('')
    const [ReleaseDate, setReleaseDate] = useState('');
    const [Budget, setBudget] = useState('');
    const [Collection, setCollection] = useState('');
    const [PosterUrl, setPosterUrl] = useState('');
    const [error, setError] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        // console.log('form submitted');
        // console.log(typeof(ReleaseDate));
        // console.log(ReleaseDate);
        fetch('/api/add', {
            method: "POST",
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
                alert('Movie Added Successfully');
                setError('');
                history.push('/');
            }else{
                setError("Some Error Occurred");
            }
        }).catch(err => {
            setError(err.message);
        })
    }

    return (
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
                    <button class="btn btn-danger" id="login-form-button" type="submit">Add Movie</button>
                </div>
            </form>	
        </>
    )
}
