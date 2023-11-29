import { Inter } from 'next/font/google'
import CreateAccount from './shared/createAccount';
import Login from './shared/login';
import AvailableBooks from './shared/availableBooks'
import styles from './mystyle.module.css'; 

const inter = Inter({ subsets: ['latin'] })

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 12 },
};

export default function Guest() {
  
  return  <>
  <div  className={styles.bigblue}>
    <Login />
    <CreateAccount />
    <h1>Available Books</h1>
    <AvailableBooks />
  </div>

  </>;


}