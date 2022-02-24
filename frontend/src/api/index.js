import axios from "axios";

const API = axios.create({
  baseURL: "https://virtual-trainer-blazepose.herokuapp.com",
});
//funkcja wywoływana przy każdym requescie
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    //musimy przesłać token do backendu aby middleware moglo zweryfikować użytkownika
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchExercises = () => API.get("/exercises");

export const createExercise = (newExercise) =>
  API.post("/exercises", newExercise);

export const updateExercise = (id, updatedExercise) =>
  API.patch(`/exercises/${id}`, updatedExercise);

export const deleteExercise = (id) => API.delete(`/exercises/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
