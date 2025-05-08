import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Button, Badge, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../styles/OrientationVideo.css';
import axios from './axiosInstance'
const { Title, Paragraph } = Typography;

export default function OrientationVideo ()  {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  let user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchVideo();
  }, []);

  //Recuperer la video pour la serie
  const fetchVideo = () => {
    setLoading(true);
    axios.get("videos/"+ user?.serie + "/series/").then(
      (res) => {
        setVideoData(res.data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        message.error(err.response?.data?.message || "Une erreur s'est produite.");
        setLoading(false);
        setVideoData([]);
      }
    );
  };

  const handleMoreClick = () => {
    navigate('/carrieres');
  };

  return (
    <div className="video-page-container">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={22} sm={20} md={16} lg={12}>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Card className="fade-in-card" bordered={false} style={{ backgroundColor: '#ffffff' }}>
              <Badge.Ribbon text="🎯 Vidéo personnalisée pour toi" color="#43A047">
                <div className="video-content">
                  <div className="video-wrapper">
                    <iframe
                      width="100%"
                      height="315"
                      src={videoData.video_url}
                      title="Vidéo d’orientation"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <Button
                    type="primary"
                    style={{ marginTop: '1rem', backgroundColor: '#FB8C00', borderColor: '#FB8C00' }}
                    onClick={handleMoreClick}
                  >
                    En savoir plus
                  </Button>
                </div>
              </Badge.Ribbon>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};


