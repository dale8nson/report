'use client';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const MDContents = ({ MDComponent }) => {

  const [MarkDown, setMarkDown] = useState(<></>);
  useEffect(() => {
    setMarkDown(MDComponent);
  }, [MDComponent])


  return (
    <Box sx={{ width: '70%', marginInline: 'auto' }}>
      <Paper variant='elevation' elevation={2} sx={{ p: 16, m: 6 }} >
        {MarkDown}
      </Paper>
    </Box>
  );
}

export default MDContents;