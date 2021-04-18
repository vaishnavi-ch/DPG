import * as React from 'react';
import { useState, useEffect} from 'react';
import MapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Map.css';
import ComboBox from './ComboBox';

mapboxgl.accessToken  = 'pk.eyJ1Ijoic3Jpdi1jaCIsImEiOiJja215YjJyb3cwMjh5MnVudWNwdmFvdjVyIn0.wpuzEF_OJZB1VN9Y-Mqhiw';
const data = require('./data.json');

const Map = () => {
  const [map, setMap] = useState(null)

  function devCountries() {
    const countries =[];
     data.map(good => {
      good.locations.developmentCountries.map(country => {
      countries.push(country)}
     )})
     const uniqueDev = [...new Set(countries)] 
    return uniqueDev
  }

  function depCountries() {
    const countries =[];
     data.map(good => {
      good.locations.deploymentCountries.map(country => {
      countries.push(country)}
     )})
     const uniqueDev = [...new Set(countries)] 
    return uniqueDev
  }
  const dev = devCountries()
  const dep = depCountries()

  
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
      map.addLayer({
        //here we are adding a layer containing the tileset we just uploaded
        id: 'depcountries', //this is the name of our layer, which we will need later
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1', // <--- Add the Map ID you copied here
        },
        'source-layer': 'country_boundaries', // <--- Add the source layer name you copied here
        type: 'fill',
        paint: {
          'fill-color': 'yellow', //this is the color you want your tileset to have (I used a nice purple color)
          'fill-outline-color': '#d11111', //this helps us distinguish individual countries a bit better by giving them an outline
       
        },
      });
        map.setFilter(
        'depcountries',
        ['in', 'name_en'].concat(dep),
      );
      map.setLayoutProperty('depcountries', 'visibility', 'none')
      setMap(map);
    })
    return () => map.remove();
  }, []);


  return (
    <div>
      <div id="map"></div>
      <ToggleButtonGroup onChange={(event, value) =>
      {
        console.log(value)
        var visibility = map.getLayoutProperty(value, 'visibility')
        if (visibility === 'visible') {
          map.setLayoutProperty(value, 'visibility', 'none');
          //this.className = '';
      } else {
         // this.className = 'active';
          map.setLayoutProperty(value, 'visibility', 'visible');
      }
      }
      }>
          <ToggleButton value = "devcountries">Development Countries</ToggleButton>
          <ToggleButton value = "depcountries" >deploymentCountries</ToggleButton>
          <ToggleButton value = "arigato">arigato</ToggleButton>
          <ToggleButton value="gumao">gumao</ToggleButton>
      </ToggleButtonGroup>
      <Autocomplete
        id="combo-box-demo"
        options={data}
        getOptionLabel={(option) => option.id}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
        onChange={(event, value) => {
          console.log(value)
          //setQuery(value)
          //const getdev = data.map(good => {
          //  if (good.id == value) {
              //console.log(good)
          //  }
          //})
          map.addLayer({
            //here we are adding a layer containing the tileset we just uploaded
            id: 'good', //this is the name of our layer, which we will need later
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
            'good',
            ['in', 'name_en'].concat(value.locations.deploymentCountries)
          );
          map.setLayoutProperty('good', 'visibility', 'visible')
        }
        }
      />
    </div>

  )
}

export default Map;