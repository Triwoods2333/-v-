"use client";
import { Npm } from "@/types/npm";
import React, { useState } from "react";
import { Space, Tag, Card, Button, Modal, Form, Input, Checkbox, message, Select } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import PieChart from "../pie/index";  // 确保导入路径正确
import "swiper/css";

interface Props {
  npms: Npm[];
  onAddNpm: (newNpm: Npm) => void;
}

const vulnerabilitiesOptions = [
  "资源耗尽",
  "系统漏洞",
  "伪装欺骗",
  "僵尸网络",
  "广告骚扰",
  "破坏系统",
  "勒索行为",
  "隐蔽传输",
  "信息窃取"
];

export default function NpmdemoList({ npms, onAddNpm }: Props) {
  const [npmList, setNpmList] = useState<Npm[]>(npms);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddNpm = (values: any) => {
    const newNpm: Npm = {
      packageName: values.packageName,
      isDangerous: values.isDangerous,
      vulnerabilities: values.isDangerous ? values.vulnerabilities : [],
      description: values.description,
    };
    onAddNpm(newNpm);
    setNpmList([...npmList, newNpm]);
    message.success('更新成功');
    form.resetFields();
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  // 计算危险和安全包的数量
  const dangerousCount = npmList.filter(npm => npm.isDangerous).length;
  const safeCount = npmList.length - dangerousCount;

  // 将数据转换为饼图所需的格式
  const pieData = [
    { type: "Dangerous", value: dangerousCount },
    { type: "Safe", value: safeCount }
  ];

  return (
    <Space direction="vertical" size={16} className="w-full">
      <Card>
        <Button type="primary" onClick={showModal} className="absolute right-[2vw] w-[6vw] top-[1vw]">更新</Button>
        <Modal
          title="更新包"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddNpm}
          >
            <Form.Item
              label="包名"
              name="packageName"
              rules={[{ required: true, message: '请输入包名' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="isDangerous"
              valuePropName="checked"
              initialValue={false}
            >
              <Checkbox>是否危险</Checkbox>
            </Form.Item>
            <Form.Item
              label="漏洞类型"
              name="vulnerabilities"
              rules={[{ required: true, message: '请选择漏洞类型' }]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="请选择漏洞类型"
              >
                {vulnerabilitiesOptions.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="描述"
              name="description"
              rules={[{ required: true, message: '请输入描述' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <div className="w-[100%] flex justify-center">
                <Button type="primary" htmlType="submit" className="bg-[hsl(var(--primary))]">
                  更新
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        <div className="pb-3 border-b">
          <table className="w-full text-left">
            <colgroup>
              <col width={"25%"} />
              <col width={"25%"} />
              <col width={"25%"} />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th className="text-center">Package Name</th>
                <th className="text-center">Is Dangerous</th>
                <th className="text-center">Vulnerabilities</th>
                <th className="text-center">Description</th>
              </tr>
            </thead>
          </table>
        </div>

        <Swiper
          direction="vertical"
          loop
          centeredSlides
          allowTouchMove={false}
          spaceBetween={0}
          slidesPerView={4}
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            pauseOnMouseEnter: true,
          }}
          onSlideChange={() => console.log("slide change")}
          style={{ height: "240px" }}
        >
          {npmList.map((item) => (
            <SwiperSlide key={item.packageName}>
              <ol className="grid grid-cols-4 size-full overflow-hidden">
                <li>{item.packageName}</li>
                <li>
                  <Tag color={item.isDangerous ? "volcano" : "green"}>
                    {item.isDangerous ? "Dangerous" : "Safe"}
                  </Tag>
                </li>
                <li className="w-[] overflow-scroll">
                  {item.vulnerabilities.map((vulnerability) => (
                    <Tag color="red" key={vulnerability}>
                      {vulnerability}
                    </Tag>
                  ))}
                </li>
                <li>{item.description}</li>
              </ol>
            </SwiperSlide>
          ))}
        </Swiper>
      </Card>
      <PieChart data={pieData} />
    </Space>
  );
}
