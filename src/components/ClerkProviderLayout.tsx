import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";


export default function ClerkProviderLayout() {
  const navigate = useNavigate();

  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    throw new Error('missing clerk key');
  }

  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider 
        publishableKey={clerkKey}
        routerPush={(to: string) => navigate(to)}
        routerReplace={(to: string) => navigate(to, { replace: true })}
      >
        <Outlet />
    </ClerkProvider>
  )
}
