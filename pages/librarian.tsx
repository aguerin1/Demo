import { Inter } from 'next/font/google'
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Button, Form, Input, message, Modal, Select, Space, Table, Tag} from "antd";
import {User} from ".prisma/client";
import {Book} from ".prisma/client";
import {Checkout} from ".prisma/client";
import AddBook from "./shared/addBook"
import Logout from './shared/logout';
const inter = Inter({ subsets: ['latin'] })

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 12 },
};

export default function Librarian() {
    const [books, setBooks] = useState<Book[]>([]);
    const [checkouts, setCheckouts] = useState<Checkout[]>([]);

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
        <AddBook />
        <Logout />

        <Table columns={colBooks} dataSource={books} />;
        <Table columns={colCheckouts} dataSource={checkouts} />;
    </>;
}
