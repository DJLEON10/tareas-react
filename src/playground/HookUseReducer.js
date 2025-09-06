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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <button
        onClick={() => dispatch({ type: 'incremented_age' })}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Incrementar tus años
      </button>
      <p className="mt-4 text-lg text-gray-700">
        Hola tienes <span className="font-semibold">{state.age}</span>.
      </p>
    </div>
  );
}
