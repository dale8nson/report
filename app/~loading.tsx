import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


const Loading = () => {
  return (
    <Box sx={{width:'100vw', height:'100vh', mx:'auto'}} >
      <CircularProgress sx={{mx:'auto', width:'5vw', height:'5vw'}} />
      <Typography variant='h2' sx={{mx:'auto'}}>
        Please wait while loading document...
      </Typography>
    </Box>
  )
}

export default Loading;