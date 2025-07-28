import { ClipLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[120px]">
      <ClipLoader color="#36d7b7" size={48} />
    </div>
  );
}
