import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateComment from './CreateComment';
import Login from './Login';
import '../stylesheets/MovieItems.css'

class MoviePage extends Component {

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/movies/${this.props.match.params.id}`)
    .then(r => r.json())
    .then(data => 
      this.setState({
      movieitemdata: data
    }))
  }



  render() {
    const react_token = localStorage.getItem("react_token") 
    let movie= this.state ? this.state.movieitemdata : null
    return (
      <div id = 'displaymovieitems'>
              { !react_token || react_token == 'undefined'? <Login /> :  
              <div>
              {movie ?  
                    <div className='movie-items-container'>
                      <div id= 'movie-items-poster' className= 'movie-items-poster'>
                    
                        <img
                        src={`/${movie.poster_path}`}
                        alt={movie.title + " Image"}
                        height='150px' width='100px%'
                        />
                    
                    </div>
                    <div id='movie-items-info' className='movie-items-info'>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                        <p><strong>Release Date: </strong>{movie.release_date}</p>
                        <p><strong>Online Ratings: </strong>{movie.online_rating}/10 on TMDB.org</p>
                    
                    <CreateComment commentAll={movie.comments} movieID={movie.id}/>
                  </div> 
                 </div>
                 
                 : '' } 
                 <div>
                
               </div>  
               </div>
                } 
        </div>  
              
    )
  }

}

function mapStateToProps(state) {
  return{
    movieitemdata: state.movieitemdata,
  }
}

export default connect(mapStateToProps, null)(MoviePage);