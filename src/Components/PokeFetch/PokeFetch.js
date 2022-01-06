import React, { Component } from 'react'
import './PokeFetch.css';

class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 10,
      show: false
    }
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.intervalId)
    }
    this.show = true
  }

  startTimer = () => {
    clearInterval(this.intervalId)
    this.setState({timer:10})
    this.intervalId = setInterval(() => {
      this.setState({timer: this.state.timer - 1})
    }, 1000)
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .then(res => {this.startTimer()})
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className={'wrapper'}>
        <h1 className={'pokeHeader'}>Gotta guess 'em all</h1>
        <h3 className={'pokeHeader'}>Guess the Pokemon before time runs out!</h3>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer: {this.state.timer}</h1>
        {
          (this.show) ?
          ((this.state.timer === 0) ?
          <div className={'pokeWrap'}>
            <img className={'pokeImgClear'} src={this.state.pokeSprite} alt='Error' />
            <h1 className={'pokeName'}>{this.state.pokeName}</h1>
          </div> :
          <div className={'pokeWrap'}>
            <img className={'pokeImg'} src={this.state.pokeSprite} alt='Error' />
          </div>) :
          null
        }
      </div>
    )
  }
}

export default PokeFetch;