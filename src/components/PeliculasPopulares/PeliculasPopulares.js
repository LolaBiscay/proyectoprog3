import React,{Component} from 'react'
import TarjetasPeli from '../TarjetasPeli/TarjetasPeli';
import { Link } from 'react-router-dom';
import './PeliculasPopulares.css'


class PeliculasPopulares extends Component {
    constructor(props){
        super(props)
        this.state={
            data: [],
            verMas: "hide",
            pagina: 1
        }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=ec7d1aeea6d41d212821b84124febd74&language=en-US&page=1')
        .then(resp => resp.json())
        .then(data => {
            this.setState({ /*Actualizo el estado del componente*/
            data: data.results
        })})
        .catch(err => console.log(err))  
    }

    cargarMas(){
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=ec7d1aeea6d41d212821b84124febd74&language=en-US&page=${this.state.pagina}`)
        .then(res => res.json())
        .then(data => this.setState({
            data: this.state.data.concat(data.results),
            pagina: this.state.pagina + 1
        }))
        .catch(err => console.log(err))
    }
    
    


  render() {
    return (
    <>
    <div className='peliculas'>
            <h1 className='encabezadoPeli'> TODAS LAS PELÍCULAS POPULARES </h1>

            <section className="card-container-PP">

                {      
                        this.state.data.length > 0 ?
                        this.state.data.map((key, idx) => 
                        <TarjetasPeli 
                        key={key + idx} 
                        name={key.title} 
                        image={key.poster_path}
                        descripcion={key.overview}
                        id = {key.id}
                        agregar = {(id) => this.agregarFavoritos(id)}
                        />):
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

                }
            </section>
            <div className='boton_card'>
                <button className='boton' onClick={()=> this.cargarMas()}> Cargar Más </button>
            </div>

            
        </div>
        
    </>
    )
  }
}



export default PeliculasPopulares;