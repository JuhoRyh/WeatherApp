import React from 'react'
import {Col} from 'react-bootstrap'
import { CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun, Cloud} from 'react-feather'

const DayWeather = (props) => {
  const day = props.day
  const iconCode = props.day.weather[0].id
  const iconFirstDigit = iconCode.toString()[0]

  const date = new Date(day.dt*1000)
  const dayDate = date.getDay()

  let weekDay = ''

  const getIcon = () => {
    switch(iconFirstDigit){
      case '2':
        return <CloudLightning color="black" />
      case '3':
        return <CloudDrizzle color="grey" />
      case '5':
        return <CloudRain color="grey" />
      case '6':
        return <CloudSnow color="white" />
      case '7':
        return <Cloud color="white" />
      case '8':
        if(iconCode === 800){
          return <Sun color="yellow" />
        }
        else{
          return <Cloud color="white" />
        } 
      default: return null
    }
  }

  switch(dayDate){
    case 0:
      weekDay='Sun'
      break
    case 1:
      weekDay='Mon'
      break
    case 2:
      weekDay='Tue'
      break
    case 3:
      weekDay='Wed'
      break
    case 4:
      weekDay='Thu'
      break
    case 5:
      weekDay='Fri'
      break
    case 6:
      weekDay='Sat'
      break
    default: weekDay=null
  }

  return(
    <Col sm={12} md={2} className="dayContainer">
      <div className="weatherIcon">
        {getIcon()}
      </div>
      <p>{weekDay}</p>
      <p className="minmax">MAX: </p><p>{Math.floor(day.temp.max - 273.15)}°C</p>
      <p className="minmax">MIN: </p><p>{Math.floor(day.temp.min - 273.15)}°C</p>
    </Col>
  )
}

export default DayWeather