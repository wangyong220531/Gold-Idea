import Header from "../../components/header";
import PersonalInfoCard from "../../components/personalInfoCard";
import UserProvider from "../../components/userProvider";

export default async function PersonalHomepage() {
    return <UserProvider>
        <Header isHomePage={false} />
        <div className="flex flex-col items-center mt-[140px]">
            <PersonalInfoCard />
        </div>
    </UserProvider>
}