import * as React from 'react';
import { useState, useEffect} from 'react';
import MapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Map.css';
//import ComboBox from './ComboBox';

mapboxgl.accessToken  = 'pk.eyJ1Ijoic3Jpdi1jaCIsImEiOiJja215YjJyb3cwMjh5MnVudWNwdmFvdjVyIn0.wpuzEF_OJZB1VN9Y-Mqhiw';
const data = require('./data.json');
const colors = ['#0868ac','#43a2ca','#7bccc4','#a8ddb5']
const id = ['dep_45','dep_30','dep_15','dep_1']

const Map = () => {
  const [map, setMap] = useState(null)
  const [query, setQuery] = useState(data[0])
  const [display, setDisplay] = useState('combo-box hide')
  function devCountries() {
    const countries =[];
     data.map(good => {
      good.locations.developmentCountries.map(country => {
      countries.push(country)}
       )
     })
    console.log('countries')
    console.log(countries)
    const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    console.log(countOccurrences(countries));
     const uniqueDev = [...new Set(countries)] 
    return uniqueDev
  }

  function depCountries() {
    const countries =[];
    const arr_countries = [[],[],[],[]];
    var count = 0;
     data.map(good => {
      count ++;
      good.locations.deploymentCountries.map(country => {
      countries.push(country)}
     )})
    //const uniqueDev = [...new Set(countries)]
    console.log(count)
    const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    const dep_countries = countOccurrences(countries);
    console.log(dep_countries)
    console.log(Object.values(dep_countries))
    Object.keys(dep_countries).forEach(function(item){
    if(dep_countries[item] >= count * 0.45){
      arr_countries[0].push(item);
    } 
    else if(dep_countries[item] >= count * 0.3 && dep_countries[item] < count * 0.45){
      arr_countries[1].push(item);
    }
    else if(dep_countries[item] >= count * 0.15 && dep_countries[item] < count * 0.3){
      arr_countries[2].push(item);
    }
    else  {
      arr_countries[3].push(item);
    }
         
  });

    console.log('chlooooooor')
    console.log(arr_countries)
    return arr_countries
  }
 
  const dep = depCountries()
  console.log(dep)
  const dev = devCountries()
 

  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      width: '100vw',
      height: '100vh',
      center: [5, 34],
      zoom: 1
    });

    map.on('load', function () {
      map.addLayer({
        //here we are adding a layer containing the tileset we just uploaded
        id: 'devcountries', //this is the name of our layer, which we will need later
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1', // <--- Add the Map ID you copied here
        },
        'source-layer': 'country_boundaries', // <--- Add the source layer name you copied here
        type: 'fill',
        paint: {
          'fill-color': '#52489C', //this is the color you want your tileset to have (I used a nice purple color)
          'fill-outline-color': '#F2F2F2', //this helps us distinguish individual countries a bit better by giving them an outline
       
        }
      });
      map.setFilter(
        'devcountries',
        ['in', 'name_en'].concat(dev),
      );
      map.setLayoutProperty('devcountries', 'visibility', 'none')
  
        for (var i=0; i<=3; i++){
          map.addLayer({
            id:  id[i],
              source: {
                type: 'vector',
                url: 'mapbox://mapbox.country-boundaries-v1', 
              },
              'source-layer': 'country_boundaries', 
              type: 'fill',
              paint: { 
                'fill-opacity': 1,
                'fill-outline-color': 'black'
              }
            });
          map.setFilter(
              id[i],
              ['in', 'name_en'].concat(dep[i]),
            );
          map.setPaintProperty(id[i], 'fill-color', colors[i]);
          map.setLayoutProperty(id[i], 'visibility', 'none')
        
        }
  
      setMap(map);
    })
    return () => map.remove();
  }, []);


  return (
    <div>
      <div id="map"></div>
      <ToggleButtonGroup className = "toggle-button-group" onChange={(event, value) =>
      {
        console.log(value)
        if (value == 'depcountries') {
          var visibility = map.getLayoutProperty('dep_45', 'visibility')
          for (var i = 0; i <= 3; i++){
            if (visibility === 'visible') {
              map.setLayoutProperty(id[i], 'visibility', 'none');
              //this.className = '';
          } else {
             // this.className = 'active';
              map.setLayoutProperty(id[i], 'visibility', 'visible');
          }
          }
        }
        else {
          var visibility = map.getLayoutProperty(value, 'visibility')

        if (visibility === 'visible') {
          map.setLayoutProperty(value, 'visibility', 'none');
          //this.className = '';
      } else {
         // this.className = 'active';
          map.setLayoutProperty(value, 'visibility', 'visible');
      }
        }
      }
      }>
        <ToggleButton onClick={() =>  setDisplay('combo-box hide') }className = "toggle-button" value = "devcountries" >Development Countries</ToggleButton>
          <ToggleButton onClick = {() => setDisplay('combo-box hide')}className = "toggle-button" value = "depcountries" >deploymentCountries</ToggleButton>
          <ToggleButton onClick = {() => setDisplay('combo-box hide')} className = "toggle-button" value = "arigato">arigato</ToggleButton>
        <ToggleButton  className="toggle-button" value="gumao">gumao</ToggleButton>
        <ToggleButton
          className="toggle-button"
          value="DPG"
          onClick = {() => setDisplay('combo-box show')}
        >DPG
           
          </ToggleButton>
      </ToggleButtonGroup>
      <Autocomplete
        id="combo-box"
        className = {display}
        options={data}
        getOptionLabel={(option) => option.id}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
        onChange={(event, value) => {
          console.log("VALUEEEEEEEEEEEEEE")
          console.log(value)
          setQuery(value)
          //const getdev = data.map(good => {
          //  if (good.id == value) {
              //console.log(good)
          //  }
          //})
          map.addLayer({
            //here we are adding a layer containing the tileset we just uploaded
            id: 'DPG', //this is the name of our layer, which we will need later
            source: {
              type: 'vector',
              url: 'mapbox://mapbox.country-boundaries-v1', // <--- Add the Map ID you copied here
            },
            'source-layer': 'country_boundaries', // <--- Add the source layer name you copied here
            type: 'fill',
            paint: {
              'fill-color': 'black', //this is the color you want your tileset to have (I used a nice purple color)
              'fill-outline-color': '#d11111', //this helps us distinguish individual countries a bit better by giving them an outline
           
            },
          });
            map.setFilter(
            'DPG',
              ['in', 'name_en'].concat(value.locations.deploymentCountries)
          )
          //console.log(value.locations.deploymentCountries)
          
          map.setLayoutProperty('DPG', 'visibility', 'visible')
        }
        }
      />
      <div id="legend" class="legend">
        <h4>{query.id}</h4>
        <div>{query.SDGs.map(element => {
          return <div>SDG Number : {element.SDGNumber}</div>
        })}
       </div>
       </div>
    </div>

  )
}

export default Map;