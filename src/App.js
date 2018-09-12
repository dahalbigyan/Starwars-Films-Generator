import React, { Component } from 'react';
import SelectBar from './SelectBar';
import axios from 'axios';
import MovieList from './MovieList';

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
                const requests = moviedata.data.films.map(url=>axios.get(url));
                const bigmovies = [];
                const movies = []; 
                Promise.all(requests)
                        .then(responses=>{
                            responses.forEach((response)=>{
                                bigmovies.push(response);
                                });
                                bigmovies.forEach((item)=>{
                                  const movie = {}; 
                                  movie.title=item.data.title;
                                  movie.release_date=item.data.release_date;
                                  movies.push(movie);
                                  this.setState({movies, loading: false, error: false, loaded: true});
                                });
                              })
                        .catch((err)=>{
                          console.error(err);
                        })
            })
            .catch((err)=>{
                this.setState({movies: [], error: true});
            })
  };

  render() {
    const {loading, movies, error, loaded } = this.state;
    return (
      <div className="container">
        <h1 className="jumbotron">Starwars Films Generator</h1>
        <h4>Select a character to load movie data.</h4>
        <SelectBar 
          onCharacterSelect={this.onCharacterSelect} 
          selectedOption={this.state.selectedOption}
        />
        {
          loading 
            ?  <span>Loading...</span>
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
