import React from 'react'
import {Box, Stack, Typography} from '@mui/material';
import HorizontalBarContent from './HorizontalBarContent';

function HorizontalBar() {
  return (
    <Stack alignItems="center" mt="180px" justifyContent="center" p="20px" backgroundColor="#454545">
    <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center" color="#fff">
      Latest Foods
    </Typography>

    <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
    
    <HorizontalBarContent />

    </Box>

  </Stack>
  )
}

export default HorizontalBar