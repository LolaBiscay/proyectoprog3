import React, {Component} from 'react'
import './Buscador.css'

class Buscador extends Component{
    constructor(props){
        super(props)
        this.state={
            valorInput: ''
        }
    }
    prevenirRefresh(event){ 
        event.preventDefault(event) 
    }
    controlarCambiosDelInput(event){ 
        this.setState({
            valorInput: event.target.value
        },
        () => this.props.filtrar(this.state.valorInput)
        )
    }
    render(){
        return( 
            <form className='buscador' onSubmit = {(event)=> this.prevenirRefresh(event)}>
                <input type='text' placeholder='¿Qué deseas buscar?' onChange={(event)=> this.controlarCambiosDelInput(event)} value={this.state.valorInput}/>
            </form>
        )
    }
}

export default Buscador