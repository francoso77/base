import * as React from 'react';
import { Box, Grid, Button, TextField } from '@mui/material';

const teclado: string[] = [
  'x²', '√', '←', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '+',
  '1', '2', '3', '-',
  'C', '0', ',', '='
]

export default function Home() {
  return (
    <>
      <TextField id="txtVisor" name="txtVisor" variant="outlined" />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
          {teclado.map((tecla, index) => (
            <Grid item xs={3} sm={3} md={3} key={index}>
              <Button>
                {tecla}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
