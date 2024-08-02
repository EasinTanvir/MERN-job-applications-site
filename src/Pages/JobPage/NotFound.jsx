import { FaSearch } from "react-icons/fa";

export const NoJobFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-70px)]  p-6">
      <FaSearch className="text-gray-400 text-6xl mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        No Job Found
      </h1>
      <p className="text-gray-600 text-center">
        Sorry, we couldn't find any jobs matching your search criteria. Please
        try different keywords.
      </p>
    </div>
  );
};
