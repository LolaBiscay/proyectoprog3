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


  render() {
    return (
    <>
    <div className='series'>
            <h1 className='encabezadoSerie'> SERIES POPULARES </h1>

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
            <div>
                <Link to="/seriesPopulares">
                    <button className='botonVerTodoSerie'> Ver todo </button>
                </Link>
            </div>
        </div>
        
    </>
    )
  }
}


export default SeriesPopulares;