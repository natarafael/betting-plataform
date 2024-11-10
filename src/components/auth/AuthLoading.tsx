import { LoadingSpinner } from "../shared/LoadingSpinner";

export const AuthLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};
