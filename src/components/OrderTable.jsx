import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';

const OrderTable = () => {
  const tableRef = useRef();

  const orders = [
    { id: 1, name: 'Rizky', service: 'Cuci Kering', date: '2025-05-29', status: 'Selesai' },
    { id: 2, name: 'Andi', service: 'Cuci Setrika', date: '2025-05-28', status: 'Diproses' },
    // Tambahkan lebih banyak data jika ingin
  ];

  useEffect(() => {
    // Inisialisasi DataTables
    $(tableRef.current).DataTable();

    // Optional: destroy on unmount
    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  return (
    <div className="overflow-x-auto bg-white rounded shadow p-4">
      <table ref={tableRef} className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Layanan</th>
            <th>Tanggal</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.service}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
