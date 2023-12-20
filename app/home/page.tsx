import Content from "../../components/content";
import Header from "../../components/header";
import UserProvider from "../../components/userProvider";

export default async function Home() {
    return <UserProvider>
        <Header isHomePage={true} />
        <Content />
    </UserProvider>
}