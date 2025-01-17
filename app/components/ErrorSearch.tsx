import { suggestionError } from "../data/data";

export default function Error() {
  return (
    <div className="grid place-content-center bg-white mt-20 px-4">
      <div className="text-center">
        <p className="text-2xl font-bold tracking-tight sm:text-4xl">
          No meals found.
        </p>
        <p className="mt-6 text-xl  text-gray-500">But you can try :</p>
        <ul className="grid mt-20 grid-cols-5 gap-5  text-gray-500">
          {suggestionError.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
