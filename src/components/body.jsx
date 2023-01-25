import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Feed from './feed';


export default function Body() {

  const [sites, setSites] = useState({})
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://l8bjewobxe.execute-api.us-east-1.amazonaws.com/Prod/site')
      .then(resp => {
        console.log(resp.data)
        setSites(resp.data.links)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <Box className="feedbody" sx={{ width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: '#F7F7F7'}}>
        <Box className="feeds" 
          sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            justifyContent: 'center' 
          }}
        >
          {!isLoading && (
            Object.keys(sites).map(site => {
              console.log(site)
              return (
                <Feed key={site} data={sites[site]}/>
              ) 
            })
          )}
        </Box>
      </Box>
    </>
  )
}