import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, notification, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from '../pages/axiosInstance'

const { Option } = Select;

export default function VideoManager()  {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchVideos();
    fetchSerie();
  }, []);

  //Liste des video
  const fetchVideos = () => {
    setLoading(true);
    axios.get("videos/").then(
      (res) => {
        setVideos(res.data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        message.error(err.response?.data?.message || "Une erreur s'est produite.");
        setLoading(false);
        setVideos([]);
      }
    );
  };

  //Pour validation de url

  // Valider si l'URL est une vidéo YouTube
  const isValidYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/|v\/|e\/|.*\/v\/)([A-Za-z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

// Obtenir l'URL d'intégration YouTube
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1].split("&")[0];  // Extraire l'ID de la vidéo
    return `https://www.youtube.com/embed/${videoId}`;  // Format embed YouTube
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

  const showModal = (video = null) => {
    setEditingVideo(video);
    setIsModalVisible(true);
    if (video) {
      form.setFieldsValue(video);
    } else {
      form.resetFields();
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/videos/${id}/`);
      notification.success({ message: '🗑️ Vidéo supprimée avec succès.' });
      fetchVideos();
    } catch (error) {
      console.error(error);
      const messageText = error.response?.data?.message || "Impossible de supprimer cette vidéo.";
      notification.error({ message: 'Erreur', description: messageText });
    } finally {
      setLoading(false);
    }
  };
  

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
       // Gérer l'URL YouTube
      if (values.video_url) {
        if (isValidYouTubeUrl(values.video_url)) {
          values.video_url = getYouTubeEmbedUrl(values.video_url);  // Transformer en URL d'intégration YouTube
        }
      }
  
      if (editingVideo) {
        await axios.put(`videos/${editingVideo.id}/`, values);
        notification.success({ message: '🎥 Vidéo mise à jour avec succès.' });
      } else {
        await axios.post('videos/', values);
        notification.success({ message: '✅ Vidéo ajoutée avec succès.' });
      }
  
      setIsModalVisible(false);
      fetchVideos();
    } catch (error) {
      console.error(error);
      const messageText = error.response?.data?.message || "Une erreur s’est produite lors de l'enregistrement.";
      notification.error({ message: '❌ Échec', description: messageText });
    } finally {
      setLoading(false);
    }
  };
  

  const columns = [
    {
      title: 'Série',
      key: 'serie_details',
      render: (record) => record.serie_details?.name || 'Non défini',
    },    
    { title: 'Lien', dataIndex: 'video_url', key: 'video_url' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Ajouter une vidéo
      </Button>
      <Table
        dataSource={videos}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={editingVideo ? 'Modifier la vidéo' : 'Ajouter une vidéo'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
        <Form.Item
          name="serie"
          label="Série"
          rules={[{ required: true, message: 'Veuillez sélectionner la série.' }]}
        >
          <Select>
            {seriesOptions.map((serie) => (
              <Option key={serie.id} value={serie.id}>
                {serie.name} 
              </Option>
            ))}
          </Select>
        </Form.Item>

          <Form.Item
            name="video_url"
            label="Lien de la vidéo"
            rules={[{ required: true, message: 'Veuillez entrer le lien.' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};


