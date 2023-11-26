import { Inter } from 'next/font/google'
import {useState} from "react";
import {Button, Form, Input, message, Modal, Select, Space, Table, Tag} from "antd";
import {useCookies} from "react-cookie"


const inter = Inter({ subsets: ['latin'] })

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 12 },
};

const Login=()=>{
    const [cookies, setCookie] = useCookies(['user']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();



    const onFinish = async (values: any) => {
        console.log(values);
        setIsModalOpen(false);
        fetch('/api/get_user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }).then(async response => {
          if (response.status === 200) {
            const user = await response.json();
            message.success('Logged in as ' + user.name);
            setCookie('user', user)
          } else message.error(
              `Failed to get user:\n ${JSON.stringify(await response.json())}`);
        }).catch(res=>{message.error(res)})
      };

    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };
    
    const onReset = () => {
        form.resetFields();
    };
    
    
    const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    };

    return <>
        <Button type="primary" onClick={showModal}>
      Login
    </Button>
    <Modal title="Login to Account" onCancel={handleCancel}
           open={isModalOpen} footer={null}  width={800}>
      <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600, color: 'blue' }
          
        }
      >
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout} >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button  htmlType="button" onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    </>
}

export default Login;