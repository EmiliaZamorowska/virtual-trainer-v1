import React, { useEffect, useState } from "react";
import Exercises from "../components/Exercise/Exercises";
import FormExercise from "../components/FormExercise";
import { useDispatch } from "react-redux";
import { getExercises } from "../actions/exercises";
import Calendar from "react-calendar";
import Auth from "../components/Auth";
import "react-calendar/dist/Calendar.css";

function Workouts() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [date, changeDate] = useState(new Date());

  useEffect(() => {
    dispatch(getExercises());
  }, [currentId, date, dispatch]);

  if (!user?.result?.name) {
    return <Auth />;
  }
  return (
    <div className="loginSite">
      <div id="workoutsContainer">
        <div id="gridContainer">
          <div>
            <Calendar onChange={changeDate} value={date} />
            <FormExercise
              currentId={currentId}
              setCurrentId={setCurrentId}
              date={date}
            />
          </div>
          <div>
            <Exercises setCurrentId={setCurrentId} date={date} id="exercises" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
