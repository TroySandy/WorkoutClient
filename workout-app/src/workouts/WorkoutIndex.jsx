import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import WorkoutCreate from "./WorkoutCreate.jsx";
import WorkoutTable from "./WorkoutTable.jsx";
import WorkoutEdit from "./WorkoutEdit.jsx";

const WorkoutIndex = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [workoutToUpdate, setWorkoutToUpdate] = useState({});
  // console.log(props);

  const editUpdateWorkout = (workout) => {
    setWorkoutToUpdate(workout);
    // console.log(workout);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  const fetchWorkouts = () => {
    // console.log('fetchworkouts');

    fetch(`http://localhost:4000/log/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        setWorkouts(logData);
      });
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <Container>
      <Row>
        <Col md="3">
          <WorkoutCreate
            workouts={workouts}
            token={props.token}
            fetchWorkouts={fetchWorkouts}
            owner_id={props.owner_id}
          />
        </Col>
        <Col md="9">
          <WorkoutTable
            workouts={workouts}
            owner_id={props.owner_id}
            token={props.token}
            fetchWorkouts={fetchWorkouts}
            editUpdateWorkout={editUpdateWorkout}
            updateOn={updateOn}
          />
        </Col>
        {updateActive ? (
          <WorkoutEdit
            workoutToUpdate={workoutToUpdate}
            updateOff={updateOff}
            token={props.token}
            fetchWorkouts={fetchWorkouts}
          />
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default WorkoutIndex;
