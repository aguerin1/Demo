import { Inter } from 'next/font/google'
import {useState} from "react";
import {Button, Form, Input, InputNumber, message, Modal, Select, Space, Table, Tag} from "antd";

const inter = Inter({ subsets: ['latin'] })

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 12 },
};

export default function AddBook() {

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
                    <InputNumber min={0}/>
                </Form.Item>
                <Form.Item name="copiesOut" label="Copies Checked Out" rules={[{ required: true }]}>
                    <InputNumber min={0} defaultValue={0}/>
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
    </>;
}