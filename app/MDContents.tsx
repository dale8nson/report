'use client';
import './globals.css';
import { ReactElement, useEffect, useState, useMemo, Suspense } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';



const MDContents = ({ MDComponent }: { MDComponent: ReactElement }) => {

  const [index, setIndex] = useState(0);
  const [MarkDown, setMarkDown] = useState(<></>);
  useEffect(() => {
    setMarkDown(MDComponent);
  }, [MDComponent])

  const contents = useMemo(() => {
    const contents: { [id: string]: { text: string, children: { id: string, text: string }[] } } = {};
    let h2 = null;
    for (const el of MDComponent as any) {
      if (el.type === 'h2') {
        h2 = el.props.id;
        contents[h2] = { text: el.props.children, children: [] };
      }
      if (el.type === 'h3') {
        contents[h2].children.push({ id: el.props.id, text: el.props.children });
      }
    }

    return contents;

  }, [MDComponent]);

  const onClickHandler = (e: any, id: string, i: number) => {
    setIndex(i);
    document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
  }
  const tocKeys = useMemo(() => {


    const tocKeys: string[] = [];
    for (const heading in contents) {
      tocKeys.push(heading);
      for (const subHeading of contents[heading].children) {
        tocKeys.push(subHeading.id);
      }
    }

    return tocKeys;

  }, [contents])

  const tableOfContents = Object.keys(contents).map(heading => {
    const subHeadings: ReactElement[] = [];
    for (const subHeading of contents[heading].children) {

      subHeadings.push((
        <ListItem key={crypto.randomUUID()} sx={{ m: 0, p: 0 }} >
          <ListItemButton key={crypto.randomUUID()} selected={index === tocKeys.indexOf(subHeading.id)} onClick={(e) => onClickHandler(e, subHeading.id, tocKeys.indexOf(subHeading.id))} sx={{ pl: 4, py: 0, m: 0, fontSize: '1rem' }} >
            <ListItemText key={crypto.randomUUID()} primary={subHeading.text} primaryTypographyProps={{ variant: 'body2' }} />
          </ListItemButton>
        </ListItem>
      ))
    }

    return (
      <>
        <ListItem key={crypto.randomUUID()} sx={{ m: 0, p: 0 }} >
          <ListItemButton key={crypto.randomUUID()} selected={index === tocKeys.indexOf(heading)} onClick={(e) => onClickHandler(e, heading, tocKeys.indexOf(heading))} sx={{ m: 0, px: 2 }} >
            <ListItemText key={crypto.randomUUID()} primary={contents[heading].text} primaryTypographyProps={{ variant: 'button' }} />
          </ListItemButton>
        </ListItem>
        {subHeadings}
      </>
    );

  });

  return (
    <>
      <Box sx={{ display: 'flex', width: '100vw' }} >
        <Box sx={{ '@media print': { display: 'none' }, position: 'fixed', width: '15%', height: '100dvh', overflow: 'scroll' }}>
          <List >
            <Typography variant='h4' sx={{ ml: 2, fontWeight: 'bold' }}>
              CONTENTS
            </Typography>
            <ListItem key={crypto.randomUUID()} sx={{ m: 0, p: 0 }} >
              <ListItemButton key={crypto.randomUUID()} selected={index === 1000} onClick={(e) => onClickHandler(e, 'top', 1000)} sx={{ m: 0, px: 2 }} >
                <ListItemText primary={'Top'} primaryTypographyProps={{ variant: 'button' }} />
              </ListItemButton>
            </ListItem>
            {tableOfContents}
          </List>
        </Box>
        <Box component='div' sx={{ '@media print': { width: '100%', ml: 0 }, width: '85%', ml: '15%' }}>
          <div id='top' />
          <Paper variant='elevation' elevation={2} sx={{ '@media print': { p: 8 }, p: 16, m: 0 }} >
            {/* <Suspense fallback={<CircularProgress />}> */}
              {MarkDown}
            {/* </Suspense> */}
          </Paper>
        </Box>
      </Box>
    </>
  );
}

// export const dynamic = 'force-static';

export default MDContents;