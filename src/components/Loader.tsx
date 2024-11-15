import Image from "next/image";
import React from "react";

function Loader() {
  return (
    <div className="h-full flex flex-col gap-y-4 item-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="Loading..." fill src="/logo.jpg" />
      </div>
      <p className="text-muted-foreground text-sm text-center">
        Genius is thinking...
      </p>
    </div>
  );
}

export default Loader;
