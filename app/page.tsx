import Login from "../components/login";
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
            <div className="bg-cover bg-center h-screen w-screen loginBG">
                <Login />
            </div>
        </UserProvider>
    )
}
