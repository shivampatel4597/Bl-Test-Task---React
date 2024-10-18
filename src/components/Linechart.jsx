import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { LineChart, LinePlot, MarkPlot, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';
import axios from 'axios';
import { Typography } from '@mui/material';

// Styled container for the chart
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row; /* Ensure charts align horizontally */
  align-items: flex-start;
  justify-content: space-around; /* Space the charts evenly */
padding:10px 0;
background-color: #f0f0f0

`;

// Box for the chart
const ChartBox = styled.div`
  width: 100%;
  max-width: 340px;  
  height: 200px;  
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction:column;
 
  justify-content: center;
  align-items: center;
`;

// Main container for charts


// Flexbox for line cases (optional additional data display)
const LineCase = styled.div`
  width: 80%;
  margin-top:5px;
  display: flex;
  align-items: center;
  justify-content: space-around;

`;

const CovidDeathChart = () => {
  const [deathData, setDeathData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://covid-193.p.rapidapi.com/statistics', {
          headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': 'afc12cff54msh7af1df5cb618edap1d1696jsn9081bd49cb3c' // Replace with your actual API key
          }
        });

        const countries = response.data.response;
        const deathCounts = countries.map(item => item.deaths.total || 0);
        const countryNames = countries.map(item => item.country);

        // Find the country with the minimum and maximum deaths
        const minDeathsIndex = deathCounts.indexOf(Math.min(...deathCounts));
        const maxDeathsIndex = deathCounts.indexOf(Math.max(...deathCounts));

        const minDeathCountry = countryNames[minDeathsIndex];
        const minDeathCount = deathCounts[minDeathsIndex];
        const maxDeathCountry = countryNames[maxDeathsIndex];
        const maxDeathCount = deathCounts[maxDeathsIndex];

        console.log('Min Death Country:', minDeathCountry, 'Count:', minDeathCount);
        console.log('Max Death Country:', maxDeathCountry, 'Count:', maxDeathCount);

        // Set state for min and max death counts only
        setDeathData([minDeathCount, maxDeathCount]); // Only minimum and maximum death counts
        setCountryData([minDeathCountry, maxDeathCountry]); // Country names for x-axis
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Container>Loading data...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
   
        <ChartBox>
          <LineChart
            series={[{ data: deathData }]}
            xAxis={[{ scaleType: 'point', data: countryData }]}
            width={250}
            height={150}
         
            margin={{ top: 20, right: 30, bottom: 20, left: 23, }}  
            sx={{
              '& .MuiLineChart-xAxis': {
                display: 'none',
              },
              '& .MuiLineChart-yAxis': {
                display: 'none',
              },
              [`& .${lineElementClasses.root}`]: {
                stroke: 'blue',
                strokeWidth: 2,
              },
              [`& .${markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.6',
                fill: '#fff',
                strokeWidth: 2,
              },
            }}
            disableAxisListener
          >
            <LinePlot />
            <MarkPlot color="#d32f2f" size={5} />
          </LineChart>
          <LineCase>
          <Typography variant="h4" style={{ color: "#77CDFF" }}>{deathData[1]}</Typography>
          <Typography variant="h5" style={{ color: "#77CDFF" }}>23%{<ArrowUpwardIcon fontSize='small'/>}</Typography>
        </LineCase>
        <Typography style={{marginRight:"160px",fontSize:"30px", fontWeight:"bold"}}>Cases</Typography>
        </ChartBox>

        {/* for death */}
      
        <ChartBox>
          <LineChart
            series={[{ data: deathData }]}
            xAxis={[{ scaleType: 'point', data: countryData }]}
            width={250}
            height={150}
            margin={{ top: 20, right: 30, bottom: 20, left: 23, }}  
            sx={{
              '& .MuiLineChart-xAxis': {
                display: 'none',
              },
              '& .MuiLineChart-yAxis': {
                display: 'none',
              },
              [`& .${lineElementClasses.root}`]: {
                stroke: 'blue',
                strokeWidth: 2,
              },
              [`& .${markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.6',
                fill: '#fff',
                strokeWidth: 2,
              },
            }}
            disableAxisListener
          >
            <LinePlot />
            <MarkPlot color="#d32f2f" size={5} />
          </LineChart>
          <LineCase>
          <Typography variant="h4" style={{ color: "red" }}>{deathData[1]}</Typography>
          <Typography variant="h5" style={{ color: "red" }}>23%{<ArrowUpwardIcon fontSize='small'/>}</Typography>
        </LineCase>
        <Typography style={{marginRight:"160px",fontSize:"30px", fontWeight:"bold"}}>Death</Typography>
        </ChartBox>

        {/* for recovered */}
        <ChartBox>
          <LineChart
            series={[{ data: deathData }]}
            xAxis={[{ scaleType: 'point', data: countryData }]}
            width={250}
            height={150}
            margin={{ top: 20, right: 30, bottom: 20, left: 23, }}  
            sx={{
              '& .MuiLineChart-xAxis': {
                display: 'none',
              },
              '& .MuiLineChart-yAxis': {
                display: 'none',
              },
              [`& .${lineElementClasses.root}`]: {
                stroke: 'blue',
                strokeWidth: 2,
              },
              [`& .${markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.6',
                fill: '#fff',
                strokeWidth: 2,
              },
            }}
            disableAxisListener
          >
            <LinePlot />
            <MarkPlot color="#d32f2f" size={5} />
          </LineChart>
          <LineCase>
          <Typography variant="h4" style={{ color: "#B1D690" }}>{deathData[1]}</Typography>
          <Typography variant="h5" style={{ color: "#B1D690" }}>23%{<ArrowUpwardIcon fontSize='small'/>}</Typography>
        </LineCase>
        <Typography style={{marginRight:"70px",fontSize:"30px", fontWeight:"bold"}}>Recovered</Typography>
        </ChartBox>

       
    </Container>
  );
};

export default CovidDeathChart;
