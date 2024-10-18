import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';

// Styled components using MUI's `styled` utility
const Container = styled('div')(({ theme }) => ({
  padding: '20px',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));
const Title = styled('h1')(({ theme }) => ({
  fontSize: '24px',
  marginBottom: '20px',
  color: 'black', // Set the color to black
}));


const List = styled('ul')(({ theme }) => ({
  listStyleType: 'none',

  display:'flex',
  flexDirection:'column',
  alignItems:'start'
}));

const ListItem = styled('li')(({ theme }) => ({
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[100],
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
}));

const ErrorMessage = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
}));

const LoadingMessage = styled('div')(({ theme }) => ({
  color: theme.palette.info.main,
}));

const WordwideNumbers = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // List of specific countries to display
  const specificCountries = ['USA', 'Spain', 'Italy', 'China', 'France', 'Germany'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://covid-193.p.rapidapi.com/statistics', {
          headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': 'afc12cff54msh7af1df5cb618edap1d1696jsn9081bd49cb3c', // Replace with your actual API key
          },
        });

        const countries = response.data.response;

        // Filter data to only include the specific countries
        const filteredCountries = countries.filter((country) =>
          specificCountries.includes(country.country)
        );

        setCountriesData(filteredCountries); // Set the filtered response to the state
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
    return <LoadingMessage>Loading data...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>World Map</Title>
      <List>
        {countriesData.map((country) => (
          <ListItem key={country.country}>
              <span style={{fontWeight:"700"}}>{country.cases.total} </span>{country.country}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default WordwideNumbers;
