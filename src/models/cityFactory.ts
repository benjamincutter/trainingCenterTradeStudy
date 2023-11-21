import cityData from '../data/cities.json';

export interface City {
    id: number;
    name: string;
    comfortIndex: number;
    sunnyDays: number;
    commuteTime: number;
    propertyTax: number;
    jobGrowth: number;
    violentCrime: number;
    unemploymentRate: number;
    hospitalitySector: number;
    houseAppreciation: number;
    medianAge: number;
}

export type CityFields =
    | 'comfortIndex'
    | 'sunnyDays'
    | 'commuteTime'
    | 'propertyTax'
    | 'jobGrowth'
    | 'violentCrime'
    | 'unemploymentRate'
    | 'hospitalitySector'
    | 'houseAppreciation'
    | 'medianAge';

interface FieldWeight {
    field: CityFields;
    inverted: boolean;
    prettyName: string;
}

export const WEIGHTED_FIELDS: FieldWeight[] = [
    { field: 'comfortIndex', inverted: false, prettyName: 'Comfort Index' },
    { field: 'sunnyDays', inverted: true, prettyName: 'Sunny Days' },
    { field: 'commuteTime', inverted: true, prettyName: 'Commute Time' },
    { field: 'propertyTax', inverted: true, prettyName: 'Property Tax' },
    {
        field: 'jobGrowth',
        inverted: false,
        prettyName: 'Job Growth (12 months)',
    },
    {
        field: 'violentCrime',
        inverted: true,
        prettyName: 'Violent Crime Rate',
    },
    {
        field: 'unemploymentRate',
        inverted: true,
        prettyName: 'Unemployment Rate',
    },
    {
        field: 'hospitalitySector',
        inverted: false,
        prettyName: 'Hospitality Sector',
    },
    {
        field: 'houseAppreciation',
        inverted: false,
        prettyName: 'House Appreciation (12 months)',
    },
    { field: 'medianAge', inverted: true, prettyName: 'Median Age' },
];

const cityMapper = {
    comfortIndex: 'Comfort index - 100 = most comfort on hot days',
    sunnyDays: 'Days per year with some sun',
    commuteTime: 'Commute Time',
    propertyTax: 'Effective property tax rate - $ per $1000 home value',
    jobGrowth: 'Recent job growth - past 12 months',
    violentCrime: 'Violent crime risk index - 1=lowest crime',
    unemploymentRate: 'Unemployment rate',
    hospitalitySector: 'Occupation-Arts, design, media, sports, entertainment',
    houseAppreciation: 'House appreciation - last 12 months',
    medianAge: 'Median age of population',
};

// @ts-ignore
const mapCity = (rawCity, id): City => {
    // @ts-ignore
    const city: City = {
        id,
        name: rawCity.cityName,
    };
    for (const key in cityMapper) {
        // @ts-ignore
        city[key] = rawCity[cityMapper[key]];
    }
    return city;
};

export function getCities() {
    const cities = [];
    for (let i = 0; i < cityData.length; i++) {
        cities.push(mapCity(cityData[i], i));
    }
    return cities;
}
