import countries from '@/data/Countries.json';

export const getAllCountries = (): Country[] => {
    return countries;
};

export const getCountryByName = (name: string): Country | undefined => {
    return countries.find(country => country.name.toLowerCase() === name.toLowerCase());
};