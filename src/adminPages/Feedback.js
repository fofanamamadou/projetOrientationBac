// import React, { useEffect, useState } from 'react';
// import { Table, Rate, notification } from 'antd';

// export default function FeedbackManager()  {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchFeedbacks();
//   }, []);

//   const fetchFeedbacks = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('/api/feedback/');
//       const data = await response.json();
//       setFeedbacks(data);
//     } catch (error) {
//       notification.error({ message: 'Erreur lors du chargement des feedbacks.' });
//     }
//     setLoading(false);
//   };

//   const columns = [
//     {
//       title: 'Note',
//       dataIndex: 'rating',
//       key: 'rating',
//       render: (rate) => <Rate disabled defaultValue={rate} />,
//       sorter: (a, b) => a.rating - b.rating,
//     },
//     {
//       title: 'Commentaire',
//       dataIndex: 'comment',
//       key: 'comment',
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//       render: (date) => new Date(date).toLocaleString(),
//       sorter: (a, b) => new Date(a.date) - new Date(b.date),
//     },
//   ];

//   return (
//     <>
//       <h2>Feedbacks des élèves</h2>
//       <Table
//         dataSource={feedbacks}
//         columns={columns}
//         rowKey="id"
//         loading={loading}
//       />
//     </>
//   );
// };

