import Cookies from "universal-cookie";

export const token= () => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken")
    return token
}