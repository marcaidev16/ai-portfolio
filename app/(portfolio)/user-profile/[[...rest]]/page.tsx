import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
    return (
        <div className="flex items-center justify-center min-h-screen py-12 px-4 bg-background">
            <UserProfile path="/user-profile" />
        </div>
    );
}
