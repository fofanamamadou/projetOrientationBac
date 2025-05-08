import React, { useState } from 'react';
import { Form, Input, Button, Rate, Typography, message, Row, Col } from 'antd';
import {
  MehOutlined,
  SmileOutlined,
  FrownOutlined,
  LikeOutlined,
  HeartOutlined,
  ShareAltOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import '../styles/Feedback.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const customIcons = {
  1: <FrownOutlined style={{ color: '#d32f2f' }} />,
  2: <MehOutlined style={{ color: '#ff9800' }} />,
  3: <SmileOutlined style={{ color: '#ffb300' }} />,
  4: <LikeOutlined style={{ color: '#43A047' }} />,
  5: <HeartOutlined style={{ color: '#1E88E5' }} />,
};

export default function Feedback ()  {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const payload = {
      rating: values.rating,
      comment: values.comment || '',
    };

    // Simuler une requête POST
    setTimeout(() => {
      console.log('Données envoyées à /api/feedback/', payload);
      message.success('Merci pour ton retour ! 💬');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="feedback-container">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={22} sm={20} md={16} lg={10}>
          <div className="feedback-box fade-in">
            <Title level={3} style={{ textAlign: 'center', color: '#212121' }}>
              As-tu trouvé cette plateforme utile ?
            </Title>
            <Paragraph style={{ textAlign: 'center', color: '#616161' }}>
              Ton avis compte pour nous aider d'autres élèves à bien s’orienter.
            </Paragraph>

            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="rating"
                label="Note ton expérience"
                rules={[{ required: true, message: 'Merci de laisser une note 😊' }]}
              >
                <Rate
                  character={({ index }) => customIcons[index + 1]}
                  style={{ fontSize: '32px' }}
                />
              </Form.Item>

              <Form.Item name="comment" label="Laisse un commentaire (facultatif)">
                <TextArea
                  placeholder="Vidéo très utile et bien expliquée !"
                  rows={4}
                  maxLength={300}
                  showCount
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ backgroundColor: '#FB8C00', borderColor: '#FB8C00', width: '100%' }}
                >
                  Soumettre
                </Button>
              </Form.Item>
            </Form>

            <div className="feedback-actions">
              <Button
                icon={<HomeOutlined />}
                type="default"
                onClick={() => window.location.href = '/'}
              >
                Retour à l’accueil
              </Button>

              <Button
                icon={<ShareAltOutlined />}
                type="dashed"
                style={{ marginLeft: '1rem', color: '#1E88E5', borderColor: '#1E88E5' }}
              >
                Partager la plateforme
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};


