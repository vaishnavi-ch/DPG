const data = require('./data.json');

export function devCountries() {
    const countries =[];
    const arr_countries = [[],[],[],[]];
    var count = 0;
     data.map(good => {
      count ++;
      good.locations.developmentCountries.map(country => {
      countries.push(country)}
     )})
    //const uniqueDev = [...new Set(countries)]
    console.log(count)
    const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    const dev_countries = countOccurrences(countries);
    console.log(dev_countries)
    console.log(Object.values(dev_countries))
    Object.keys(dev_countries).forEach(function(item){
    if(dev_countries[item] >= count * 0.4){
      arr_countries[0].push(item);
    } 
    else if(dev_countries[item] >= count * 0.3 && dev_countries[item] < count * 0.4){
      arr_countries[1].push(item);
    }
    else if(dev_countries[item] >= count * 0.2 && dev_countries[item] < count * 0.3){
      arr_countries[2].push(item);
    }
    else  {
      arr_countries[3].push(item);
    }
         
  });

    console.log('chlooooooor')
  console.log([ arr_countries, dev_countries ])
  return [ arr_countries, dev_countries ]
}

export function depCountries() {
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
    return [arr_countries, dep_countries]
  }

