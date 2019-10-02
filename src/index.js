import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './FIPLA.png';
import pointer from './pointer.png';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { longitude: '', latitude: '', radius: '', place: 'Search Places' };



        this.handleLongitude = this.handleLongitude.bind(this);
        this.handleLatitude = this.handleLatitude.bind(this);
        this.handleRadius = this.handleRadius.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLongitude(event) {
        this.setState({ longitude: event.target.value });
    }
    handleLatitude(event) {
        this.setState({ latitude: event.target.value });
    }
    handleRadius(event) {
        this.setState({ radius: event.target.value });
    }

    handleSubmit(event) {

        fetch("http://localhost:8070/getPlaces?long=" + this.state.longitude + "&&lat=" + this.state.latitude + "&&rad=" + this.state.radius)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.onSubmit(result);

                },
                (error) => {

                }
            )
        event.preventDefault();
    }



    render() {
        return (

            <div className="fiplaForm">
                <div className="logo">
                    <img src={logo} className="image"></img>
                </div>
                <form onSubmit={this.handleSubmit} className="formTag">
                    <input type="text" value={this.state.longitude} onChange={this.handleLongitude} placeholder="longitude" className="box"/>
                    <input type="text" value={this.state.latitude} onChange={this.handleLatitude} placeholder="latitude" className="box"/>
                    <input type="text" value={this.state.radius} onChange={this.handleRadius} placeholder="radius" className="box"/>
                    <input type="submit" value="Find" className="findButton" />
                </form>
            </div>

        );
    }
}
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: [],
        };
    }

    showPlaces = (places) => {

        this.state.value = [];
        var joined = this.state.value.concat(places);

        if(joined[0].name=="API Problem!"){
            alert("Could not connected to the GOOGLE API. You should change the API KEY!");
        }
        else if(joined[0].error=="Bad Request"){
            alert("Wrong input format!");
        }
        else{
            this.setState({ value: joined });
        }
        
        console.log(joined);

    };

    render() {
        return (

            <div className="places">
                <Form onSubmit={this.showPlaces} />
                <div className="placesBox">
                {this.state.value.map(i => {
                    return (<div className="place" key={i.name}>
                                <img src={pointer} className="pointer"/><h1 className="placeName">{i.name}</h1>
                            </div>)
                })}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));