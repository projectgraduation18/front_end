// import { Loader2Icon } from "lucide-react";
// import { cn } from "@/lib/utils";
// function Spinner({ className, ...props }) {
//     return (<Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props}/>);
// }
// export { Spinner };



// components/ui/spinner.jsx

import { Loader2Icon } from "lucide-react";

function Spinner({ className = "", ...props }) {

  return (

     <div className="flex justify-center items-center min-h-screen">
        <Loader2Icon
            role="status"
            aria-label="Loading"
            className={` animate-spin ${className}`}
            {...props}
            />
     </div>

  );
}

export { Spinner };