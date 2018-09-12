import React from 'react'; 
import MovieItem from './MovieItem';

const MovieList = (props)=>{
    const movieItems= props.movies.map((movie)=>{
        return(
            <MovieItem 
                key={movie.title}
                movie={movie}
            />
        );
    });
    if(props.error){
        return(<div style={{color: 'red'}}>Not a valid character. :(</div>)
    };

    return(
        <table className="table table-striped">
            <tbody>
                {
                    ( props.loading===false && props.loaded===true) 
                    ? 
                    <tr>
                        <th>Title</th>
                        <th>Release Date</th>
                    </tr>
                    :
                    <tr style={{display: "none"}}>
                    <th></th>
                    <th></th>
                    </tr>
                    
                }
            { movieItems }
            </tbody>
            
        </table>
    );
};

export default MovieList;