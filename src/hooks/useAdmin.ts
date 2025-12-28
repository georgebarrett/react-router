import { useUser } from "@clerk/clerk-react";

export default function useAdmin() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) return null;
    if (!isSignedIn || !user) return false;

    return user.organizationMemberships?.some((item) => item.role === 'org:admin') ?? false;
}
