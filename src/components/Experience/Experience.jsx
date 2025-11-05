/* eslint-disable no-unused-vars */
import {
  ConfigProvider,
  Form,
  Input,
  message,
  Pagination,
  Select,
  Space,
  Table,
  DatePicker,
  Modal,
} from "antd";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { SearchOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  useCreateExperienceMutation,
  useDeleteExperienceMutation,
  useGetExperienceQuery,
} from "../../redux/features/experienceApi/experienceApi";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const Experience = () => {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch } = useGetExperienceQuery();
  const [createExperience, { isLoading }] = useCreateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const experiences = data?.data?.data || [];

  // 🔥 Delete experience
  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteExperience(_id);
        Swal.fire("Deleted!", "Experience deleted successfully", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  // 🧾 Table columns
  const columns = [
    {
      title: "#",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Organization",
      dataIndex: "orgName",
      key: "orgName",
    },
    {
      title: "Duration",
      key: "duration",
      render: (_, record) => {
        const start = dayjs(record.startDate).format("MMM YYYY");
        const end = record.tilnow === "true"
          ? "Present"
          : dayjs(record.endDate).format("MMM YYYY");
        return `${start} - ${end}`;
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Responsibilities",
      key: "responsiblities",
      render: (_, record) => (
        <ul className="list-disc ml-4">
          {record.responsiblities?.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button onClick={() => handleDelete(record._id)}>
          <FaTrash className="text-xl text-red-500" />
        </button>
      ),
    },
  ];

  // ✅ Form submission
  const onFinish = async (values) => {
    try {
      const [startDate, endDate] = values.dateRange || [];
      const payload = {
        title: values.title,
        orgName: values.orgName,
        location: values.location,
        responsiblities: values.responsiblities,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        tilnow: values.tilnow || "false",
      };

      const res = await createExperience(payload).unwrap();
      message.success(res?.message || "Experience added successfully!");
      setAddModal(false);
      form.resetFields();
      refetch();
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message || "Failed to add experience");
    }
  };

  return (
    <div>
      {/* 🔍 Search & Add Button */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search experience"
            allowClear
            size="large"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setAddModal(true)}
          className="px-8 py-3 rounded-xl bg-primary text-white font-semibold flex items-center gap-2"
        >
          <FaPlus /> Add Experience
        </button>
      </div>

      {/* 📋 Experience Table */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#f97316",
              colorText: "black",
              colorTextHeading: "white",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={experiences}
          pagination={false}
          rowKey="_id"
        />
      </ConfigProvider>

      {/* 📄 Pagination */}
      <div className="mt-10 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data?.data?.meta?.total}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>

      {/* ➕ Add Modal */}
      <Modal
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
        title="Add Experience"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 550 }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="e.g. Frontend Developer" />
          </Form.Item>

          <Form.Item
            name="orgName"
            label="Organization Name"
            rules={[{ required: true, message: "Please enter organization name" }]}
          >
            <Input placeholder="e.g. TechWave Solutions" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Input placeholder="e.g. Dhaka, Bangladesh" />
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="Start and End Date"
            rules={[{ required: true, message: "Please select duration" }]}
          >
            <RangePicker className="w-full" />
          </Form.Item>

          <Form.Item name="tilnow" label="Currently Working">
            <Select placeholder="Select option">
              <Select.Option value="true">Yes</Select.Option>
              <Select.Option value="false">No</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="responsiblities"
            label="Responsibilities"
            rules={[
              { required: true, message: "Please add at least one responsibility" },
            ]}
          >
            <Select
              mode="tags"
              placeholder="Type and press Enter to add responsibilities"
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-primary text-white font-semibold flex justify-center items-center gap-2"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Experience;
