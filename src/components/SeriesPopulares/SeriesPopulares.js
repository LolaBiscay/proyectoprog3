import React,{Component} from 'react'
import TarjetasSerie from '../TarjetasSerie/TarjetasSerie';
import { Link } from 'react-router-dom';
import './SeriesPopulares.css'


class SeriesPopulares extends Component {
    constructor(props){
        super(props)
        this.state={
            data: [],
            verMas: "hide"
        }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=ec7d1aeea6d41d212821b84124febd74')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
            data: data.results
        })})
        .catch(err => console.log(err))  
    }
    cargarMas(){
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=ec7d1aeea6d41d212821b84124febd74&language=en-US&page=${this.state.pagina}`)
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
    <div className='series'>
            <h1 className='encabezadoSerie'> TODAS LAS SERIES POPULARES </h1>

            <section className="card-container">
                {      
                        this.state.data.length > 0 ?
                        this.state.data.map((key, idx) => 
                        <TarjetasSerie 
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


export default SeriesPopulares;