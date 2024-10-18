import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import userImg from "../assets/user.jpeg"; 

const Liveupdate = () => {
  const [caseUpdates, setCaseUpdates] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        const response = await axios.get('https://covid-193.p.rapidapi.com/statistics', {
          headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': 'afc12cff54msh7af1df5cb618edap1d1696jsn9081bd49cb3c', 
          },
        });
        const data = response.data.response.slice(0, 8); 
        setCaseUpdates(data); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };

    fetchCovidData();
  }, []); 

  const cardStyle = {
    mainBox: {
    
      height: '100vh',
      width: '20%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '10px',
    },
    listBox: {
    //   border: '2px solid black',
      height: '60%',
      overflowY: 'auto',
      padding: '10px',
    },
    listText: {
      fontSize: '12px',
    },
    cardBox: {
    
      height: '40%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
    },
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: '#b208f2',

      borderRadius: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardImg: {
      height: '70%',
      marginBottom: '10px',
      width: '90%',
      borderRadius: '50%',
    
    },
    contentBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '0 10px',
    },
    symptomText: {
      fontSize: '20px',
      color: 'white',
      fontWeight: 700,
    },
    readText: {
      fontSize: '12px',
      color: 'white',
    },
    arrowIcon: {
      color: 'white',
    },
  };

  return (
    <>
   
      <Box sx={cardStyle.mainBox}>
        {/* List of Updates */}
        <Box sx={cardStyle.listBox}>
          <Typography variant="h6">Live Update</Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <List>
              {caseUpdates.map((update, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`${update.cases.new || '0'} New Cases in ${update.country}`} 
                    sx={cardStyle.listText} 
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* Card for Symptoms */}
        <Box sx={cardStyle.cardBox}>
          <Box sx={cardStyle.card}>
            <IconButton sx={cardStyle.cardImg}>
              <img src={userImg} alt="user" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            </IconButton>
            <Box sx={cardStyle.contentBox}>
              <Box>
                <Typography sx={cardStyle.symptomText}>Symptoms</Typography>
                <Typography sx={cardStyle.readText}>Read Carefully 5 Symptoms of Covid-19</Typography>
              </Box>
              <IconButton>
                <ArrowForwardIcon sx={cardStyle.arrowIcon} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Liveupdate;
