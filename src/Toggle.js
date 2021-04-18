import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function ToggleButtons() {

    //onChange1={(event, value) => {console.log(value)}}

  return (
    <ToggleButtonGroup onChange>
          <ToggleButton value = "devcountries">heloo</ToggleButton>
          <ToggleButton value = "bye" > bye</ToggleButton>
          <ToggleButton value = "arigato">arigato</ToggleButton>
          <ToggleButton value = "gumao">gumao</ToggleButton>
    </ToggleButtonGroup>
  );
}
