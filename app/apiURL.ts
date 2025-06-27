const apiURL:string = process.env.NODE_ENV === "development" ? "http://localhost:8000/api/v1" : "https://mi-aplicacion.com/api/v1";
export default apiURL;