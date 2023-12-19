import dayjs from "dayjs"

export default function advanceTime(timeString: string) {
    return dayjs(timeString).format("YYYY-MM-DD HH:mm:ss")
}
