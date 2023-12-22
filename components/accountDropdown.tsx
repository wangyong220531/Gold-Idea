import Image, { StaticImageData } from "next/image"
import PersonalHomepageIcon from "../assets/personalHomepageIcon.png"
import ConcernedsIcon from "../assets/concernedsIcon.png"
import CollectionsIcon from "../assets/collectionsIcon.png"
import LogoutIcon from "../assets/logoutIcon.png"
import { useRouter } from "next/navigation"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

interface AccountDropdownListItem {
    id: string
    content: string
    icon: StaticImageData
}

const accountDropdownListItems: AccountDropdownListItem[] = [
    {
        id: "000",
        content: "我的主页",
        icon: PersonalHomepageIcon
    },
    {
        id: "001",
        content: "我的关注",
        icon: ConcernedsIcon
    },
    {
        id: "002",
        content: "我的收藏",
        icon: CollectionsIcon
    },
    {
        id: "003",
        content: "退出",
        icon: LogoutIcon
    }
]

export function AccountDropdown() {

    const router = useRouter()

    function itemClick(item: AccountDropdownListItem) {
        NProgress.start()
        NProgress.configure({
            minimum: 0.1,
            showSpinner: false,
            easing: 'ease',
            speed: 500,
        })
        if(item.id === "000") {
            router.push("/personalHomepage")
            return
        }
        if (item.id === "003") {
            router.push("/")
            return
        }
    }

    return (
        <div className="fixed top-20 right-11 flex flex-col items-center">
            <div className="w-0 h-0 border-b-[14px] border-l-[20px] border-r-[20px] border-x-transparent border-y-white shadow-md"></div>
            <div className=" bg-white shadow-md flex flex-col gap-y-3 p-6">
                {
                    accountDropdownListItems.map((item: AccountDropdownListItem) => {
                        return (
                            <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => itemClick(item)}>
                                <Image src={item.icon} alt={"列表项图标"} width={20} height={20} />
                                <div key={item.id} className="text-xl text-gray-500">{item.content}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}