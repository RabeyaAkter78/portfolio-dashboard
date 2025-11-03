/* eslint-disable no-unused-vars */
import {
  ConfigProvider,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import { useState } from "react";
import { Modal } from "antd";
import { FaImage, FaPlus } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa6";
import { useGetAllSkillsQuery } from "../../redux/features/skills/skillApi";
import { BASE_URL } from "../../redux/utils/baseUrl";
const Skills = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserClient, setSelectedUserClient] = useState(null);
  const [email, setEmail] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [addClientModal, setAddClientModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState("");
  const { data } = useGetAllSkillsQuery({
    page: currentPage,
    limit: pageSize,
    title,
  });
  console.log(data?.data?.data);
  const skillData = data?.data?.data;

  const handleBeforeUpload = (file) => {
    form.setFieldsValue({ class_banner: [file] });
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
    return false; // Prevent auto upload
  };

  const handleAddClient = () => {
    setAddClientModal(true);
  };

  const handleAddClientCancel = () => {
    setAddClientModal(false);
  };

  const handleAddClientOk = () => {
    setAddClientModal(false);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const showModal = (record) => {
    setSelectedUserClient(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUserClient(null);
  };

  const handleSearch = () => {
    // refetc();
  };

  const columns = [
    {
      title: "#",
      dataIndex: "slno",
      key: "slno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Title",
      key: "title",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            className="shadow-md rounded-full h-10 w-10"
            src={`${record?.skillImage}`}
          />
          <span>{record.title}</span>
        </div>
      ),
    },
    {
      title: "Years Of Experience",
      dataIndex: "yearsOfExp",
      key: "yearsOfExp",
    },

    {
      title: "Expeties Level",
      key: "level",
      render: (_, record) => {
        const level = record.level || "N/A";
        return <p>{level}</p>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverBorderColor: "rgb(47,84,235)",
                defaultHoverColor: "rgb(47,84,235)",
                defaultBorderColor: "rgb(47,84,235)",
              },
            },
          }}
        >
          <div className="flex justify-center items-center gap-2">
            {/* <Space size="middle">
              <button onClick={() => showModal(record)}>
                <FiArrowUpRight className="text-2xl text-orange-500" />
              </button>
            </Space> */}
            <Space size="middle">
              <button onClick={() => handleNotes(record)}>
                <FaTrash className="text-xl text-red-500" />
              </button>
            </Space>
          </div>
        </ConfigProvider>
      ),
    },
  ];

  const handleblock = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleNotes = (record) => {
    // console.log(record._id);
    setSelectedUserClient(record._id);
    navigate(`notes/${record._id}`, {
      state: { selectedUserClient: record._id },
    });
  };

  const onFinish = async (values) => {
    console.log("Success", values);
    const formData = new FormData();
    const data = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      location: values.location,
      rates: values.rates,
    };

    // try {
    //   formData.append("client", JSON.stringify(data));
    //   formData.append("skillIcon", profileImage);

    //   const res = await createClient(formData).unwrap();
    //   message.success(res?.message);
    // } catch (error) {
    //   message.error(error?.message);
    //   console.log(error);
    // }
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <div className="mt-4 md:mt-0 flex justify-between items-center gap-2">
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    borderRadius: 0,
                    hoverBorderColor: "none",
                    activeBorderColor: "none",
                  },
                },
              }}
            >
              <div className="flex gap-2 items-center relative">
                <Input
                  placeholder="Search "
                  allowClear
                  size="large"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onPressEnter={handleSearch}
                  prefix={
                    <SearchOutlined
                      style={{ cursor: "pointer" }}
                      onClick={handleSearch}
                    />
                  }
                />

                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primaryColor text-white p-2 rounded-r-lg"
                >
                  search
                </button>
              </div>
            </ConfigProvider>
          </div>
        </div>
        <button
          onClick={handleAddClient}
          className="px-10 py-3    rounded-xl bg-primary text-white font-semiboldbold shadow-lg flex justify-center items-center gap-2"
        >
          <FaPlus></FaPlus>
          Add Skills
        </button>
      </div>
      <div className=" overflow-x-auto">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#f97316",
                colorText: "rgb(0,0,0)",
                colorTextHeading: "rgb(255,255,255)",
                headerSortActiveBg: "#f97316",
                headerFilterHoverBg: "#f97316",
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={skillData || []}
            pagination={false}
            rowKey="id"
          />
        </ConfigProvider>
      </div>

      <div className="mt-10 flex justify-center items-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={50}
          //   total={clientdata?.data?.pagination?.total}
          onChange={handlePageChange}
        ></Pagination>
      </div>

      <Modal
        open={addClientModal}
        onCancel={handleAddClientCancel}
        footer={null}
        title="Add Skill"
      >
        <div>
          <Form
            name="addSkills"
            initialValues={{ remember: true }}
            style={{ maxWidth: 550 }}
            onFinish={onFinish}
            layout="vertical"
            form={form}
          >
            <Form.Item name="skillIcon">
              <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  beforeUpload={handleBeforeUpload}
                  setFileList={setProfileImage}
                >
                  {!previewImage ? (
                    <>
                      <FaImage className="text-secondary h-10 w-10" />
                      <p className="text-secondary">Upload Image</p>
                    </>
                  ) : (
                    <>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-24 object-contain"
                      />
                      <p className="text-secondary">{profileImage?.name}</p>
                    </>
                  )}
                </Upload>
              </div>
            </Form.Item>
            <Form.Item name="title" label={<p>Title</p>}>
              <Input placeholder="Title"></Input>
            </Form.Item>

            <Form.Item name="experties-level" label={<p>Experties Level</p>}>
              <Select>
                <Select.Option value="Bigener">Bigener</Select.Option>
                <Select.Option value="Intermidiate">Intermidiate</Select.Option>
                <Select.Option value="Advance">Advance</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="description" label={<p>Description</p>}>
              <Input.TextArea
                rows={3}
                placeholder="description"
              ></Input.TextArea>
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="w-full py-2    rounded-xl bg-primary text-white font-semiboldbold shadow-lg flex justify-center items-center gap-2"
              >
                Submit
              </button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Skills;
