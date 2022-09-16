import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './TarjetasSerie.css'


class TarjetasSerie extends Component {

    constructor(props){
        super(props)
        this.state={
            claseDescripcion: 'ocultar', /*estados que se van a modificar dependiendo de si quiero ver la descripcion o no*/
            textoDescripcion: 'Ver descripcion',
            favoritos: false
        }
    }

    mostrarDescripcion(){
        if(this.state.claseDescripcion === 'ocultar'){
          this.setState({
            claseDescripcion: 'mostrar', textoDescripcion: 'Ocultar descripcion' /*como ya tengo la descrip cambio el boton para que la oculte*/
        })
      } else{
        this.setState({
            claseDescripcion: 'ocultar', textoDescripcion: 'Ver descripcion'
        })
      }
    }

    componentDidMount(){
      let Storage = localStorage.getItem('seriesFavoritas')
      let storageParseado = JSON.parse(Storage)
      if(storageParseado !== null){
        let esFavorita = storageParseado.includes(this.props.id) 
        if(esFavorita) {
          this.setState({
            favorito:true
          })
        }
      }
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
  
    sacarFavoritos(id){
      let Storage = localStorage.getItem('seriesFavoritas')
      let storageParseado = JSON.parse(Storage) 
      let filtroStorage = storageParseado.filter(elemento => elemento !== id)
  
      let storageAString = JSON.stringify(filtroStorage)
  
      localStorage.setItem('seriesFavoritas', storageAString)
  
      this.setState({
        favorito: false
      })
    }

    render(){
        return(
            <article className='serie-card'>
            <img src={`https://image.tmdb.org/t/p/w342/${this.props.image}`} alt=""></img>
            <div className='contenido'>
                <h1> <Link className='TituloSerie' to={`/detalleSerie/${this.props.id}`}> {this.props.name} </Link> </h1>
            <p className={this.state.claseDescripcion}>{this.props.descripcion}</p> {/* este deberia solo aparecer si tocamos el Ver mas */}
            
            <div className='botonesSerie'>
              <button onClick={() => this.mostrarDescripcion()}> {this.state.textoDescripcion} </button>
              <button onClick={() => this.props.agregarFavoritos(this.props.id)} > Agregar a Favoritos</button>
              <Link to="/detalleSerie">
                <button> <Link className ="" to={`/detalleSerie/${this.props.id}`}>Ver Detalle </Link> </button>
              </Link>
            </div>
            </div>
            </article>

        )
    }  
}
export default TarjetasSerie