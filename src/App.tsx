import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import RawDataTable from './components/RawDataTable';
import TableControls from './components/TableControls';
import City from './models/city';
import { useNormalizedCities } from './hooks/useNormalizeField';

const cities: City[] = [
    new City(1, 'Charlotte', 7.5, 218, 25.3),
    new City(2, 'Atlanta', 7.6, 217, 26.3),
    new City(3, 'San Antonio', 7.6, 220, 24.13),
    new City(4, 'West Palm Beach', 6.6, 238, 22.69),
    new City(5, 'Colorado Springs', 7.1, 243, 21.83),
    new City(6, 'Santa Fe', 7.5, 283, 19.14),
    new City(7, 'Chicago', 7, 189, 34.63),
    new City(8, 'Olympia', 7.1, 136, 20.48),
    new City(9, 'Boston', 6.9, 200, 30.44),
    new City(10, 'San Diego', 9.2, 266, 23.97),
];

function App() {
    const defaultWeight = 1 / 3;
    const [sunnyDaysWeight, setSunnydaysWeight] = useState(defaultWeight);
    const [comfortIndexWeight, setComfortIndexWeight] = useState(defaultWeight);
    const [commuteTimeWeight, setCommuteTimeWeight] = useState(defaultWeight);
    const [showNormalizedScore, setShowNormalizedScore] = useState(false);

    const normalizedComfortIndex = useNormalizedCities(cities, {
        comfortIndex: comfortIndexWeight,
        sunnyDays: sunnyDaysWeight,
        commuteTime: commuteTimeWeight,
    });
    console.dir(normalizedComfortIndex);
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
