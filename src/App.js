import React, { Component } from 'react';
import axios from 'axios';
import LoaderSpinner from './LoaderSpinner';
import MovieList from './MovieList';
import SelectBox from './SelectBox';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      movies: [], 
      error:false, 
      loading: null,
      loaded: null
    };
  };

  onCharacterSelect = (character)=>{
    axios.get(character.url)
            .then((moviedata)=>{
                this.setState({loading: true});
                const moviesPromises = moviedata.data.films.map(url=>axios.get(url));
                const moviesResolved = [];
                const movies = []; 
                Promise.all(moviesPromises)
                        .then(responses=>{
                            responses.forEach((response)=>{
                              moviesResolved.push(response);
                            });
                            moviesResolved.forEach((item)=>{
                              const movie = {}; 
                              movie.title=item.data.title;
                              movie.release_date=item.data.release_date;
                              movies.push(movie);
                                  this.setState({movies, loading: false, error: false, loaded: true});
                            });
                          })
                        .catch((err)=>{
                          console.error(err);
                        });
            })
            .catch((err)=>{
                this.setState({movies: [], error: true});
          });
  };

  render() {
    const {loading, movies, error, loaded } = this.state;
    return (
      <div className="container">
        <h1 id="header">Starwars Films Generator</h1>
        <div id="photo"> 
        </div>
        <h4 style={{color: "#003300"}}>Select a character to load movie data.</h4>
        <SelectBox
          onCharacterSelect={this.onCharacterSelect} 
          selectedOption={this.state.selectedOption}
        />
        {
          loading 
            ?  <LoaderSpinner isLoading={loading} >Loading...</LoaderSpinner>
            :  <MovieList  
                  loading={loading} 
                  movies={movies} 
                  error={error} 
                  loaded={loaded}
                />
        }
      </div>
    );
  }
}

export default App;
