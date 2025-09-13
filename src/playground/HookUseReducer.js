import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 20 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => dispatch({ type: 'incremented_age' })}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition"
      >
        Incrementar edad
      </button>
      <p className="text-lg font-medium text-gray-800">
        ¡Hola! Tú tienes {state.age}.
      </p>
      <a href="/home">ir a home</a>
    </div>
  );
}