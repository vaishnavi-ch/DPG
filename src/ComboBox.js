import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//import { Card, CardContent, Typography } from "@material-ui/core"



const data = require('./data.json');
//const base = 'https://api.digitalpublicgoods.net/dpg/'


function ComboBox() {
 const [query, setQuery] = useState(data[0]);


  //const sdg = query.SDGs.map(sdg1 => console.log(sdg1))

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={data}
        getOptionLabel={(option) => option.id}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
        onChange={(event, value) => {
          console.log(value)
          setQuery(value)
        }
        }
      
      />
{/*
< Card className="infoBox legend">
        <CardContent>
          <div>{//query.id}</div>
          <Typography color="textSecondary">{query.SDGs.map(element => {
            return <div>SDG Number : {element.SDGNumber}</div>
          })}</Typography>
        </CardContent>
        </Card>
        </Card>*/}
      </div>
  );
}


export default ComboBox;
