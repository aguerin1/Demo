import { Inter } from 'next/font/google'
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Button, Form, Input, message, Modal, Select, Space, Table, Tag} from "antd";
import {User} from ".prisma/client";
import {Book} from ".prisma/client";
import {Checkout} from ".prisma/client";
import { useNavigate } from 'react-router-dom';
import styles from './mystyle.module.css'; 

const inter = Inter({ subsets: ['latin'] })

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 12 },
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [checkouts, setCheckouts] = useState<Checkout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
  const [form] = Form.useForm();
  const [formTwo] = Form.useForm();

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
        message.success('Retrieved user ' + user.name);
      } else message.error(
          `Failed to get user:\n ${JSON.stringify(await response.json())}`);
    }).catch(res=>{message.error(res)})
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
        message.success('Created user ' + user.name);
      } else message.error(
          `Failed to get user:\n ${JSON.stringify(await response.json())}`);
    }).catch(res=>{message.error(res)})
  };

  const onDelete = async (user: any) => {
    const {id} = user;
    setIsModalOpen(false);
    fetch('/api/delete_user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    }).then(async response => {
      if (response.status === 200) {
        await response.json();
        message.success('Deleted user ' + user.name);
        setUsers(users.filter(u=> u.uId !== id ));

      } else message.error(
          `Failed to delete user:\n ${user.name}`);
    }).catch(res=>{message.error(res)})
  };

  const colUsers: ColumnsType<User> = [
    {
      title: <span className={styles.blue}>ID</span>,
      dataIndex: 'uId',
      key: 'uId',
      render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
    {
      title: <span className={styles.blue}>Email</span>,
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
    {
      title: <span className={styles.blue}>Password</span>,
      dataIndex: 'password',
      key: 'password',
      render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
    {
      title: <span className={styles.blue}>Name</span>,
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
  ];

  const colBooks: ColumnsType<Book> = [
    {
      title: <span className={styles.blue}>ID</span>,
      dataIndex: 'bId',
      key: 'bId',
      render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
    {
      title: <span className={styles.blue}>ISBN</span>,
      dataIndex: 'isbn',
      key: 'isbn',
      render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
    {
      title: <span className={styles.blue}>Title</span>,
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
    {
      title: <span className={styles.blue}>Author</span>,
      dataIndex: 'author',
      key: 'author',
      render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
    {
      title: <span className={styles.blue}>Copies</span>,
      dataIndex: 'copies',
      key: 'copies',
      render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
    {
      title: <span className={styles.blue}>Copies In Use</span>,
      dataIndex: 'copiesOut',
      key: 'copiesOut',
      render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
  ];

  const colCheckouts: ColumnsType<Checkout> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'User ID',
      dataIndex: 'uId',
      key: 'uId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Checkout Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <a>{text}</a>,
    },
  ];


  const onReset = () => {
    form.resetFields();
  };

  const onResetTwo = () => {
    formTwo.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const showModalTwo = () => {
    setIsModalTwoOpen(true);
    formTwo.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancelTwo = () => {
    setIsModalTwoOpen(false);
    formTwo.resetFields();
  };

  useEffect(()=>{
    fetch('api/all_user', {method: "GET"})
        .then(res => {
          res.json().then(
              (json=> {setUsers(json)})
          )
        })
  }, []);

  useEffect(()=>{
    fetch('api/all_books', {method: "GET"})
        .then(res => {
          res.json().then(
              (json=> {setBooks(json)})
          )
        })
  }, []);

  useEffect(()=>{
    fetch('api/all_checkouts', {method: "GET"})
        .then(res => {
          res.json().then(
              (json=> {setCheckouts(json)})
          )
        })
  }, []);

  if (!users) return "Give me a second";
  if (!books) return "Give me a second";
  if (!checkouts) return "Give me a second";

  return  <>
  <div  className={styles.bigblue}>
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

    <Button type="primary" onClick={showModalTwo}>
      Create Account
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

    {/*<p>{JSON.stringify(books)}</p>*/}
    <Table columns={colBooks} dataSource={books} />;
    {/*<p>{JSON.stringify(users)}</p>*/}
    <Table columns={colUsers} dataSource={users} />;    
  </div>

  </>;

}
