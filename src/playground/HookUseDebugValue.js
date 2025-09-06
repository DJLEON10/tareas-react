import React, { useDebugValue, useState, useEffect } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}

function HookUseDebugValue() {
  const isOnline = useOnlineStatus();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Ejemplo de useDebugValue</h2>
        <p className="text-lg mb-6">
          Estado de conexión:{' '}
          <strong className={isOnline ? 'text-green-600' : 'text-red-600'}>
            {isOnline ? 'Online' : 'Offline'}
          </strong>
        </p>
        <a href="/" className="text-blue-500 hover:underline">
          Ir a home
        </a>
      </div>
    </div>
  );
}

export default HookUseDebugValue;
