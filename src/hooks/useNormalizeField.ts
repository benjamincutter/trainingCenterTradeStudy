import City from '../models/city';

interface NormalizedFieldResult {
    minimum: number;
    maximum: number;
    range: number;
}

interface FieldValue {
    value: number;
    normalized: number;
}

interface NormalizedCity {
    city: City;
    normalizedComfortIndex: number;
    normalizedSunnyDays: number;
    normalizedCommuteTime: number;
}

export interface NormalizedCity2 {
    id: number;
    name: string;
    comfortIndex: FieldValue;
    sunnyDays: FieldValue;
    commuteTime: FieldValue;
    weightedScore: number;
}

type CityFields = 'comfortIndex' | 'sunnyDays' | 'commuteTime';

export const useNormalizedCities = (
    cities: City[],
    weights: Record<CityFields, number>
): NormalizedCity2[] => {
    const fields: CityFields[] = ['comfortIndex', 'sunnyDays', 'commuteTime'];
    const normalizedResults: Record<string, NormalizedFieldResult> = {};
    fields.forEach((field) => {
        normalizedResults[field] = getNormalizedField(cities, field);
    });

    return cities.map((city) => {
        const normalizedComfortIndex = normalizeField(
            city.comfortIndex,
            normalizedResults.comfortIndex
        );
        const normalizedSunnyDays = normalizeField(
            city.sunnyDays,
            normalizedResults.sunnyDays
        );
        const normalizedCommuteTime = normalizeField(
            city.commuteTime,
            normalizedResults.commuteTime
        );

        return {
            id: city.id,
            name: city.name,
            comfortIndex: {
                value: city.comfortIndex,
                normalized: normalizedComfortIndex,
            },
            commuteTime: {
                value: city.commuteTime,
                normalized: normalizedCommuteTime,
            },
            sunnyDays: {
                value: city.sunnyDays,
                normalized: normalizedSunnyDays,
            },
            weightedScore: roundToTwoDecimals(
                normalizedComfortIndex * weights.comfortIndex +
                    normalizedSunnyDays * weights.sunnyDays +
                    normalizedCommuteTime * weights.commuteTime
            ),
        };
    });
};

const getNormalizedField = (cities: City[], field: CityFields) => {
    const fieldValues = cities.map((city) => city[field]);
    const minimum = Math.min(...fieldValues);
    const maximum = Math.max(...fieldValues);
    const range = maximum - minimum;

    return { minimum, maximum, range };
};

const normalizeField = (
    field: number,
    normalizedFieldResult: NormalizedFieldResult
) => {
    return roundToTwoDecimals(
        (field - normalizedFieldResult.minimum) / normalizedFieldResult.range
    );
};

export const roundToTwoDecimals = (value: number) => {
    return Math.round(value * 100) / 100;
};
