import React from 'react';
import { request } from '../../axios_helper';

export default class AuthContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Initialized as an array
    };
  }

  componentDidMount() {
    request(
      'GET',
      '/messages',
      {}
    ).then((response) => {
      this.setState({
        data: response.data, // Ensure response.data is an array or handle accordingly
      });
    }).catch((error) => {
      console.error('Error fetching data:', error); // Handle errors
    });
  }

  render() {
    return (
      <div>
        {this.state.data && this.state.data.map((line, index) => <p key={index}>{line}</p>)}
      </div>
    );
  }
}