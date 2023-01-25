import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Link } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function Feed(props) {

  const type = props.data.type
  const title = props.data.title
  const color = props.data.color
  const extension = props.data.extension 
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
    <>
      <Box className="feed" 
        sx={{ 
          width: {
            xs: '70%',
            sm: '40%',
            md: '27%'
          },
          padding: '30px',
        }}
      >
        <Box sx={{ height: '60px', backgroundColor: color, color: 'white', display: 'flex', alignItems: 'middle', padding: '10px', borderRadius: '10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'middle' }}>
            <img 
              src={`/assets/${type}${extension}`}
              alt={title}
              style={{ width: '50px', padding: '10px'}}
            />
            {/* <Typography variant="h6">{title}</Typography> */}
            <h3 style={{ height: '60px'}}>{title}</h3>
          </Box>
        </Box>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
            <CircularProgress />
          </Box>
        )}
        {!isLoading && (
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
        )}
      </Box>
    </>
    
  )



}