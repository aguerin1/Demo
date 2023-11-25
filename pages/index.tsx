import { Inter } from 'next/font/google'
import Guest from "./guest";
import {useCookies} from 'react-cookie'
import Librarian from './librarian';
import Customer from './customer';

const inter = Inter({ subsets: ['latin'] })


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 12 },
};

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);


  if (cookies.user){
    if (cookies.user.isLibrarian) {
      return <>
        <Librarian />
      </>
    }

    return <>
      <Customer />
    </>
  }

  return <>
    <Guest />
  </>
  

}
