import React, {useState, useEffect} from 'react';
import { Container, Col, Row, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/Weather'
import './App.css';

const App = () => {
  const [location, setLocation] = useState()
  const [cityName, setCityName] = useState('')
  const [city, setCity] = useState('Oulu, Finland')
  const [error, setError] = useState(false)

  useEffect(() => {
    const lon = 25.4650772
    const lat = 65.0120888
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OWMAPI}`).then(res => {
      setLocation(res.data)
    })
  },[])

  const getLocation = (event) => {
    event.preventDefault()
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${process.env.REACT_APP_GAPI}`).then(res => {
      const result = res.data
      if(result.status === "OK"){
        const lat = result.results[0].geometry.location.lat
        const lon = result.results[0].geometry.location.lng
        updateWeather(lat, lon)
        setCity(result.results[0].formatted_address)
        setError(false)
      }
      else{
        setError(true)
      }
    })
  }

  const updateWeather = (lat, lon) => { 
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OWMAPI}`).then(res => {
      setLocation(res.data)
    })
  }

  const onChangeHandler = (event) =>{
    setCityName(event.target.value)
  }
  return(
    <Container >
      <Row>
        <Col className="title">WeatherApp</Col>
      </Row>
      <Row className="searchBar">
        <Form onSubmit={getLocation}>
          <InputGroup>
              <FormControl placeholder="Enter city name..." value={cityName} onChange={onChangeHandler} />
              <InputGroup.Append><Button variant="dark" type="submit">Submit</Button></InputGroup.Append>          
          </InputGroup>
        </Form>
        {error ? <p className="errorMessage">There was an error with your search. Try again</p> : null}
      </Row>
      {location ? <Weather className="weather" location={location} city={city} /> : null}
    </Container>
  )
}

export default App;
