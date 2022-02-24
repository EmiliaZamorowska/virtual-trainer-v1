import React, { useState } from "react";
import Exercise from "./Exercise";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

function Exercises({ setCurrentId, date }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [filterTag, setFilter] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const exercises = useSelector((state) => state.exercises);

  function sortingFunction(a, b) {
    let hours =
      parseInt(a.createdAt.substring(11, 13)) -
      parseInt(b.createdAt.substring(11, 13));
    if (hours !== 0) return hours;
    else
      return (
        parseInt(a.createdAt.substring(14, 16)) -
        parseInt(b.createdAt.substring(14, 16))
      );
  }
  function dateConv() {
    let day, month;
    date.getDate() < 10 ? (day = "0" + date.getDate()) : (day = date.getDate());
    date.getMonth() + 1 < 10
      ? (month = "0" + (date.getMonth() + 1))
      : (month = date.getMonth() + 1);
    return date.getFullYear() + "-" + month + "-" + day;
  }
  return (
    <div>
      <div className="exercisesSearch">
        <p>Szukaj po nazwie ćwiczenia:</p>
        <input
          style={{ backgroundColor: "#333", color: "#ccc" }}
          type="text"
          value={filterSearch}
          onChange={(e) => setFilterSearch(e.target.value)}
        />
        <Button
          color="primary"
          variant="contained"
          size="small"
          type="button"
          onClick={() => setFilter("")}
          style={{ visibility: filterTag === "" ? "hidden" : "visible" }}
        >
          Pokaż wszystkie
        </Button>
      </div>
      <ul>
        {!exercises.length
          ? " "
          : exercises
              .filter(
                (exercise) =>
                  (exercise?.creator === user?.result?.googleId ||
                    exercise?.creator === user?.result?._id) &&
                  dateConv() === exercise?.createdAt.substring(0, 10) &&
                  (exercise?.tags.includes(filterTag) || filterTag === "") &&
                  exercise?.title
                    .toLowerCase()
                    .includes(filterSearch.toLowerCase())
              )

              .sort(sortingFunction)
              .map((exercise, index) => (
                <li key={index}>
                  <Exercise
                    setCurrentId={setCurrentId}
                    exercise={exercise}
                    setFilter={setFilter}
                  />
                </li>
              ))}
      </ul>
    </div>
  );
}

export default Exercises;
