import React, {Component} from 'react'
import TarjetasPeli from "../TarjetasPeli/TarjetasPeli"
import './PeliculasFavoritas'

class PeliculasFavoritas extends Component{
    constructor(props){
        super(props)
        this.state={
            peliculasFavoritas:[]
        }
    }
    componentDidMount(){
        let Storage = localStorage.getItem('peliculasFavoritas')
        if(Storage !== null){
            let storageParseado = JSON.parse(Storage)
            
            Promise.all(
                storageParseado.map(element =>{
                    return(
                        fetch(`https://api.themoviedb.org/3/movie/${element}?api_key=ec7d1aeea6d41d212821b84124febd74`)
                        .then(resp => resp.json())
                        .then(data => data))
                })
            )
            .then(data =>{ 
                console.log(data);
                this.setState({
                peliculasFavoritas: data
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
                        this.state.peliculasFavoritas.length > 0 ?
                        this.state.peliculasFavoritas.map((element, idx) =>                         
                        <TarjetasPeli
                        key={element + idx} 
                        name={element.title} 
                        image={element.poster_path}
                        descripcion={element.overview}
                        id = {element.id}
                        agregar = {(id) => this.agregarFavoritos(id)}
                        />):
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    }

                    </section>

                </div>
        )
    }
}

export default PeliculasFavoritas;