import { Col } from "antd";

const Dashboard = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Col>
          <div className="flex flex-col  border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <p className=" text-xl font-bold">25+</p>
            <p className="text-base md:text-lg  ">Total Projects</p>
          </div>
        </Col>

        <Col>
          <div className="flex flex-col  border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <p className=" text-xl font-bold">20+</p>
            <p className="text-base md:text-lg ">Total Skills</p>
          </div>
        </Col>
        <Col>
          <div className="flex flex-col  border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <p className=" text-xl font-bold">20+</p>
            <p className="text-base md:text-lg ">Total Blogs</p>
          </div>
        </Col>
        <Col>
          <div className="flex flex-col  border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <p className=" text-xl font-bold">20+</p>
            <p className="text-base md:text-lg ">Total Experience</p>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default Dashboard;
