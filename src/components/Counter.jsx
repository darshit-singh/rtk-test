import { counterActions } from "../redux/slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  const reset = () => {
    setValue(0);
    dispatch(counterActions.reset());
  };
  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button
          onClick={() => {
            dispatch(counterActions.increment());
          }}
        >
          +
        </button>

        <button
          onClick={() => {
            dispatch(counterActions.decrement());
          }}
        >
          -
        </button>
      </div>
      <div>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <div>
          <button
            onClick={() => {
              dispatch(counterActions.addValue(Number(value)));
            }}
          >
            Add custom
          </button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
};
export default Counter;
