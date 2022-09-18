import React, {Component} from "react";
import './DetallePeli.css'

class Detallepeli extends Component{
    constructor(props){
        super(props);
        this.state = {
            detalle: false,

            
        }
    } 
    componentDidMount(){
        console.log("este es el id de la peli", this.props.match.params.id);
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=ec7d1aeea6d41d212821b84124febd74`)
        .then(resp => resp.json())
        .then(data => 
              this.setState
            ({
            detalle: data,
            
        })  )
        .catch(error => console.log(error))
    
    }
    
  agregarFavoritos(id){
    let Storage = localStorage.getItem('peliculasFavoritas')

    if(Storage === null){
      let array = [id]
      let arrayAString = JSON.stringify(array)
      localStorage.setItem('peliculasFavoritas', arrayAString)
    } else {
      let arrayParseado = JSON.parse(Storage)
      arrayParseado.push(id)
      let arrayAString = JSON.stringify(arrayParseado)
      localStorage.setItem('peliculasFavoritas', arrayAString)
    }

    this.setState({
      favorito:true
    })
  }

    render(){
        console.log('Este es el state')
        console.log(this.state.detalle)
        return(
        
        <>
       <div className="peli">
             <>
        {this.state.detalle ?
        <main className="pelicula-card"> 
           <div className="detalle">
                <img src={`https://image.tmdb.org/t/p/w342/${this.state.detalle.poster_path}`} alt=""></img>
            </div>
            <div>
                <h1>{this.state.detalle.title}</h1>                    
                <ul>
                    <li> Fecha De Estreno {this.state.detalle.release_date}</li>
                </ul>
                <p> Rating {this.state.detalle.vote_average}</p>
                <p> {this.state.detalle.overview}</p>
                <p> Duracion  {this.state.detalle.runtime} minutos</p>
                <p> Genero {this.state.detalle.genres[1].name}</p>
                <button onClick={() => this.agregarFavoritos(this.props.match.params.id)} > Agregar a Favoritos</button>
                
            </div>
        </main>: <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> }
        
        </>

        </div>
        
        </>
        
        )
    } 
}

export default Detallepeli