import * as React from 'react';
import { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import WordwideNumbers from './WordwideNumbers';

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

const Container = styled('div')`
  width: 100%;
padding:10px 0;
  display: flex;


  align-items: center;
  justify-content: space-around;
  // background-color: #f0f0f0;
`;

function PieCenterLabel({ totalCases }) {
  const { width, height, left, top } = useDrawingArea();

  return (
    <>
      {/* Display the total number of cases */}
      <StyledText x={left + width / 2} y={top + height / 2 - 10}>
        {totalCases}
      </StyledText>
      {/* Display the label 'Total Cases' below the number */}
      <StyledText x={left + width / 2} y={top + height / 2 + 20} fontSize={14}>
        Total Cases
      </StyledText>
    </>
  );
}

export default function World() {
  const [covidData, setCovidData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCases, setTotalCases] = useState(0);
  const [pieData, setPieData] = useState([
    { value: 0, label: 'Death', color: 'red' },     
    { value: 0, label: 'Recovered', color: 'green' }, 
    { value: 0, label: 'Active', color: 'blue' },     
  ]);

  // Fetch COVID data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://covid-193.p.rapidapi.com/statistics', {
          headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': 'afc12cff54msh7af1df5cb618edap1d1696jsn9081bd49cb3c',
          },
        });

        const countries = response.data.response;
        const formattedData = countries.map((item) => ({
          country: item.country,
          deaths: item.deaths.total || 0,
          recoveries: item.cases.recovered || 0,
          active: item.cases.active || 0,
        }));

        setCovidData(formattedData);

        // Calculate total cases deaths, recoveries, active
        const totalCases = formattedData.reduce(
          (acc, curr) => ({
            deaths: acc.deaths + curr.deaths,
            recoveries: acc.recoveries + curr.recoveries,
            active: acc.active + curr.active,
          }),
          { deaths: 0, recoveries: 0, active: 0 }
        );

        // Update pie chart data with colors for each slice
        setPieData([
          { value: totalCases.deaths, label: 'Death', color: 'red' },
          { value: totalCases.recoveries, label: 'Recovered', color: '#B1D690' },
          { value: totalCases.active, label: 'Active', color: 'blue' },
        ]);

        // Set the total number of cases (sum of deaths, recoveries, and active)
        setTotalCases(totalCases.deaths + totalCases.recoveries + totalCases.active);
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
      {/* major countries corana cases */}
      <WordwideNumbers/>
      {/* pie chart */}
    <PieChart
      series={[
        {
          data: pieData,
          innerRadius: 80,
          outerRadius: 100,
          colorByPoint: true, // This enables color setting for each point
        },
      ]}
      {...size}
    >
      <PieCenterLabel totalCases={totalCases} /> {/* Pass totalCases as a prop */}
    </PieChart>

    {/* image */}
    <Box
      component="img"
      src="https://static01.nyt.com/newsgraphics/2021/coronavirus-tracking/images/maps/NYT-World/cases_percap.png" 
      alt="corna map"
      sx={{
        width: '100%',  
        maxWidth: '400px', 
        height: 'auto',
        borderRadius: '8px', 
      }}
    />
    
    </Container>

  );
}
