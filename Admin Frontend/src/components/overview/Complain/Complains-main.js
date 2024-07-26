import React from 'react'
import { Container, Typography } from '@mui/material';

import ComplainsNew from './Complain-new';
import ComplainsOld from './Complain-old';

const topicSx = {
  fontFamily: 'Poppins',
  color: '#FFFFFF',
  textAlign: 'right',
  mb: '10px'  
}

function SystemMain(props){
    return(
        <Container maxWidth="false">
          <Typography variant="h5" sx={topicSx}>Pending</Typography>
          <ComplainsNew />
          <Typography variant="h5" sx={topicSx}>Resolved</Typography>
          <ComplainsOld />
        </Container>
    );
}

export default SystemMain