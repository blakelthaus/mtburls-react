import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Link, Typography } from '@mui/material';

export default function Feed(props) {

  const type = props.data.type
  const title = props.data.title
  const [links, setLinks] = useState()
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    axios.get(`https://l8bjewobxe.execute-api.us-east-1.amazonaws.com/Prod/site?type=${type}`)
      .then(resp => {
        console.log(type)
        console.log(resp.data)
        setLinks(resp.data.links)
        setLoading(false)
      })
      .catch(err => {
        console.log(type)
        console.error(err)
      })
  }, [type])

  const getHoursSince = (time) => {
    let now = new Date()
    let post_date = new Date(time)
    let hours = Math.round(Math.abs(now - post_date) / 36e5)
    if (hours >= 24) {
      return Math.round(hours/24) + 'd'
    } else {
      return hours + 'h'
    }
  }

  return (
    <Box className="feed" 
      sx={{ 
        width: {
          xs: '70%',
          md: '27%'
        },
        marign: '5%',
        padding: '30px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
        {/* <Image sx={{ paddingRight: '10px' }}></Image> */}
        <Typography variant="h6">{title}</Typography>
      </Box>
      
      <Box className="links" sx={{
        maxHeight: '350px',
        overflow: 'scroll',
        fontSize: '.9em'
      }}>
        {!isLoading && (
          links.map(link => {
            return (
              <Box className="article" sx={{ display: 'flex', flexDirection: 'row', padding: '5px' }}>
                <Box className="time" sx={{ color: 'grey', justifyContent: 'left', width: '30px', textAlign: 'left', paddingRight: '10px' }}>
                  {getHoursSince(link.pubDate)}
                </Box>
                <Box className="title" >
                  <Link target="_blank" href={link.link} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', textAlign: 'left' }}>{link.title}</Link>
                </Box>
              </Box>
            )
          })
        )}
      </Box>
    </Box>
  )



}