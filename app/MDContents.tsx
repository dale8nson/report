'use client';
import './globals.css';
import { ReactElement, useEffect, useState, useMemo } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from "next/link";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';



const MDContents = ({ MDComponent }) => {

  const [index, setIndex] = useState(0);
  const [MarkDown, setMarkDown] = useState(<></>);
  useEffect(() => {
    setMarkDown(MDComponent);
  }, [MDComponent])

  const contents = useMemo(() => {
    const contents: { [id: string]: { text: string, children: {}[] } } = {};
    let h2 = null;
    for (const el of MDComponent) {
      if (el.type === 'h2') {
        h2 = el.props.id;
        contents[h2] = { text: el.props.children, children: [] };
      }
      if (el.type === 'h3') {
        contents[h2].children.push({ id: el.props.id, text: el.props.children });
      }
    }

    console.log(`contents:`, contents);

    return contents;

  }, [MDComponent]);

  const onClickHandler = (e, id, i: number) => {
    console.log(`e:`, e);
    console.log(`setting index to ${i}`);
    setIndex(i);
    document.getElementById(id)?.scrollIntoView({ behavior:'auto',block:'start', inline:'nearest'});
  }
  const tocKeys = useMemo(() => {


    const tocKeys: string[] = [];
    for (const heading in contents) {
      tocKeys.push(heading);
      for (const subHeading of contents[heading].children) {
        tocKeys.push(subHeading.id);
      }
    }

    console.log(`tocKeys:`, tocKeys);

    return tocKeys;

  }, [contents])

  const tableOfContents = Object.keys(contents).map(heading => {
    const subHeadings: ReactElement[] = [];
    for (const subHeading of contents[heading].children) {

      subHeadings.push((
        <ListItem key={crypto.randomUUID()} sx={{ m: 0, p: 0 }} >
          <ListItemButton selected={index === tocKeys.indexOf(subHeading.id)} onClick={(e) => onClickHandler(e, subHeading.id, tocKeys.indexOf(subHeading.id))} sx={{ pl: 4, py: 0, m: 0, fontSize:'1rem' }} >
            <ListItemText primary={subHeading.text} primaryTypographyProps={{variant:'body2'}} />
          </ListItemButton>
        </ListItem>
      ))
    }

    return (
      <>
        <ListItem key={crypto.randomUUID()} sx={{ m: 0, p: 0 }} >
          <ListItemButton selected={index === tocKeys.indexOf(heading)} onClick={(e) => onClickHandler(e, heading, tocKeys.indexOf(heading))} sx={{ m: 0, px: 2 }} >
            <ListItemText primary={contents[heading].text} primaryTypographyProps={{variant:'button'}} />
          </ListItemButton>
        </ListItem>
        {subHeadings}
      </>
    );

  });

  return (
    <>
      <Box sx={{ display: 'flex' }} >
        <Box sx={{ position: 'fixed', width: '20%', height: '100dvh', overflow: 'scroll' }}>
          <List >
            <Typography variant='h4' sx={{ml:2}}>
              CONTENTS
            </Typography>
            {tableOfContents}
          </List>
        </Box>
        <Box component='div' sx={{ width: '80%', ml: '20%' }}>
          <Paper variant='elevation' elevation={2} sx={{ p: 16, m: 0}} >
            {MarkDown}
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default MDContents;