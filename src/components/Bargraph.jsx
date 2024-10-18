import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import axios from 'axios';
import { Typography } from '@mui/material';

// Styled container for the chart
const Container = styled.div`
padding:10px 0; 
  width: 100%;
  display: flex;
  flex-direction: column; /* Ensure charts align horizontally */
  align-items: center;
  

  background-color: #f0f0f0;
`;

// Chart box with basic styling and scrollbar
const ChartBox = styled.div`
  width: 800px;
  height: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: auto; /* Add this line for horizontal scrollbar */
`;

// Main container for charts (optional)

// Flexbox for additional data display (optional)

const CovidBarChart = () => {
  const [covidData, setCovidData] = useState([]);
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
        const formattedData = countries.map(item => ({
          country: item.country,
          deaths: item.deaths.total || 0,
          recoveries: item.cases.recovered || 0,
        }));

        setCovidData(formattedData);
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
    <>
    <Box style={{display:"flex",  flexDirection:"column", alignItems:"flex-start", padding:"0 15px",   backgroundColor: "#f0f0f0", marginTop:"20px"}}>
    <Typography variant='h5'>Covid-19 statistics</Typography>
    <Typography>as of 5 April 2020 09:41 Am</Typography>
    </Box>

    <Container>
   
      <ChartBox>
        {covidData.length > 0 ? (
          <BarChart
            dataset={covidData}
            xAxis={[{ scaleType: 'band', dataKey: 'country' }]}
            series={[
              { dataKey: 'deaths', label: 'Deaths', valueFormatter: valueFormatter },
              { dataKey: 'recoveries', label: 'Recoveries', valueFormatter: valueFormatter },
            ]}
            margin={{ top: 0, right: 30, bottom: 20, left: 100 , }}  
            width={800} // Adjust width as needed
            height={250} // Adjust height as needed
            sx={{
              '& .MuiBarChart-root': {
                // Styling for chart elements (optional)
              },
            }}
          />
        ) : (
          <p>No data available.</p>
        )}
      </ChartBox>
    </Container>
    </>
  );
};

const valueFormatter = (value) => {
  return value?.toLocaleString(); // Format numbers with commas (optional chaining)
};

export default CovidBarChart;