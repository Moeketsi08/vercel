import axios from 'axios';
import { useEffect, useState } from 'react';
  
const Payments = () =>{
  const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/shopify/payments')
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const payments1 = [
    { id: 'PAY-001', date: '2023-09-25', consignee: 'Lisa Rodriguez', amount: 227.5, status: 'Pending' },
  ]; 

    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Consignee Payments</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Payment ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Consignee</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments1.map(p => (
              <tr key={p.id}>
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.date}</td>
                <td className="p-2">{p.consignee}</td>
                <td className="p-2">${p.amount}</td>
                <td className="p-2">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-xl font-bold mb-4">Store Payments</h2>
        {loading ? (
          <p>Loading store payments...</p>
        ) : payments.length === 0 ? (
          <p>No store payments available.</p>
        ) : (
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Payment ID</th>
        {/*       <th className="p-2">Date</th>
              <th className="p-2">Consignee</th> */}
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td className="p-2">{p.id}</td>
             {/*    <td className="p-2">{p.date}</td>
                <td className="p-2">{p.currency}</td> */}
                <td className="p-2">{p.amount}</td>
                <td className="p-2">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    );
  }
  
  export default Payments;