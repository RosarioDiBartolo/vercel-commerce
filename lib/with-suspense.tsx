import LoadingDots from "components/loading-dots";
import { FC, Suspense } from "react";

// WithSuspense is a higher-order component that adds suspense and a loading indicator
function WithSuspense<T extends object>(Cp: FC<T>) {
  
  const WrappedComponent = (props: T) => (
    <Suspense fallback={<LoadingDots className="loading-dots" />}>
      <Cp {...props} />
    </Suspense>
  );
  
  // Set a display name for better debugging
  WrappedComponent.displayName = `WithSuspense(${Cp.displayName || Cp.name || "Component"})`;

  return WrappedComponent;
}

export default WithSuspense;
