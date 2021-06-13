import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

export default function Home() {
    const history = useHistory();
    const [isProcessed, setIsProcessed] = useState(false);
    const [movies, setMovies] = useState([]);

    const getList = () => {
        fetch('/api/getList', {
            method: "GET"
        }).then((response) => {
            response.json().then(response => {
                setIsProcessed(true);
                setMovies(response);
                // console.log(response);
            }).catch(err => {
                console.log(err.message);
            })
        }).catch((err) => {
            console.log(err.message);
        })
    }
    useEffect(() => {
        getList();
    }, []);

    const deleteMovie = (e) => {
        e.preventDefault();
        const id = e.target.id;
        fetch(`/api/delete/${id}`, {
            method: "DELETE"
        }).then(response => {
            console.log(response);
            alert('deleted successfully');
            getList();
        }).catch(err => {
            console.log(err);
            alert('some error occurred');
        })
    }

    return isProcessed?(
        <>        
            <div className="container my-5 videoList">
                <div className="row">
                    {/* {console.log(movies)}; */}
                    {movies.map(movie => (
                        <div className="card mx-auto my-5 bg-light text-dark" style={{"width": "70rem"}} key={ movie._id }>
                            <img src={movie.PosterUrl} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">{ movie.MovieName }</h5>
                                {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <p>Release Date: { new Date(movie.ReleaseDate).toDateString() }</p>
                                <p>Budget: { movie.Budget }</p>
                                <p>Collection: { movie.Collection }</p>
                                <p>Language: { movie.Language }</p>
                                <Link to={"/update?id=" + movie._id } className="btn btn-outline-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </Link>

                                <form method="POST" id={movie._id} onSubmit={e => deleteMovie(e)} style={{"display": "inline"}}>
                                    <button style={{"float": "right"}} type="submit" class="btn btn-light">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
