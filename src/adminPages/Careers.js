import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, notification, Tag, message} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from '../pages/axiosInstance'

const { Option } = Select;

export default function CareerManager()  {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [editingCareer, setEditingCareer] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCareers();
    fetchSerie();
  }, []);

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

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('carrieres/');
      setCareers(response.data);
    } catch (error) {
      notification.error({ message: 'Erreur lors du chargement des carrières.' });
    }
    setLoading(false);
  };
  

  const showModal = (career = null) => {
    setEditingCareer(career);
    setIsModalVisible(true);
    if (career) {
      form.setFieldsValue(career);
    } else {
      form.resetFields();
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`carrieres/${id}/`);
      notification.success({ message: 'Carrière supprimée avec succès.' });
      fetchCareers();
    } catch (error) {
      notification.error({ message: 'Erreur lors de la suppression.' });
    }
  };
  

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
  
      if (editingCareer) {
        await axios.put(`carrieres/${editingCareer.id}/`, values);
        notification.success({ message: 'Carrière mise à jour avec succès.' });
      } else {
        await axios.post('carrieres/', values);
        notification.success({ message: 'Carrière ajoutée avec succès.' });
      }
  
      setIsModalVisible(false);
      fetchCareers();
    } catch (error) {
      notification.error({ message: 'Erreur lors de l\'enregistrement.' });
    }
  };
  

  const columns = [
    { title: 'Titre', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Séries',
      key: 'series_details',
      render: (record) =>
        record.series_details && record.series_details.length > 0
          ? record.series_details.map((serie) => serie.name).join(', ')
          : 'Non défini',
    },    
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
          Ajouter une carrière
        </Button>
        <Table
          dataSource={careers}
          columns={columns}
          rowKey="id"
          loading={loading}
        />
        <Modal
          title={editingCareer ? 'Modifier la carrière' : 'Ajouter une carrière'}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Titre"
              rules={[{ required: true, message: 'Veuillez entrer le titre.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Veuillez entrer une description.' }]}
            >
              <Input.TextArea rows={4} maxLength={255} showCount />
            </Form.Item>

            <Form.Item
                name="series"
                label="Série"
                rules={[{ required: true, message: 'Veuillez sélectionner la série.' }]}
              >
                <Select
                  mode="multiple"
                  showSearch
                  optionFilterProp="children"
                  placeholder="Sélectionnez une ou plusieurs séries"
                >
                  {seriesOptions.map((serie) => (
                    <Option key={serie.id} value={serie.id}>
                      {serie.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>


            <Form.Item
              name="icon"
              label="Icône (optionnel)"
              
            >
              <Select>
                <Option value="ToolOutlined">Bâtiment / Ingénierie</Option>
                <Option value="HeartOutlined">Santé / Médecine</Option>
                <Option value="LaptopOutlined">Informatique / Développement</Option>
                <Option value="ExperimentOutlined">Sciences</Option>
                <Option value="UserOutlined">Humanités / Sociologie</Option>
                <Option value="BookOutlined">Littérature / Langues</Option>
                <Option value="AppstoreAddOutlined">Gestion / Économie</Option>
                <Option value="CameraOutlined">Arts / Photographie</Option>
                <Option value="FlagOutlined">Droit / Justice</Option>
                <Option value="GlobalOutlined">Géographie / Voyages</Option>
                <Option value="FundOutlined">Finance / Comptabilité</Option>
                <Option value="GroupOutlined">Psychologie / Travail social</Option>
                <Option value="TrophyOutlined">Sport / Entraînement</Option>
                <Option value="CoffeeOutlined">Gastronomie / Cuisine</Option>
                <Option value="AppstoreOutlined">Design / Création</Option>
                <Option value="HomeOutlined">Architecture / Urbanisme</Option>
                <Option value="ShopOutlined">Commerce / Vente</Option>
                <Option value="FileTextOutlined">Journalisme / Communication</Option>
                <Option value="SearchOutlined">Recherche / Analyse</Option>
                <Option value="BarChartOutlined">Marketing / Publicité</Option>
                <Option value="AreaChartOutlined">Statistiques / Analyse de données</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="badge"
              label="Badge (optionnel)"
            >

              <Select>
                <Option value="Populaire">Populaire</Option>
                <Option value="Nouveau">Nouveau</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
  

  