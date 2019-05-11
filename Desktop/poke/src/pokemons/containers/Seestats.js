import React, { Component } from 'react';
import { connect } from 'react-redux'
import Loading from '../../shared/components/Loading';
import PokemonInfo from './PokemonInfo';

class Seestats extends Component{

  state = {
    loading: true,
    item: {},
    pokemon: {}
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: `${navigation.getParam('pokedata', {}).name}`
    }
  }

  async componentWillMount(){
    await this.getParamItem();
    await this.fetchPokemon();
    this.setState({
      loading: false
    })
  }

  async getParamItem(){
    const item = this.props.navigation.getParam('pokedata', {})

    this.setState({
      item: item
    })
  }

  async fetchPokemon(){
    let url = this.state.item.url
    if (url.length > 0) {
      await fetch(url).then(response => {
        return response.json();
      }).then(responseData => {
        this.setState({
          pokemon: responseData
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }

  render(){
     // console.log(this.state.pokemon);
    if (this.state.loading) {
      return(<Loading />)
    }
    return(
    
        <PokemonInfo pokemon={this.state.pokemon}/>
    )
  }
}

function mapStateToProps(state){
  return {
    authorize: state.authorize,
    user: state.user,
    baseUrl: state.baseUrl
  }
}

export default connect(mapStateToProps)(Seestats)
