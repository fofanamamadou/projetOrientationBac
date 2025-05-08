import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Button, Tag, Spin, message } from 'antd';
import {
  ToolOutlined,
  HeartOutlined,
  LaptopOutlined,
  ExperimentOutlined,
  UserOutlined,
  BookOutlined,
  AppstoreAddOutlined,
  CameraOutlined,
  FlagOutlined,
  MusicOutlined,
  GlobalOutlined,
  FundOutlined,
  GroupOutlined,
  TrophyOutlined,
  CoffeeOutlined,
  AppstoreOutlined,
  HomeOutlined,
  ShopOutlined,
  FileTextOutlined,
  SearchOutlined,
  BarChartOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';
import '../styles/Careers.css';
import axios from './axiosInstance';

const { Title, Paragraph } = Typography;

// Fonction pour mapper les noms d’icônes vers des composants AntD
const iconMap = {
  ToolOutlined: <ToolOutlined style={{ fontSize: '24px', color: '#1E88E5' }} />,
  HeartOutlined: <HeartOutlined style={{ fontSize: '24px', color: '#E53935' }} />,
  LaptopOutlined: <LaptopOutlined style={{ fontSize: '24px', color: '#FB8C00' }} />,
  ExperimentOutlined: <ExperimentOutlined style={{ fontSize: '24px', color: '#8E24AA' }} />,
  UserOutlined: <UserOutlined style={{ fontSize: '24px', color: '#3949AB' }} />,
  BookOutlined: <BookOutlined style={{ fontSize: '24px', color: '#6D4C41' }} />,
  AppstoreAddOutlined: <AppstoreAddOutlined style={{ fontSize: '24px', color: '#00897B' }} />,
  CameraOutlined: <CameraOutlined style={{ fontSize: '24px', color: '#5E35B1' }} />,
  FlagOutlined: <FlagOutlined style={{ fontSize: '24px', color: '#C62828' }} />,
  GlobalOutlined: <GlobalOutlined style={{ fontSize: '24px', color: '#43A047' }} />,
  FundOutlined: <FundOutlined style={{ fontSize: '24px', color: '#1E88E5' }} />,
  GroupOutlined: <GroupOutlined style={{ fontSize: '24px', color: '#6A1B9A' }} />,
  TrophyOutlined: <TrophyOutlined style={{ fontSize: '24px', color: '#FFD600' }} />,
  CoffeeOutlined: <CoffeeOutlined style={{ fontSize: '24px', color: '#8D6E63' }} />,
  AppstoreOutlined: <AppstoreOutlined style={{ fontSize: '24px', color: '#3949AB' }} />,
  HomeOutlined: <HomeOutlined style={{ fontSize: '24px', color: '#5D4037' }} />,
  ShopOutlined: <ShopOutlined style={{ fontSize: '24px', color: '#F4511E' }} />,
  FileTextOutlined: <FileTextOutlined style={{ fontSize: '24px', color: '#039BE5' }} />,
  SearchOutlined: <SearchOutlined style={{ fontSize: '24px', color: '#00897B' }} />,
  BarChartOutlined: <BarChartOutlined style={{ fontSize: '24px', color: '#FB8C00' }} />,
  AreaChartOutlined: <AreaChartOutlined style={{ fontSize: '24px', color: '#43A047' }} />,
};

export default function Careers  ()  {
  const [careers, setCareers] = useState([]);
  const [userSerie, setUserSerie] = useState([]);
  const [loading, setLoading] = useState(true);
  let user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchSerie();
    fetchCareers();

  }, []);

  const handleMore = (career) => {
    message.info(`Plus d'infos sur ${career.title} à venir...`);
    // Redirection vers autre page ou PDF
  };

  //Recuperer une serie via son id
  const fetchSerie = () => {
    setLoading(true);
    axios.get("series/"+ user?.serie + "/").then(
      (res) => {
        setUserSerie(res.data);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setUserSerie([]);
      }
    );
  };

  //Recuperer la video pour la serie
  const fetchCareers = () => {
    setLoading(true);
    axios.get("carrieres/"+ user?.serie + "/series/").then(
      (res) => {
        setCareers(res.data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        message.error(err.response?.data?.message || "Une erreur s'est produite.");
        setLoading(false);
        setCareers([]);
      }
    );
  };

  return (
    <div className="careers-container">
      <Title level={3} style={{ color: '#212121', textAlign: 'center', marginBottom: '0.5rem' }}>
        🎯 Voici des pistes qui pourraient t’intéresser
      </Title>
      <Paragraph style={{ textAlign: 'center', color: '#616161', marginBottom: '2rem' }}>
        Suggestions basées sur ta série : <strong>{userSerie?.name}</strong>
      </Paragraph>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {careers.map((career) => (
            <Col xs={24} sm={12} md={8} lg={6} key={career.id}>
              <Card
                hoverable
                className="career-card"
                title={
                  <div className="card-title">
                    {iconMap[career.icon]} <span>{career.title}</span>
                    {career.badge && (
                      <Tag color={career.badge === 'Populaire' ? 'orange' : 'green'} style={{ marginLeft: 'auto' }}>
                        {career.badge}
                      </Tag>
                    )}
                  </div>
                }
                bordered={false}
              >
                <Paragraph style={{ minHeight: '60px', color: '#616161' }}>{career.description}</Paragraph>
                <Button
                  type="link"
                  onClick={() => handleMore(career)}
                  style={{ padding: 0, color: '#1E88E5' }}
                >
                  Voir plus de détails
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};


