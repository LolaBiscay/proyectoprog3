import React, {Component} from "react";
import './DetallePeli.css'

class Detalleserie extends Component{
    constructor(props){
        super(props);
        this.state = {
            detalle: false,

            
        }
    } 
    componentDidMount(){
        console.log("este es el id de la peli", this.props.match.params.id);
        fetch(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=ec7d1aeea6d41d212821b84124febd74`)
        .then(resp => resp.json())
        .then(data => 
              this.setState
            ({
            detalle: data,
            
        })  )
        .catch(error => console.log(error))
    
    }
    
  agregarFavoritos(id){
    let Storage = localStorage.getItem('seriesFavoritas')

    if(Storage === null){
      let array = [id]
      let arrayAString = JSON.stringify(array)
      localStorage.setItem('seriesFavoritas', arrayAString)
    } else {
      let arrayParseado = JSON.parse(Storage)
      arrayParseado.push(id)
      let arrayAString = JSON.stringify(arrayParseado)
      localStorage.setItem('seriesFavoritas', arrayAString)
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
        <div className = "peli">
        {this.state.detalle ?
        <main className="pelicula-card"> 
           <div>
                <img src={`https://image.tmdb.org/t/p/w342/${this.state.detalle.poster_path}`} alt=""></img>
            </div>
            <div>
                <h1>{this.state.detalle.title}</h1>                    
                <ul>
                    <li> Fecha De Estreno {this.state.detalle.first_air_date}</li>
                </ul>
                <p> Rating {this.state.detalle.vote_average}</p>
                <p> {this.state.detalle.overview}</p>
                <p> Genero {this.state.detalle.genres[1].name}</p>
                <button onClick={() => this.agregarFavoritos(this.props.match.params.id)} > Agregar a Favoritos</button>
            </div>
        </main>: <></> }
        </div>
        </>
        
        )
    } 
}

export default Detalleserie