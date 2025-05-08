import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Typography, message, Spin, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentForm.css';
import axios from './axiosInstance';

const { Title } = Typography;
const { Option } = Select;


export default function StudentForm ()  {
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSerie();
  }, []);
  

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Form submitted:', values);
      localStorage.setItem("userInfo", JSON.stringify(values));
      setLoading(false);
      navigate('/orientation-video');
    }, 1500); // simulation d'une requête
  };

  //Liste des series
  const fetchSerie = () => {
    setLoading(true);
    axios.get("series/").then(
      (res) => {
        setSeriesOptions(res.data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        message.error(err.response?.data?.message || "Une erreur s'est produite.");
        setLoading(false);
        setSeriesOptions([]);
      }
    );
  };


  return (
    <div className="form-container">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={22} sm={18} md={12} lg={10}>
          <div className="form-box">
            <Title level={3} style={{ color: '#212121', textAlign: 'center' }}>
              🎓 Renseigne tes informations
            </Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Série du bac"
                name="serie"
                rules={[{ required: true, message: 'Merci de sélectionner ta série.' }]}
              >
                <Select placeholder="Choisis ta série">
                  {seriesOptions.map((serie) => (
                    <Option key={serie.id} value={serie.id}>
                      {serie.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ backgroundColor: '#FB8C00', borderColor: '#FB8C00' }}
                  disabled={loading}
                >
                  {loading ? <Spin size="small" /> : 'Valider'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

