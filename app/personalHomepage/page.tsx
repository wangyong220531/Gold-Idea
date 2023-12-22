import Header from "../../components/header";
import PersonalInfoCard from "../../components/personalInfoCard";
import PersonalInfoSecondSection from "../../components/personalInfoSecondSection";
import UserProvider from "../../components/userProvider";

export default async function PersonalHomepage() {
    return <UserProvider>
        <Header isHomePage={false} />
        <div className="flex flex-col items-center mt-[140px] gap-y-4">
            <PersonalInfoCard />
            <PersonalInfoSecondSection/>
        </div>
    </UserProvider>
}