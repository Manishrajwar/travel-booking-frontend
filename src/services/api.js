const baseurl = process.env.REACT_APP_BASE_URL

const baseEndpoints = {
      CITIES: 'api/cities' , 
      TRIPS:'api/trips' , 
      HOTELS:'api/hotels' , 

}

export const Endpoints = {
      GET_ALL_CITIES: `${baseurl}/${baseEndpoints.CITIES}/allCities` , 
      GET_ALL_TRIPS : `${baseurl}/${baseEndpoints.TRIPS}/getAllTrips` , 
      GET_TRIPS_BY_CITY: `${baseurl}/${baseEndpoints.TRIPS}/get-trip-by-city` , 
      GET_HOTEL_BY_CITY: `${baseurl}/${baseEndpoints.HOTELS}/get-hotels-by-city` , 
      GET_CITY_ATTRACTIONS: `${baseurl}/${baseEndpoints.CITIES}/get-city-attractions` , 
}