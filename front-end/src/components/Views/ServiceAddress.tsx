import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Typography} from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -24.0308025,
  lng: -52.3821952
};
function ServiceAddress() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
       
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
              <Typography variant="h2" fontWeight={"bold"} component="h2" gutterBottom>
                {'Visite nosso ' } 
                {'estabelecimento!'}
              </Typography>
              <p >
              R. Rosalina Maria Ferreira, 1233 - Vila Carolo, Campo Mourão - PR, 87301-899
              </p>
              </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: 'flex', position: 'relative' }}
        >
          <Box
            sx={{
              width: '100%',
              background: 'url(/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
          <Box
            sx={{
      
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 800,
            }}
          >
            <LoadScript
              googleMapsApiKey="AIzaSyDRsyQLIFvij-uzuoCxu__znw7UcCbEhik"
             >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
              >
                <Marker position={center} />
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
              </GoogleMap>
            </LoadScript>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ServiceAddress;
