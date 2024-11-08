import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

const BackPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row space-x-4 mb-6 text-sm">
      <button
        onClick={() => router.back()}
        className="group flex flex-row items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition duration-300"
      >
        <FaArrowLeft
          size={16}
          className="group-hover:-translate-x-1 duration-300 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
        />
        <span className="pl-1 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 duration-300">
          Back
        </span>
      </button>
    </div>
  );
};

export default BackPage;
