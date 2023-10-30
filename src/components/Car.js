import React, { useReducer } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const initialAmount = {
  speed: 0,
  started: false,
};

const countReduce = (state, action) => {
  switch (action.type) {
    case "START":
      return { ...state, started: true };
    case "STOP":
      if (state.speed === 0) {
        return initialAmount;
      }
      return state;
    case "ACCELERATE":
      if (state.started) {
        return { ...state, speed: state.speed + 5 };
      }
      return state;
    case "BRAKE":
      return { ...state, speed: Math.max(0, state.speed - 5) };
    default:
      return state;
  }
};

function Car() {
  const [state, dispatch] = useReducer(countReduce, initialAmount);

  const switchCar = () => {
    state.started ? dispatch({ type: "STOP" }) : dispatch({ type: "START" });
  };

  const accelerate = () => {
    dispatch({ type: "ACCELERATE" });
  };

  const brake = () => {
    dispatch({ type: "BRAKE" });
  };

  return (
    <div className='car card p-5'>
      <ReactSpeedometer value={state.speed} />
      <button className="btn btn-success m-2" onClick={accelerate}>Accelerate</button>
      <button className="btn btn-danger m-2" onClick={brake}>Brake</button>
      <button className="btn btn-warning m-2" onClick={switchCar}>Switch ON/OFF</button>
    </div>
  );
}

export default Car;
