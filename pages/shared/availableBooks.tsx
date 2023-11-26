import { Inter } from 'next/font/google'
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Book} from ".prisma/client";
import {Table} from "antd";
import styles from '../mystyle.module.css'; 

const inter = Inter({ subsets: ['latin'] })

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 12 },
};

export default function Guest() {
  const [books, setBooks] = useState<Book[]>([]);
  const availableBooks = books.filter( (books) => books.copies > books.copiesOut);

  const colBooks: ColumnsType<Book> = [
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
        title: <span className={styles.blue}>ISBN</span>,
        dataIndex: 'isbn',
        key: 'isbn',
        render: (text) => <a className={styles.textBlue}>{text}</a>,
    },
    {
        title: 'ID',
        dataIndex: 'bId',
        key: 'bId',
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

  return  <>
    <Table columns={colBooks} dataSource={availableBooks} />;
  </>
}