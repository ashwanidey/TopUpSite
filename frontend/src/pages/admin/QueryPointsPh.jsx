import React, { useContext } from "react";
import { useQueryPoints } from "../../hooks/admin/useQueryPoints";
import Spinner from "../../components/Spinner";
import { VariableContext } from '../../context/VariableContext';

const PointsQueryPh = () => {
  const { isLoading, queryPointsPh, points, message } = useQueryPoints();
  const { token } = useContext(VariableContext);

  const handleSubmit = async () => {
    await queryPointsPh(token);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full flex flex-col items-center gap-4">
      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br text-white font-semibold rounded-lg px-6 py-3 transition-transform transform hover:scale-105"
      >
        Query Points PH
      </button>

      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {points && <p className="text-white text-lg">Smile Points: {points}</p>}
      {message && <p className="text-white text-lg">{message}</p>}
    </div>
  );
};

export default PointsQueryPh;
