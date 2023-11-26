import { Inter } from 'next/font/google'
import {Button} from "antd";
import { useCookies } from 'react-cookie';

const inter = Inter({ subsets: ['latin'] })

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 12 },
};



export default function Logout() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const logout = () => {
        removeCookie("user");
    };


    return <>
    <Button type="primary" onClick={logout}>
      Logout
    </Button>
    </>
}