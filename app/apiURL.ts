const apiURL:string = process.env.NODE_ENV === "development" ? "http://localhost:8000/api/v1" : "https://mi-precio.onrender.com/api/v1";
export default apiURL;
