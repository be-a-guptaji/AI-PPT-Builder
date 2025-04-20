import { Loader2 } from "lucide-react";
import React from "react";

const AuthLoading = () => {
  return (
    <div className="grid h-screen w-screen place-content-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default AuthLoading;
