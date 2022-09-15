import React,{Component} from 'react'
import TarjetasPeli from '../TarjetasPeli/TarjetasPeli';
import Buscador from '../Buscador/Buscador'
import { Link } from 'react-router-dom';
import './Peliculas.css'


class Peliculas extends Component {
    constructor(props){
        super(props)
        this.state={
            data: [],
            verMas: "hide"
        }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=ec7d1aeea6d41d212821b84124febd74&language=en-US&page=1')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
            data: data.results.slice(0,4) /*Para que se aparezcan solo 4 pelis*/
        })})
        .catch(err => console.log(err))  
    }

    buscarPeli(titulo){
        if(titulo !== ''){
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=ec7d1aeea6d41d212821b84124febd74&query=${titulo}`)
        .then(res => res.json())
        .then(data => this.setState({
            data: data.results
        }))
        .catch(err => console.log(err))
        }
    }
    

  render() {
    return (
    <>
        <div className='peliculas'>
            <Buscador filtrar={(titulo) => this.buscarPeli(titulo)}/>

            <h1 className='encabezadoPeli'> PELÍCULAS POPULARES </h1>

            <section className="card-container">
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
                        <h1>Cargando..</h1>
                }
            </section>
            <div>
                <Link to="/peliculasPopulares">
                    <button className='botonVerTodoPeli'> Ver todo </button>
                </Link>
            </div>
        </div>
    </>
    )
  }
}


export default Peliculas