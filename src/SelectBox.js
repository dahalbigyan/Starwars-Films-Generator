import React, { Component } from "react";
import Select from 'react-select';

const data = {
    "characters": [
      {
        "name": "Luke Skywalker",
        "url": "https://swapi.co/api/people/1/"
      },
      {
        "name": "Darth Vader",
        "url": "https://swapi.co/api/people/4/"
      },
      {
        "name": "Obi-wan Kenobi",
        "url": "https://swapi.co/api/people/unknown/"
      }, 
      {
        "name": "R2-D2",
        "url": "https://swapi.co/api/people/3/"
      }
    ]
  }; 
  
  const options = []; 
  data.characters.forEach((item=>{
    const character = {}; 
    character.value=item.name; 
    character.label=item.name;
    character.url=item.url;
    options.push(character);
  }));

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state={
        selectedOption: {url:'', label: '', value: ''}
      }
  }; 

  render(){
    return(
      <div>
        <Select
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
  handleChange= (selectedOption)=>{
    this.setState({ selectedOption });
    this.props.onCharacterSelect(selectedOption);
  };
}

export default SelectBox;