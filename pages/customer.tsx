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
    const uId = 2;

    const onCheckout = async (bId: any, copies: number, copiesOut: number) => {
        if (copies > copiesOut)
        {
            let date = new Date();
            fetch('/api/create_checkout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({uId, bId, date})
            }).then(async response => {
                if (response.status === 200) {
                    await response.json();
                    message.success('Checked Out Book: ' + bId);
                    updateCopies(bId, copiesOut + 1);
                } else message.error(
                    `Failed to Checkout Book:\n ${bId}`);
            }).catch(res=>{message.error(res)})
        }
        else
        {
            message.error("There is no copy available for checkout");
        }
    }

    const updateCopies = async (bId: any, copies: number) =>
    {
        let copiesOut = copies.toString();
        fetch('/api/update_book_copies', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bId, copiesOut})
        }).then(async response => {
            if (response.status === 200) {
                await response.json();
                //message.success('Updated Book Copies: ' + bId);
            } else message.error(
                `Failed to Update Book Copies:\n ${bId}`);
        }).catch(res=>{message.error(res)})
    };

    const onReturn = async (id: any, bId: any) => {
        fetch('/api/delete_checkout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        }).then(async response => {
            if (response.status === 200) {
                await response.json();
                message.success('Deleted Checkout: ' + id);
                let book = books.find(b => b.bId == bId);
                if (book != undefined && book.copiesOut != null)
                {
                    updateCopies(bId, Number(book.copiesOut) - 1);
                }
            } else message.error(
                `Failed to Delete Checkout:\n ${id}`);
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
            render: (record) => (
                <Space size="middle">
                    <a onClick={()=>onCheckout(record.bId, Number(record.copies), Number(record.copiesOut))}>Checkout</a>
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
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={()=>onReturn(record.id, record.bId)}>Return</a>
                </Space>
            ),
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

        <Table columns={colBooks} dataSource={books} />;
        <Table columns={colCheckouts} dataSource={checkouts.filter(c=> c.uId === uId )} />;
    </>;


}
