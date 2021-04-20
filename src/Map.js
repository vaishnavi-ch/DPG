import * as React from 'react';
import { useState, useEffect } from 'react';
import MapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Map.css';
import { devCountries, depCountries } from './getdata.js';
import 'mapbox-gl/dist/mapbox-gl.css';
//import ComboBox from './ComboBox';

mapboxgl.accessToken  = 'pk.eyJ1Ijoic3Jpdi1jaCIsImEiOiJja25xYnIwaWUxd2RzMnFueHMxdTZmOG5uIn0.7GVQHVvZ_S8JzG2l4cI9PA';
const data = require('./data.json');
const dep_colors = ['#0868ac','#43a2ca','#7bccc4','#a8ddb5']
const dep_id = ['dep_45','dep_30','dep_15','dep_1']
const dev_colors = ['#fc4e2a','#fd8d3c','#feb24c','#fed976']
const dev_id = ['dev_40', 'dev_30', 'dev_20', 'dev_1']
const pathFinders = ['Ghana', 'Jordan', 'Kazakhstan', 'Kyrgyzstan', 'Niger', 'Philippines', 'Rwanda', 'Sierra Leone', 'Vietnam']
//var visibility = ['none','none' , 'none', 'none']
const dev = devCountries()
const dep = depCountries()
//console.log(dev)

const Map = () => {
  const [map, setMap] = useState(null)
  const [query, setQuery] = useState(data[0])
  const [display, setDisplay] = useState('combo-box hide')

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      width: '100vw',
      height: '100vh',
      center: [5, 34],
      zoom: 1.5
    });

    map.on('load', function () {
 
        
  for (i=0; i<=3; i++){
    map.addLayer({
      id: dev_id[i], 
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
      dev_id[i],
      ['in', 'name_en'].concat(dev[i]),
    );
    map.setPaintProperty(dev_id[i], 'fill-color', dev_colors[i]);
    map.setLayoutProperty(dev_id[i], 'visibility', 'none')
      }
      
      for (var i=0; i<=3; i++){
        map.addLayer({
          id: dep_id[i], 
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
          dep_id[i],
          ['in', 'name_en'].concat(dep[i]),
        );
        map.setPaintProperty(dep_id[i], 'fill-color', dep_colors[i]);
        map.setLayoutProperty(dep_id[i], 'visibility', 'none')
      } 
    

  
      map.addLayer({
        id: 'pathfinders', 
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1', 
        },
        'source-layer': 'country_boundaries', 
        type: 'fill',
        paint: {
          'fill-color' : '#8c96c6',
          'fill-opacity': 1,
          'fill-outline-color': '#88419d'
        }
      });

      map.setFilter(
        'pathfinders',
        ['in', 'name_en'].concat(pathFinders),
      );
      map.setLayoutProperty('pathfinders', 'visibility', 'none')
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
          'fill-color': 'LightPink', //this is the color you want your tileset to have (I used a nice purple color)
          'fill-outline-color': '#d11111', //this helps us distinguish individual countries a bit better by giving them an outline
       
        },
      });
      map.setFilter(
        'DPG',
          ['in', 'name_en'].concat(query.locations.deploymentCountries)
      )
      map.setLayoutProperty('DPG', 'visibility', 'none')
      
      map.on('click', 'pathfinders', function (e) {
        console.log(e.features)
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
      });

      map.on('click', 'DPG', function (e) {
        console.log(e.features)
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
      });


      for (var i = 0; i <= 3; i++){
        map.on('click', dev_id[i], function (e) {
          console.log(e.features)
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.name)
                .addTo(map);
        });
   
      }

      for (var i = 0; i <= 3; i++){
        map.on('click', dep_id[i], function (e) {
          console.log(e.features)
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.name)
                .addTo(map);
        });
   
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
        //visibility = set_visibility(value)
        if (value == 'devcountries') {
          var visibility = map.getLayoutProperty('dev_40', 'visibility')
          console.log(visibility)
          for (var i = 0; i <= 3; i++){
            if (visibility === 'none') {
              map.setLayoutProperty(dev_id[i], 'visibility', 'visible');
              map.setLayoutProperty(dep_id[i], 'visibility', 'none');
              map.setLayoutProperty('pathfinders', 'visibility', 'none');
              map.setLayoutProperty('DPG', 'visibility', 'none');
          }
          }
        }
        else if (value == 'depcountries') {
          var visibility = map.getLayoutProperty('dep_30', 'visibility')
          console.log(visibility)
          for (var i = 0; i <= 3; i++){
            if (visibility === 'none') {
              map.setLayoutProperty(dep_id[i], 'visibility', 'visible');
              map.setLayoutProperty(dev_id[i], 'visibility', 'none');
              map.setLayoutProperty('pathfinders', 'visibility', 'none');
              map.setLayoutProperty('DPG', 'visibility', 'none');
          }
          }
        }
        else {
          var visibility = map.getLayoutProperty(value, 'visibility')
          if (value == 'pathfinders') {
            map.setLayoutProperty('pathfinders', 'visibility', 'visible');
            for (i = 0; i <= 3; i++){
              map.setLayoutProperty(dep_id[i], 'visibility', 'none');
              map.setLayoutProperty(dev_id[i], 'visibility', 'none');
            }
            map.setLayoutProperty('DPG', 'visibility', 'none');
          }

          else {
            map.setLayoutProperty('DPG', 'visibility', 'visible');
            for (i = 0; i <= 3; i++){
              map.setLayoutProperty(dep_id[i], 'visibility', 'none');
              map.setLayoutProperty(dev_id[i], 'visibility', 'none');
            }
            map.setLayoutProperty('pathfinders', 'visibility', 'none');
          }
        }
        
              
      }
      }>
        <ToggleButton onClick={
          (value) => {setDisplay('combo-box hide')
        console.log(value)}} 
        className="toggle-button" value="devcountries" >Development Countries</ToggleButton>
          <ToggleButton onClick = {() => setDisplay('combo-box hide')}className = "toggle-button" value = "depcountries" >deployment Countries</ToggleButton>
          <ToggleButton onClick = {() => setDisplay('combo-box hide')} className = "toggle-button" value = "pathfinders">Path Finders</ToggleButton>
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
          map.setFilter(
            'DPG',
              ['in', 'name_en'].concat(value.locations.deploymentCountries)
          )
            
          //console.log(value.locations.deploymentCountries)
          map.setLayoutProperty('DPG', 'visibility', 'visible')
        }
        }
      />
      <div id="infobox" class>
        <h4>{query.id}</h4>
        <div>{query.SDGs.map(element => {
          return <div>SDG Number : {element.SDGNumber}</div>
        })}
       </div>
      </div>
      <div id="legend" class = 'hide'>
        <h4>Total No. of goods :  </h4>
        <div><span style={{ backgroundColor: '#0868ac' }}></span>10,000,000</div>
        <div><span style={{ backgroundColor: '#43a2ca' }}></span>10,000,000</div>
        <div><span style={{ backgroundColor: '#7bccc4' }}></span>10,000,000</div>
        <div><span style={{ backgroundColor: '#a8ddb5' }}></span>10,000,000</div>
        
      </div>
    </div>


  )
}

export default Map;