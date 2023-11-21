import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import RawDataTable from './components/RawDataTable';
import TableControls from './components/TableControls';
import { useNormalizedCities } from './hooks/useNormalizeField';
import { WEIGHTED_FIELDS, getCities } from './models/cityFactory';

function App() {
    const cities = getCities();
    const defaultWeight = 1 / 10;
    const [sunnyDaysWeight, setSunnydaysWeight] = useState(defaultWeight);
    const [comfortIndexWeight, setComfortIndexWeight] = useState(defaultWeight);
    const [commuteTimeWeight, setCommuteTimeWeight] = useState(defaultWeight);
    const [propertyTaxWeight, setPropertyTaxWeight] = useState(defaultWeight);
    const [jobGrowhtWeight, setJobGrowthWeight] = useState(defaultWeight);
    const [violentCrimeWeight, setViolentCrimeWeight] = useState(defaultWeight);
    const [unemploymentWeight, setUnemploymentWeight] = useState(defaultWeight);
    const [hospitalitySectorWeight, setHospitalitySectorWeight] =
        useState(defaultWeight);
    const [houseAppreciationWeight, setHouseAppreciationWeight] =
        useState(defaultWeight);
    const [medianAgeWeight, setMedianAgeWeight] = useState(defaultWeight);

    const [showNormalizedScore, setShowNormalizedScore] = useState(false);

    const normalizedComfortIndex = useNormalizedCities(cities, {
        comfortIndex: comfortIndexWeight,
        sunnyDays: sunnyDaysWeight,
        commuteTime: commuteTimeWeight,
        propertyTax: propertyTaxWeight,
        jobGrowth: jobGrowhtWeight,
        violentCrime: violentCrimeWeight,
        unemploymentRate: unemploymentWeight,
        hospitalitySector: hospitalitySectorWeight,
        houseAppreciation: houseAppreciationWeight,
        medianAge: medianAgeWeight,
    });
    const sliders = [
        {
            name: 'Sunny Days',
            value: sunnyDaysWeight,
            setValue: setSunnydaysWeight,
        },
        {
            name: 'Comfort Index',
            value: comfortIndexWeight,
            setValue: setComfortIndexWeight,
        },
        {
            name: 'Commute Time',
            value: commuteTimeWeight,
            setValue: setCommuteTimeWeight,
        },
        {
            name: 'Property Tax',
            value: propertyTaxWeight,
            setValue: setPropertyTaxWeight,
        },
        {
            name: 'Job Growth',
            value: jobGrowhtWeight,
            setValue: setJobGrowthWeight,
        },
        {
            name: 'Violent Crime',
            value: violentCrimeWeight,
            setValue: setViolentCrimeWeight,
        },
        {
            name: 'Unemployment Rate',
            value: unemploymentWeight,
            setValue: setUnemploymentWeight,
        },
        {
            name: 'Hospitality Sector',
            value: hospitalitySectorWeight,
            setValue: setHospitalitySectorWeight,
        },
        {
            name: 'House Appreciation',
            value: houseAppreciationWeight,
            setValue: setHouseAppreciationWeight,
        },
        {
            name: 'Median Age',
            value: medianAgeWeight,
            setValue: setMedianAgeWeight,
        },
    ];
    return (
        <div className="App">
            <header className="App-header">
                Trade Study
                <TableControls
                    setShowNormalizedScore={setShowNormalizedScore}
                    showNormalizedScore={showNormalizedScore}
                    sliders={sliders}
                />
                <RawDataTable
                    data={normalizedComfortIndex}
                    useNormalized={showNormalizedScore}
                />
            </header>
        </div>
    );
}

export default App;
