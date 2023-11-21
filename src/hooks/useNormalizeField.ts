import { City, CityFields, WEIGHTED_FIELDS } from '../models/cityFactory';

interface NormalizedFieldResult {
    minimum: number;
    maximum: number;
    range: number;
}

interface FieldValue {
    value: number;
    normalized: number;
}

export interface NormalizedCity2 {
    id: number;
    name: string;
    comfortIndex: FieldValue;
    sunnyDays: FieldValue;
    commuteTime: FieldValue;
    propertyTax: FieldValue;
    weightedScore: number;
}

export const useNormalizedCities = (
    cities: City[],
    weights: Record<CityFields, number>
): NormalizedCity2[] => {
    const normalizedResults: Record<string, NormalizedFieldResult> = {};
    WEIGHTED_FIELDS.forEach((field) => {
        normalizedResults[field.field] = getNormalizedField(
            cities,
            field.field
        );
    });

    return cities.map((city) => {
        // @ts-ignore
        const normalizedCity: NormalizedCity2 = {
            id: city.id,
            name: city.name,
        };

        let weightedScoreAggregator = 0;
        WEIGHTED_FIELDS.forEach((field) => {
            // @ts-ignore
            const normalizedField = normalizeField(
                city[field.field],
                normalizedResults[field.field],
                field.inverted
            );
            // @ts-ignore
            normalizedCity[field.field] = {
                value: city[field.field],
                normalized: normalizedField,
            };
            weightedScoreAggregator += normalizedField * weights[field.field];
        });

        normalizedCity.weightedScore = roundToTwoDecimals(
            weightedScoreAggregator
        );
        return normalizedCity;
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
    normalizedFieldResult: NormalizedFieldResult,
    inverse: boolean
) => {
    let result =
        (field - normalizedFieldResult.minimum) / normalizedFieldResult.range;

    if (inverse) {
        return roundToTwoDecimals(1 - result);
    }

    return roundToTwoDecimals(result);
};

export const roundToTwoDecimals = (value: number) => {
    return Math.round(value * 100) / 100;
};
