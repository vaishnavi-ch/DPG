import * as React from 'react';
import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Map.css';
import { devCountries, depCountries } from './getdata.js';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken  = 'pk.eyJ1Ijoic3Jpdi1jaCIsImEiOiJja25xYnIwaWUxd2RzMnFueHMxdTZmOG5uIn0.7GVQHVvZ_S8JzG2l4cI9PA';
const data = require('./data.json');
const dep_colors = ['#0868ac','#43a2ca','#7bccc4','#a8ddb5'] 
const dep_id = ['dep_45','dep_30','dep_15','dep_1']
const dev_colors = ['#fc4e2a','#fd8d3c','#feb24c','#fed976']
const dev_id = ['dev_40', 'dev_30', 'dev_20', 'dev_1']
const pathFinders = ['Ghana', 'Jordan', 'Kazakhstan', 'Kyrgyzstan', 'Niger', 'Philippines', 'Rwanda', 'Sierra Leone', 'Vietnam']
//var visibility = ['none','none' , 'none', 'none']
const [ dev, dev_count ] = devCountries()
const [dep, dep_count] = depCountries()
const dpg_layer_id = ['dpg_dev','dpg_dep']
console.log('devvvvvvvvvvvvvvv')
console.log(dev_count)

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
      zoom: 1.2
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

      for (var i = 0; i <= 1; i++){
        map.addLayer({
          //here we are adding a layer containing the tileset we just uploaded
          id: dpg_layer_id[i], //this is the name of our layer, which we will need later
          source: {
            type: 'vector',
            url: 'mapbox://sriv-ch.4v32n796', // <--- Add the Map ID you copied here
          },
          'source-layer': 'ne_10m_admin_0_countries-c5b1jv', // <--- Add the source layer name you copied here
          
          type: 'fill',
          paint: { 
            'fill-opacity': 1,
            'fill-outline-color': 'black',
            //'fill-color' : 'black'
          }
        });
        map.setFilter(
          dpg_layer_id[0],
            ['in', 'NAME_EN'].concat(query.locations.developmentCountries)
        )
        map.setFilter(
          dpg_layer_id[1],
            ['in', 'name_en'].concat(query.locations.deploymentCountries)
        )
        map.setLayoutProperty(dpg_layer_id[0], 'visibility', 'visible')
        map.setLayoutProperty(dpg_layer_id[1], 'visibility', 'visible')
      }
      
      map.on('click', 'pathfinders', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        console.log(e.features)
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name_en)
              .addTo(map);
      });

      map.on('click', 'DPG', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        console.log(e.features)
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name_en)
              .addTo(map);
      });


      for (var i = 0; i <= 3; i++){
        map.on('click', dev_id[i], function (e) {
          map.getCanvas().style.cursor = 'pointer';
          console.log(e.features)
          const name = e.features[0].properties.name_en
          const html = `

          <p><strong>${name}<strong><p>
          <h4>No. of SDGs developed : ${dev_count[`${name}`]} <h4>

          `
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(html)
            .addTo(map);
        });
        map.on('mouseleave', dev_id[i], function () {
          map.getCanvas().style.cursor = '';
          });
      }

      for (var i = 0; i <= 3; i++){
        map.on('click', dep_id[i], function (e) {
          map.getCanvas().style.cursor = 'pointer';
          console.log(e.features)
          const name = e.features[0].properties.name_en
          const html = `

          <p><strong>${name}<strong><p>
          <h4>No. of SDGs implemented : ${dep_count[`${name}`]} <h4>

          `
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(html)
            .addTo(map);
        });
        map.on('mouseleave', dep_id[i], function () {
          map.getCanvas().style.cursor = '';
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
        var toggle_dev = document.getElementById("devcountries");
        var toggle_dep = document.getElementById("depcountries");
        var toggle_pf = document.getElementById("pathfinders");
        var toggle_dpg = document.getElementById("DPG");
        var legend_dev = document.getElementById("legend-dev");
        var legend_dep = document.getElementById("legend-dep");
       // var legend_pf = document.getElementById("pathfinders");
        var legend_dpg = document.getElementById("legend-dpg");
        if (value == 'devcountries') {
          console.log(toggle_dev.style);
          toggle_dev.style.backgroundColor = '#fed976';
          toggle_dep.style.backgroundColor = 'white';
          toggle_pf.style.backgroundColor = 'white';
          toggle_dpg.style.backgroundColor = 'white';

          for (var i = 0; i <= 3; i++){
            map.setLayoutProperty(dev_id[i], 'visibility', 'visible');
            map.setLayoutProperty(dep_id[i], 'visibility', 'none');
          }
          map.setLayoutProperty('pathfinders', 'visibility', 'none');
          for (i = 0; i <= 1; i++){
            map.setLayoutProperty(dpg_layer_id[i], 'visibility', 'none');
          }
          console.log(legend_dev)
          legend_dev.style.visibility = "visible";
          legend_dep.style.visibility = "hidden";
          legend_dpg.style.visibility = "hidden";
        }
        else if (value == 'depcountries') {
          toggle_dev.style.backgroundColor = 'white';
          toggle_dep.style.backgroundColor = '#a8ddb5';
          toggle_pf.style.backgroundColor = 'white';
          toggle_dpg.style.backgroundColor = 'white';
          for (var i = 0; i <= 3; i++){
            map.setLayoutProperty(dep_id[i], 'visibility', 'visible');
            map.setLayoutProperty(dev_id[i], 'visibility', 'none');
          }
          map.setLayoutProperty('pathfinders', 'visibility', 'none');
          for (i = 0; i <= 1; i++){
            map.setLayoutProperty(dpg_layer_id[i], 'visibility', 'none');
          }
          legend_dev.style.visibility = "hidden";
          legend_dep.style.visibility = "visible";
          legend_dpg.style.visibility = "hidden";
        }
        else if (value == 'pathfinders') {
          toggle_dev.style.backgroundColor = 'white';
          toggle_dep.style.backgroundColor = 'white';
          toggle_pf.style.backgroundColor = '#8c96c6';
          toggle_dpg.style.backgroundColor = 'white';
            map.setLayoutProperty('pathfinders', 'visibility', 'visible');
            for (i = 0; i <= 3; i++){
              map.setLayoutProperty(dep_id[i], 'visibility', 'none');
              map.setLayoutProperty(dev_id[i], 'visibility', 'none');
            }
            for (i = 0; i <= 1; i++){
              map.setLayoutProperty(dpg_layer_id[i], 'visibility', 'none');
          }
          legend_dev.style.visibility = "hidden";
          legend_dep.style.visibility = "hidden";
          legend_dpg.style.visibility = "hidden";
          }

        else {
          toggle_dev.style.backgroundColor = 'white';
          toggle_dep.style.backgroundColor = 'white';
          toggle_pf.style.backgroundColor = 'white';
          toggle_dpg.style.backgroundColor = 'yellow';
          for (i = 0; i <= 1; i++){
            map.setLayoutProperty(dpg_layer_id[i], 'visibility', 'visible');
          }
          for (i = 0; i <= 3; i++){
            map.setLayoutProperty(dep_id[i], 'visibility', 'none');
            map.setLayoutProperty(dev_id[i], 'visibility', 'none');
          }
          map.setLayoutProperty('pathfinders', 'visibility', 'none');
          legend_dev.style.visibility = "hidden";
          legend_dep.style.visibility = "hidden";
          legend_dpg.style.visibility = "visible";
         }
       }
        
              
      }>
        <ToggleButton onClick={
          (value) => {setDisplay('combo-box hide')
        console.log(value)}} 
        className="toggle-button" id = 'devcountries' value="devcountries" >Development Countries</ToggleButton>
          <ToggleButton onClick = {() => setDisplay('combo-box hide')}className = "toggle-button" value = "depcountries" id = "depcountries">deployment Countries</ToggleButton>
          <ToggleButton onClick = {() => setDisplay('combo-box hide')} className = "toggle-button" value = "pathfinders" id = "pathfinders">Path Finders</ToggleButton>
        <ToggleButton
          className="toggle-button"
          value="DPG"
          id="DPG"
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
            dpg_layer_id[0],
              ['in', 'NAME_EN'].concat(value.locations.developmentCountries)
          )
          map.setFilter(
            dpg_layer_id[1],
              ['in', 'NAME_EN'].concat(value.locations.deploymentCountries)
          )
          map.setPaintProperty(dpg_layer_id[0], 'fill-color', 'yellow');
          map.setPaintProperty(dpg_layer_id[0],'fill-opacity', 0.5 );
          map.setPaintProperty(dpg_layer_id[1], 'fill-color', 'blue');
          map.setPaintProperty(dpg_layer_id[1],'fill-opacity', 0.5 );
          
            
          //console.log(value.locations.deploymentCountries)
          //map.setLayoutProperty('DPG', 'visibility', 'visible')
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
      <div id="legend-dep" class = 'legend'>
        <h4>Total No. of DPGs :  </h4>
        <h4> No. of DPGs implemented  </h4>
        <div><span style={{ backgroundColor: '#0868ac' }}></span>greater than 45% </div>
        <div><span style={{ backgroundColor: '#43a2ca' }}></span>between 30 - 45%</div>
        <div><span style={{ backgroundColor: '#7bccc4' }}></span>between 15 - 30%</div>
        <div><span style={{ backgroundColor: '#a8ddb5' }}></span>one </div>       
      </div>
      <div id="legend-dev" class = 'legend'>
        <h4>Total No. of DPGs :  </h4>
        <h4> No. of DPGs developed </h4>
        <div><span style={{ backgroundColor: '#fc4e2a' }}></span>greater than 45% </div>
        <div><span style={{ backgroundColor: '#fd8d3c' }}></span>between 30 - 45%</div>
        <div><span style={{ backgroundColor: '#feb24c' }}></span>between 15 - 30%</div>
        <div><span style={{ backgroundColor: '#fed976' }}></span>one </div>       
      </div>
      <div id="legend-dpg" class = 'legend'>
        <div><span style={{ backgroundColor: '#fc4e2a' }}></span>Developed</div>
        <div><span style={{ backgroundColor: '#fd8d3c' }}></span>Deployed</div>
      
      </div>
    </div>




  )
}

export default Map;