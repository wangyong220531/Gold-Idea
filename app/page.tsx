import Header from "../components/header";
import Content from "../components/content";
import { Suspense } from "react";
import UserProvider from "../components/userProvider";

// import { API_BASE_URL } from "../constant/publicURL";

// async function getQuestions() {
//     const res = await fetch(`${API_BASE_URL}/findAllQuestion`, { cache: 'no-store' })
//     if (!res.ok) return
//     return res.json()
// }

export default async function Home() {

    // const questions = await getQuestions()

    return (
        <UserProvider>
            <Header isHomePage={true} />
            <Suspense>
                <Content />
            </Suspense>
        </UserProvider>
    )
}
