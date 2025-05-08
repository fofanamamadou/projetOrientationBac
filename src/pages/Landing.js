import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

const { Title, Paragraph } = Typography;

export default function Landing () {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/formulaire');
  };

  return (
    <div className="landing-container">
      <div className="overlay" />
      <Row justify="center" align="middle" className="content">
        <Col xs={22} sm={16} md={12} lg={10} className="fade-in">
          <div className="text-center">
            <Title level={2} style={{ color: '#212121' }}>
              🎓 Bienvenue sur la plateforme d’orientation post-bac
            </Title>
            <Paragraph style={{ color: '#616161', fontSize: '16px' }}>
              Nous t’aidons à trouver ta voie après le bac.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              onClick={handleStart}
              style={{ backgroundColor: '#FB8C00', borderColor: '#FB8C00' }}
            >
              Commencer
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
