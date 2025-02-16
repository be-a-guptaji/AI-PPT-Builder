import { Loader2 } from "lucide-react";
import React from "react";

const AuthLoading = () => {
  return (
    <div className="grid place-content-center h-screen w-screen">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default AuthLoading;
