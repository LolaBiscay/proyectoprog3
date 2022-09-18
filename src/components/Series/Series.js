import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import TarjetasSerie from '../TarjetasSerie/TarjetasSerie';
import './Series.css'

class Series extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=ec7d1aeea6d41d212821b84124febd74')
        .then(res => res.json())
        .then(data => {
            this.setState({
            data: data.results.slice(0,4)
        })})
        .catch(error => console.log(error))
    }
    render(){
        return(
            <>
            <div className='series'>
                <h1 className='encabezadoSerie'> SERIES POPULARES </h1>
                <section className='card-container-Serie'>
                    {
                        this.state.data.length > 0 ?
                        this.state.data.map((key, idx) => 
                        <TarjetasSerie
                        key={key + idx} 
                        name={key.name} 
                        image={key.poster_path}
                        descripcion={key.overview}
                        id = {key.id}
                        />):
                        <h1>Cargando..</h1>
                    }

                </section>
                    <div>
                        <Link to="/seriesPopulares">
                            <button className='botonVerTodoSerie'> Ver Todo </button>
                        </Link>
                    </div>
            </div>
            </>
        )
    }
}

export default Series