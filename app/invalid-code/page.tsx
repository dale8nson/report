import { Box, Typography } from '@mui/material';

const Page = () => {
  return (
    <Box sx={{ m: 'auto', width: '50vw', height: '100vh' }} >
      <Typography variant='h3' sx={{ color: 'red' }} >
        Error: Code missing or invalid
      </Typography>
    </Box>
  )
}

export default Page;