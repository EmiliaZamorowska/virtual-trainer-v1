import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExercise, updateExercise } from "../actions/exercises";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Stack from "@material-ui/core/Stack";

function FormExercise({ currentId, setCurrentId, date }) {
  const [exerciseData, setExerciseData] = useState({
    title: "",
    weight: "",
    sets: "",
    reps: "",
    notes: "",
    tags: [],
  });
  const dispatch = useDispatch();
  const exercise = useSelector((state) =>
    currentId ? state.exercises.find((x) => x._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const [time, setTime] = useState({ hours: "", minutes: "" });

  useEffect(() => {
    if (exercise) {
      setExerciseData(exercise);
      setTime({
        hours: parseInt(exercise.createdAt.substring(11, 13)),
        minutes: parseInt(exercise.createdAt.substring(14, 16)),
      });
    }
  }, [exercise]);

  const clear = () => {
    setCurrentId(null);
    setExerciseData({
      title: "",
      weight: "",
      sets: "",
      reps: "",
      notes: "",
      tags: [],
    });
    setTime({ hours: "", minutes: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newDate = new Date(date);

    if (time.hours !== 23) {
      newDate.setUTCHours(time.hours);
      if (date.getDate() !== newDate.getDate())
        newDate.setUTCDate(newDate.getDate() + 1);
    } else newDate.setHours(time.hours + 1);
    newDate.setUTCMinutes(time.minutes);

    if (currentId === null) {
      dispatch(
        createExercise({
          ...exerciseData,
          name: user?.result?.name,
          createdAt: newDate.toISOString(),
        })
      );
      clear();
    } else {
      dispatch(
        updateExercise(currentId, {
          ...exerciseData,
          name: user?.result?.name,
          createdAt: newDate.toISOString(),
        })
      );
      clear();
    }
  };
  const validateHours = (x) => {
    if (isNaN(parseInt(x)) || parseInt(x) > 23 || parseInt(x) < 0) return "";
    else return parseInt(x);
  };
  const validateMinutes = (x) => {
    if (isNaN(parseInt(x)) || parseInt(x) > 59 || parseInt(x) < 0) return "";
    else return parseInt(x);
  };
  return (
    <form id="formExercise" onSubmit={handleSubmit}>
      <p className="title">
        {!currentId ? "Tworzenie" : "Edytowanie"} ćwiczenia
      </p>
      <TextField
        size="small"
        variant="outlined"
        label="Ćwiczenie"
        value={exerciseData.title}
        required
        onChange={(e) =>
          setExerciseData({ ...exerciseData, title: e.target.value })
        }
        InputLabelProps={{
          style: { color: "#ccc", fontSize: "0.9em" },
        }}
        InputProps={{
          style: {
            color: "#ccc",
            fontSize: "0.9em",
            backgroundColor: "#333",
          },
        }}
        style={{ marginBottom: "15px", width: "100%" }}
      />
      <Stack
        direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
        spacing={2}
      >
        <TextField
          size="small"
          type="number"
          variant="outlined"
          label="Ciężar"
          value={exerciseData.weight}
          required
          onChange={(e) =>
            setExerciseData({
              ...exerciseData,
              weight:
                parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value),
            })
          }
          InputLabelProps={{
            style: { color: "#ccc", fontSize: "0.9em" },
          }}
          InputProps={{
            style: {
              color: "#ccc",
              fontSize: "0.9em",
              backgroundColor: "#333",
            },
          }}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          size="small"
          type="number"
          variant="outlined"
          label="Serie"
          required
          value={exerciseData.sets}
          onChange={(e) =>
            setExerciseData({
              ...exerciseData,
              sets: parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value),
            })
          }
          InputLabelProps={{
            style: { color: "#ccc", fontSize: "0.9em" },
          }}
          InputProps={{
            style: {
              color: "#ccc",
              fontSize: "0.9em",
              backgroundColor: "#333",
            },
          }}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          size="small"
          variant="outlined"
          label="Powtórzenia"
          value={exerciseData.reps}
          required
          onChange={(e) =>
            setExerciseData({ ...exerciseData, reps: e.target.value })
          }
          InputLabelProps={{
            style: { color: "#ccc", fontSize: "0.9em" },
          }}
          InputProps={{
            style: {
              color: "#ccc",
              fontSize: "0.9em",
              backgroundColor: "#333",
            },
          }}
          style={{ marginBottom: "15px" }}
        />
      </Stack>
      <TextField
        size="small"
        variant="outlined"
        label="Notatki"
        value={exerciseData.notes}
        onChange={(e) =>
          setExerciseData({ ...exerciseData, notes: e.target.value })
        }
        InputLabelProps={{
          style: { color: "#ccc", fontSize: "0.9em" },
        }}
        InputProps={{
          style: { color: "#ccc", fontSize: "0.9em", backgroundColor: "#333" },
        }}
        style={{ marginBottom: "15px", width: "100%" }}
      />
      <Stack direction="row" spacing={1}>
        <p>Godzina:</p>
        <TextField
          size="small"
          type="number"
          variant="outlined"
          label="GG"
          value={time.hours}
          onChange={(e) =>
            setTime({ ...time, hours: validateHours(e.target.value) })
          }
          InputLabelProps={{
            style: { color: "#ccc", fontSize: "0.9em" },
          }}
          InputProps={{
            style: {
              color: "#ccc",
              fontSize: "0.9em",
              backgroundColor: "#333",
            },
          }}
          style={{ marginBottom: "15px", width: "20%" }}
        />
        <TextField
          size="small"
          type="number"
          variant="outlined"
          label="MM"
          value={time.minutes}
          onChange={(e) =>
            setTime({ ...time, minutes: validateMinutes(e.target.value) })
          }
          InputLabelProps={{
            style: { color: "#ccc", fontSize: "0.9em" },
          }}
          InputProps={{
            style: {
              color: "#ccc",
              fontSize: "0.9em",
              backgroundColor: "#333",
            },
          }}
          style={{ marginBottom: "15px", width: "20%" }}
        />
      </Stack>
      <ReactTagInput
        tags={exerciseData.tags}
        placeholder="Wpisz tag i zatwierdź za pomocą przycisku ENTER"
        onChange={(newTags) => {
          setExerciseData({ ...exerciseData, tags: newTags });
        }}
      />
      <Stack direction="row" spacing={2}>
        <Button
          color="warning"
          variant="contained"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Zapisz
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={clear}
          style={{ marginTop: "20px", fontWeight: "bold" }}
        >
          Wyczyść
        </Button>
      </Stack>
    </form>
  );
}

export default FormExercise;
