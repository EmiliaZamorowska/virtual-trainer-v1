import * as api from "../api/index.js";

//Action Creators to funkcje ktore zwracaja funkcje (akcje)
//async(dispatch) => aby móc zwracac asynchronicznie
export const getExercises = () => async (dispatch) => {
  try {
    const { data } = await api.fetchExercises();
    return dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createExercise = (exercise) => async (dispatch) => {
  try {
    const { data } = await api.createExercise(exercise);
    return dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateExercise = (id, exercise) => async (dispatch) => {
  try {
    const { data } = await api.updateExercise(id, exercise);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteExercise = (id) => async (dispatch) => {
  try {
    await api.deleteExercise(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
