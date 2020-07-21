import React from 'react'
import { Row, Col } from 'react-bootstrap'
import DayWeather from './DayWeather'
import { Wind, Droplet, Sunrise, Sunset } from 'react-feather'

const Weather = (props) => {
  const current = props.location.current
  const daily = props.location.daily

  const sunriseDate = new Date(current.sunrise*1000)
  const sunriseHours = sunriseDate.getHours()
  const sunriseMin = "0" + sunriseDate.getMinutes() 

  const sunsetDate = new Date(current.sunset*1000)
  const sunsetHours = sunsetDate.getHours()
  const sunsetMin = "0" + sunsetDate.getMinutes()

  return(
    <Row className="weatherContainer">
      <Col lg={4} className="current">
        <Row>
          <Col className="currentTop">
          <h2>{props.city}</h2>
          <h1>{Math.floor(current.temp -273.15)}°C</h1>
          <p className="feels">Feels Like</p>
          <p>{Math.floor(current.feels_like - 273.15)}°C</p>
          <p>{current.weather[0].description}</p>
          </Col>
        </Row>
        <Row className="specifics">
          <Col>
            <Droplet />
            <p>{current.humidity}%</p>
          </Col>
          <Col>
            <Wind />
            <p>{current.wind_speed}m/s</p>
          </Col>
        </Row>            
        <Row className="specifics">
          <Col>
            <Sunrise />
            <p>{sunriseHours}:{sunriseMin.substr(-2)}</p>
          </Col>
          <Col>
            <Sunset />
            <p>{sunsetHours}:{sunsetMin.substr(-2)}</p>
          </Col>
        </Row>
      </Col>
      <Col lg={8}>
        <Row>
        {daily.filter(day => {
          if(day===daily[0] || day===daily[daily.length-1]){
            return null
          }
          else{
            return day
          }
        }).map(day => {
            return(<DayWeather key={day.dt} day={day} />)
          })}
        </Row>
      </Col>
    </Row>
  )
}

export default Weather