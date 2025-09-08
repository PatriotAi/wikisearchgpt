import React from "react";

export default function Loader() {
  return (
    <div className="mt-6">
      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-pulse"></div>
      </div>
      <p className="mt-2 text-gray-500">Набираємо ваш запит...</p>
    </div>
  );
}
