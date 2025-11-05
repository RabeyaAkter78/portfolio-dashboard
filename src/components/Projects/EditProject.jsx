import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Upload,
} from "antd";
import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from "../../redux/features/projects/projectsApi";
import { FaImage } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  console.log(id);
  const [form] = Form.useForm();
  const [isTeamProject, setIsTeamProject] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const { data: getSingleData } = useGetSingleProjectQuery(id);
  console.log(getSingleData?.data);

  const handleBeforeUpload = (file) => {
    form.setFieldsValue({ class_banner: [file] });
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };
useEffect(() => {
  if (getSingleData?.data) {
    const project = getSingleData.data;

    // Set team project state
    setIsTeamProject(project.teamProject);

    // Set preview image if it exists
    if (project.coverImage) {
      setPreviewImage(project.coverImage);
    }

    form.setFieldsValue({
      name: project.name,
      description: project.description,
      technologies: project.technologies,
      liveUrl: project.liveUrl,
      clientUrl: project.clientUrl,
      serverUrl: project.serverUrl,
      category: project.category,
      features: project.features,
      startDate: project.startDate ? moment(project.startDate) : null, 
      endDate: project.endDate ? moment(project.endDate) : null,
      teamProject: project.teamProject ? "yes" : "no",
      teamMembers: project.teamMembers,
      projectImage: project.coverImage ? [project.coverImage] : [],
    });
  }
}, [getSingleData, form]);


  const onFinish = async (values) => {
    console.log("Success", values);

    const formData = new FormData();

    // Convert DatePicker values to string
    const data = {
      name: values.name,
      description: values.description,
      technologies: values.technologies,
      liveUrl: values.liveUrl,
      clientUrl: values.clientUrl,
      serverUrl: values.serverUrl,
      category: values.category,
      features: values.features,
      startDate: values.startDate?.format("YYYY-MM-DD"),
      endDate: values.endDate?.format("YYYY-MM-DD"),
      teamProject: values.teamProject,
      teamMembers: values.teamMembers,
    };

    console.log(data);

    try {
      formData.append("data", JSON.stringify(data));
      if (profileImage) {
        formData.append("file", profileImage);
      }
      const res = await updateProject({ _id:id, data:formData }).unwrap();
      message.success(res?.message);
      form.resetFields();
      setPreviewImage(false);
      navigate("/projects");
    } catch (error) {
      message.error(error?.message || "Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-primary font-bold text-3xl underline">
        Edit Project
      </h1>
      <div className="flex justify-center items-center">
        <Form
          name="addProject"
          layout="vertical"
          onFinish={onFinish}
          form={form}
          style={{ width: 800 }}
        >
          {/* Project Image */}
          <Form.Item
            name="projectImage"
            label={<span className="font-medium">Project Image</span>}
          >
            <div className="border border-dashed border-gray-300 p-5 flex justify-center items-center h-40 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              <Upload
                showUploadList={false}
                maxCount={1}
                beforeUpload={handleBeforeUpload}
                onChange={({ file }) => setProfileImage(file)}
              >
                {!previewImage ? (
                  <div className="flex flex-col items-center text-gray-500">
                    <FaImage className="text-4xl mb-2" />
                    <p>Upload Image</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-24 object-contain rounded"
                    />
                    <p className="text-gray-600 mt-2">{profileImage?.name}</p>
                  </div>
                )}
              </Upload>
            </div>
          </Form.Item>

          {/* Project Title */}
          <Form.Item
            name="name"
            label={<span className="font-medium">Project Title</span>}
            rules={[
              { required: true, message: "Please enter a project title" },
            ]}
          >
            <Input placeholder="Enter project title" />
          </Form.Item>
          <Form.Item
            name="liveUrl"
            label={<span className="font-medium">liveUrl</span>}
            rules={[{ required: true, message: "Please enter liveUrl" }]}
          >
            <Input placeholder="Enter project liveUrl" />
          </Form.Item>
          <Form.Item
            name="liveUrl"
            label={<span className="font-medium">liveUrl</span>}
            rules={[{ required: true, message: "Please enter liveUrl" }]}
          >
            <Input placeholder="Enter project liveUrl" />
          </Form.Item>
          <Form.Item
            name="clientUrl"
            label={<span className="font-medium">clientUrl</span>}
          >
            <Input placeholder="Enter project clientUrl" />
          </Form.Item>
          <Form.Item
            name="serverUrl"
            label={<span className="font-medium">serverUrl</span>}
          >
            <Input placeholder="Enter project serverUrl" />
          </Form.Item>

          {/* Technologies */}
          <Form.Item
            name="technologies"
            label={<span className="font-medium">Technologies</span>}
          >
            <Select
              mode="tags"
              placeholder="Type and press Enter to add technology"
            />
          </Form.Item>

          {/* Features */}
          <Form.Item
            name="features"
            label={<span className="font-medium">Features</span>}
          >
            <Select
              mode="tags"
              placeholder="Type and press Enter to add feature"
            />
          </Form.Item>

          {/* Category */}
          <Form.Item
            name="category"
            label={<span className="font-medium">Category</span>}
          >
            <Input placeholder="Enter project category" />
          </Form.Item>

          {/* Team Project */}
          <Form.Item
            name="teamProject"
            label={<span className="font-medium">Team Project</span>}
          >
            <Select
              placeholder="Select option"
              onChange={(value) => setIsTeamProject(value === "yes")}
            >
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>

          {/* Team Members */}
          {isTeamProject && (
            <Form.Item
              name="teamMembers"
              label={<span className="font-medium">Team Members</span>}
            >
              <Select
                mode="tags"
                placeholder="Type and press Enter to add team member info"
              />
            </Form.Item>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="startDate"
              label={<span className="font-medium">Start Date</span>}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="endDate"
              label={<span className="font-medium">End Date</span>}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          {/* Description */}
          <Form.Item
            name="description"
            label={<span className="font-medium">Description</span>}
          >
            <TextArea rows={3} placeholder="Enter project description" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProject;
