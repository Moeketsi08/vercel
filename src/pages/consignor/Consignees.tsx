import axios from 'axios';
import { useEffect, useState } from 'react';

const Consignees = () => {
  const [consignees, setConsignees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/shopify/consignees')
      .then((res) => setConsignees(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

const consignees1 = [
    { id: 1, name: 'Lisa Rodriguez', email: 'lisa@example.com', totalSales: 350 },
    { id: 2, name: 'Alex Thompson', email: 'alex@example.com', totalSales: 125 },
  ];
  

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Consignees</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {consignees1.map((c) => (
          <div key={c.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{c.name}</h3>
            <p>Email: {c.email}</p>
            <p>Total Sales: ${c.totalSales}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">Shopify Consignees</h2>
      <div className="grid gap-4 md:grid-cols-2">
        
        {loading ? (
          <p>Loading consignees...</p>
        ) : consignees.length === 0 ? (
          <p>No consignees available.</p>
        ) : (
          <ul className="space-y-2">
          {consignees.map((consignee: any) => (
            <li key={consignee.id} className="border p-4 rounded-lg shadow-sm">
              <p className="font-semibold">{consignee.first_name} {consignee.last_name}</p>
              <p className="text-sm text-gray-600">{consignee.email}</p>
              {consignee.default_address && (
                <p className="text-sm text-gray-500">
                  {consignee.default_address.address1}, {consignee.default_address.city}, {consignee.default_address.country}
                </p>
              )}
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
};

export default Consignees;