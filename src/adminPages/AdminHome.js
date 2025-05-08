import React, { useState } from 'react';
import { Layout, Menu, Typography, Row, Col, Card, Button, Space } from 'antd';
import {
  VideoCameraOutlined,
  AppstoreOutlined,
  MessageOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import VideoManager from './Video';
import CareerManager from './Careers';
// import FeedbackManager from './Feedback';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function AdminLayout () {
  const [selectedKey, setSelectedKey] = useState('home');

  const navItems = [
    {
      key: 'videos',
      title: 'Gérer les vidéos',
      icon: <VideoCameraOutlined style={{ fontSize: 24 }} />,
      color: '#1E88E5',
    },
    {
      key: 'careers',
      title: 'Gérer les choix de carriere',
      icon: <AppstoreOutlined style={{ fontSize: 24 }} />,
      color: '#43A047',
    },
    // {
    //   key: 'feedbacks',
    //   title: 'Voir les feedbacks',
    //   icon: <MessageOutlined style={{ fontSize: 24 }} />,
    //   color: '#FB8C00',
    // },
  ];

  const renderHome = () => (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        <HomeOutlined /> Espace d'administration
      </Title>
      <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 32 }}>
        Gérer les contenus de la plateforme d'orientation.
      </Text>

      <Row gutter={[24, 24]} justify="center">
        {navItems.map((item) => (
          <Col key={item.key} xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{ textAlign: 'center', borderTop: `4px solid ${item.color}` }}
              onClick={() => setSelectedKey(item.key)}
            >
              <Space direction="vertical" size="middle" align="center">
                {item.icon}
                <Text strong>{item.title}</Text>
                <Button type="primary" style={{ backgroundColor: item.color }}>
                  Accéder
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const renderContent = () => {
    switch (selectedKey) {
      case 'videos':
        return <VideoManager />;
      case 'careers':
        return <CareerManager />;
      // case 'feedbacks':
      //   return <FeedbackManager />;
      case 'home':
      default:
        return renderHome();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Accueil
          </Menu.Item>
          <Menu.Item key="videos" icon={<VideoCameraOutlined />}>
            Vidéos
          </Menu.Item>
          <Menu.Item key="careers" icon={<AppstoreOutlined />}>
            Carrieres
          </Menu.Item>
          {/* <Menu.Item key="feedbacks" icon={<MessageOutlined />}>
            Feedbacks
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};


