import { Inter } from 'next/font/google'
import {useState} from "react";
import {Button, Form, Input, message, Modal,Checkbox, Select, Space, Table, Tag} from "antd";
import {useCookies} from "react-cookie"
import styles from 'pages/mystyle.module.css'; 


const inter = Inter({ subsets: ['latin'] })

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 12 },
};



export default function CreateAccount() {
  const [cookies, setCookie] = useCookies(['user']);

    const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
    const [formTwo] = Form.useForm();

    const handleCancelTwo = () => {
        setIsModalTwoOpen(false);
        formTwo.resetFields();
    };

    const showModalTwo = () => {
        setIsModalTwoOpen(true);
        formTwo.resetFields();
    };

    const onResetTwo = () => {
        formTwo.resetFields();
    };
    
    const onFinishTwo = async (values: any) => {
      console.log(values);
      setIsModalTwoOpen(false);
      fetch('/api/create_user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(async response => {
        if (response.status === 200) {
          const user = await response.json();
          message.success('Created user ' + user.name)
          setCookie('user', user, {
            path: '/',
            httpOnly: true,
            secure: false // Set to true if using HTTPS
          });
        } else message.error(
            `Failed to create user:\n ${JSON.stringify(await response.json())}`);
      }).catch(res=>{message.error(res)})
    };

    return  <>
    <div className={styles.pad}>
      <Button className={styles.but2} onClick={showModalTwo}>
        Don't have an account? Click here to create an account!
      </Button>
      <Modal title="Create An Account" onCancel={handleCancelTwo}
            open={isModalTwoOpen} footer={null}  width={800}>
        <Form
            {...layout}
            form={formTwo}
            name="control-hooks"
            onFinish={onFinishTwo}
            style={{ maxWidth: 600 }}
        >
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="isLibrarian" label="Librarian Account" valuePropName="checked">
            <Checkbox defaultChecked={false}/>
          </Form.Item>

          <Form.Item {...tailLayout} >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onResetTwo}>
              Reset
            </Button>
            <Button  htmlType="button" onClick={handleCancelTwo}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </>
}