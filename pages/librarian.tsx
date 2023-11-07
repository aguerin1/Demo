import { Inter } from 'next/font/google'
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Button, Form, Input, message, Modal, Select, Space, Table, Tag} from "antd";
import {User} from ".prisma/client";
import {Book} from ".prisma/client";
import {Checkout} from ".prisma/client";
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
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log(values);
        setIsModalOpen(false);
        fetch('/api/create_book', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(async response => {
            if (response.status === 200) {
                const book = await response.json();
                message.success('Created book: ' + book.title);
            } else message.error(
                `Failed to create book:\n ${JSON.stringify(await response.json())}`);
        }).catch(res=>{message.error(res)})
    };

    const onDelete = async (book: any) => {
        console.log(book);
        const {isbn} = book;
        fetch('/api/delete_book', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isbn})
        }).then(async response => {
            if (response.status === 200) {
                await response.json();
                message.success('Deleted book: ' + book.title);
                //setUsers(users.filter(u=> u.uId !== id ));

            } else message.error(
                `Failed to delete book:\n ${book.title}`);
        }).catch(res=>{message.error(res)})
    };

    const colBooks: ColumnsType<Book> = [
        {
            title: 'ID',
            dataIndex: 'bId',
            key: 'bId',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Copies',
            dataIndex: 'copies',
            key: 'copies',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Copies In Use',
            dataIndex: 'copiesOut',
            key: 'copiesOut',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={()=>onDelete(record)}>Delete</a>
                </Space>
            ),
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
            title: 'Book ID',
            dataIndex: 'bId',
            key: 'bId',
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

    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

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

    if (!books) return "Give me a second";
    if (!checkouts) return "Give me a second";

    return  <>
        <Button type="primary" onClick={showModal}>
            Add Book
        </Button>
        <Modal title="Add Book" onCancel={handleCancel}
               open={isModalOpen} footer={null}  width={800}>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item name="isbn" label="ISBN" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="copies" label="Copies" rules={[{ required: true }]}>
                    <Input type="number"/>
                </Form.Item>
                <Form.Item name="copiesOut" label="Copies Checked Out" rules={[{ required: true }]}>
                    <Input type="number"/>
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

        <Table columns={colBooks} dataSource={books} />;
        <Table columns={colCheckouts} dataSource={checkouts} />;
    </>;
}
