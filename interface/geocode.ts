export default interface IgeoCode {
    latitude: string,
    longitude: string,
    place_name: string
}

export default interface Iwheater { 
    currentWheather: { 
        weather_descriptions: string[];
    }
}