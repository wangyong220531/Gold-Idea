import { createContext, useContext } from "react"
import { User } from "../../components/detailFirstSection"

export interface UserContextProps {
    userInfo: User
}

const UserContext = createContext<UserContextProps | null>(null)

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}

export default UserContext
