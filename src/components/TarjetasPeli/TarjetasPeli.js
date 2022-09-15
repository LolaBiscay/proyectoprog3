import React, {Component} from 'react'
import {Link} from "react-router-dom"
import './TarjetasPeli.css'


class TarjetasPeli extends Component {

  constructor(props){
    super(props)
    this.state ={
      claseDescripcion: 'ocultar', /*estados que se van a modificar dependiendo de si quiero ver la descripcion o no*/
      textoDescripcion: 'Ver descripcion',
      favoritos: false
    };
  };

  mostrarDescripcion(){
      if(this.state.claseDescripcion === 'ocultar'){
        this.setState({
          claseDescripcion: 'mostrar', 
          textoDescripcion: 'Ocultar descripcion' /*como ya tengo la descrip cambio el boton para que la oculte*/
      })
    } else{
      this.setState({
          claseDescripcion: 'ocultar', 
          textoDescripcion: 'Ver descripcion'
      })
    }
  }


  render(){
    return (
      <article className="pelicula-card">

          <img src={`https://image.tmdb.org/t/p/w342/${this.props.image}`} alt="" />
          
          <div className='contenido'>
            <h1><Link className='TituloPeli' to={`/detalle/${this.props.id}`}> {this.props.name}</Link></h1>
            <p className={this.state.claseDescripcion}>{this.props.descripcion}</p>

            <div className='botonesPeli'>
              {this.state.favoritos ? <button onClick={() => this.removeFavoritos(this.props.id)}> Sacar de Favoritos</button>: <button onClick={() => this.agregarFavoritos(this.props.id)} > Agregar a Favoritos</button> }
              <button onClick={() => this.mostrarDescripcion()}> {this.state.textoDescripcion} </button>
              <Link to="/detallePeli">
                <button> Ver detalle </button>
              </Link>
            </div>
            

          </div>

      </article>   
    )
  }
}


export default TarjetasPeli

/*En tarjeta recibo toda la lista de canciones y despues tatjetas hace el map para que se renderize cada una de las tarjetas con la info que requiere */