import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, message } from 'antd';

interface Product {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

const initialData: Product[] = [
	{ id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
	{ id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
	{ id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
	{ id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
	{ id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

export default function QuanLySanPham() {
	const [products, setProducts] = useState<Product[]>(initialData);
	const [keyword, setKeyword] = useState('');
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();

	const handleAdd = (values: any) => {
		const newProduct: Product = {
			id: Date.now(),
			...values,
		};
		setProducts([...products, newProduct]);
		message.success('Thêm sản phẩm thành công');
		setOpen(false);
		form.resetFields();
	};

	const handleDelete = (id: number) => {
		setProducts(products.filter(p => p.id !== id));
		message.success('Xóa sản phẩm thành công');
	};

	const filteredData = products.filter(p =>
		p.name.toLowerCase().includes(keyword.toLowerCase())
	);

	const columns = [
		{
			title: 'STT',
			render: (_: any, __: any, index: number) => index + 1,
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'name',
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			render: (v: number) => v.toLocaleString() + ' đ',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
		},
		{
			title: 'Thao tác',
			render: (_: any, record: Product) => (
				<Popconfirm
					title="Bạn có chắc muốn xóa?"
					onConfirm={() => handleDelete(record.id)}
				>
					<Button danger>Xóa</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<div>
			<Input.Search
				placeholder="Tìm theo tên sản phẩm"
				style={{ width: 300, marginBottom: 16 }}
				onChange={e => setKeyword(e.target.value)}
			/>

			<Button
				type="primary"
				style={{ marginLeft: 16, marginBottom: 16 }}
				onClick={() => setOpen(true)}
			>
				Thêm sản phẩm
			</Button>

			<Table rowKey="id" columns={columns} dataSource={filteredData} />

			<Modal
				title="Thêm sản phẩm"
				visible={open}
				onCancel={() => setOpen(false)}
				onOk={() => form.submit()}
			>
				<Form form={form} layout="vertical" onFinish={handleAdd}>
					<Form.Item
						label="Tên sản phẩm"
						name="name"
						rules={[{ required: true, message: 'Bắt buộc nhập tên sản phẩm' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Giá"
						name="price"
						rules={[{ required: true, type: 'number', min: 1 }]}
					>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>

					<Form.Item
						label="Số lượng"
						name="quantity"
						rules={[{ required: true, type: 'number', min: 1 }]}
					>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

