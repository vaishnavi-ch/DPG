// map visibility
var visibility = ['none','none' , 'none', 'none']


export function set_visibility(value) {
    if (value == 'devcountries') {
       visibility[0] == 'none' ? visibility = ['visible','none' , 'none', 'none'] : visibility = ['none','none' , 'none', 'none']     
    }
    else if (value == 'depcountries'){
      visibility[1] == 'none' ? visibility = ['none','visible','none', 'none'] : visibility = ['none','none' , 'none', 'none'] 
    }
    else if (value == 'PathFinders'){
      visibility[2] == 'none' ? visibility = ['none','none','visible', 'none'] : visibility = ['none','none' , 'none', 'none'] 
    }
    else {
      visibility[3] == 'none' ? visibility = ['none','none','none', 'visible'] : visibility = ['none','none' , 'none', 'none'] 
    }

 return visibility
}

{/*
   if (value == 'depcountries') {
          var visibility = map.getLayoutProperty('dep_45', 'visibility')
          for (var i = 0; i <= 3; i++){
            if (visibility === 'visible') {
              map.setLayoutProperty(dep_id[i], 'visibility', 'none');
              //this.className = '';
          } else {
             // this.className = 'active';
              map.setLayoutProperty(dep_id[i], 'visibility', 'visible');
          }
          }
        }
        else {
          var visibility = map.getLayoutProperty('dev_40', 'visibility')
          for (var i = 0; i <= 3; i++){
            if (visibility === 'visible') {
              map.setLayoutProperty(dev_id[i], 'visibility', 'none');
              //this.className = '';
          } else {
             // this.className = 'active';
              map.setLayoutProperty(dev_id[i], 'visibility', 'visible');
          }
          }
        
        }
*/}