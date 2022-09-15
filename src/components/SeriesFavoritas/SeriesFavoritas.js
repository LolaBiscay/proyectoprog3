import React, {Component} from 'react'
import TarjetasSerie from '../TarjetasSerie/TarjetasSerie';
import './SeriesFavoritas.css'

class SeriesFavoritas extends Component{
    constructor(props){
        super(props)
        this.state={
            seriesFavoritas:[]
        }
    }
    componentDidMount(){
        let Storage = localStorage.getItem('seriesFavoritas')
        if(Storage !== null){
            let storageParseado = JSON.parse(Storage)
            
            Promise.all(
                storageParseado.map(element =>{
                    return(
                        fetch(`https://api.themoviedb.org/3/tv/${element}?api_key=ec7d1aeea6d41d212821b84124febd74`)
                        .then(resp => resp.json())
                        .then(data => data))
                })
            )
            .then(data =>{ 
                console.log(data);
                this.setState({
                seriesFavoritas: data
            })
        })
            .catch(err => console.log(err))
        }
    }

    render(){
        return(
                <div>
                    <section className="card-container">
                        {
                        this.state.seriesFavoritas.length > 0 ?
                        this.state.seriesFavoritas.map((element, idx) =>                         
                            <TarjetasSerie 
                                key={element + idx} 
                                name={element.name} 
                                image={element.poster_path}
                                descripcion={element.overview}
                                id = {element.id}
                                />):
                            <h1>Cargando..</h1>
                        }
                    </section>
                </div>
        )
    }
}

export default SeriesFavoritas;