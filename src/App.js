import React, { useState } from 'react'
import './App.css';
import IndianCityList from './cityname';  // india city names array
import axios from 'axios';
function App() {
  const [cityName, setCityName] = useState(''); //input for city name
  const [error, setError] = useState('') // show error message for wrong city
  const [weatherData, setWeatherData] = useState(); //object for weather api response initaly undefine
  const change = (e) => {    // input handler onchange function
    setError('')
    setCityName(e.target.value)
  }
  const submit = async () => {   // submit function 
    const reWhiteSpace = new RegExp(/^\s+$/);  // check space in city name string
    if (cityName === '' || reWhiteSpace.test(cityName)) {
      setError('Enter valid city name')
      setWeatherData()
    }
    else {
      //weather api by open weather 
      const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=121076c8ca0b6f0ff0878a6b57c83427`);
      setWeatherData(weatherResponse.data)
      setCityName('')
    }
  }
  return (
    <>
      <div className='container'>
        <div className='wraper'>
          <input type='text' className='cityname' list='cityname' onChange={change} value={cityName} placeholder='Enter city name' />
          <datalist id="cityname">
            {/* interate city names array for input */}
            {
              IndianCityList.map((cv, i) => {
                return <option value={cv.city} />
              })
            }
          </datalist>
          <button className='submit' onClick={submit} title='add city name'>Submit</button>
          <p className='errorMessage'>{error}</p>
        </div>
        {/* show weather data when  weatherData is availabe */}
        {
          weatherData ? <> <div className='location'>
            <div className='weathedata'>
            <i className='fa fa-map-marker '></i> <span>{weatherData.name}</span>
            </div>
            <div className='weathedata'>
            <i class="fa fa-thermometer"></i> <span>{Math.round(weatherData.main.temp - 273.15)}<sup><sup>.</sup>c</sup></span>
            </div>
            <div className='weathedata'>
            <i class="fa fa-cloud" aria-hidden="true"></i> {weatherData.weather.map((cv,i)=>{
              return(<><span>{cv.main} :  {cv.description}</span></>) 
            })}
            
            </div>
          </div>
            </> : ''
        }
      </div>
    </>
  );
}

export default App;
