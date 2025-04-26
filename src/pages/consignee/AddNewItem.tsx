import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { UploadCloud, Search, PlusCircle } from 'lucide-react';

type StockXItem = {
  name: string;
  price: string;
  image: string;
  link: string;
};

const AddNewItem: React.FC = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<StockXItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<StockXItem | null>(null);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [commission, setCommission] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.length < 3) return;

      try {
        const res = await fetch(`http://localhost:5000/api/stockx/search?q=${encodeURIComponent(search)}`);
        const data = await res.json();
        console.log('Scraped:', data.results);
        setResults(data.results);
      } catch (err) {
        console.error('Scrape failed', err);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleAdd = () => {
    alert(`Added: ${selectedItem?.name} (x${quantity}) for R${price} - ${commission}% commission`);
    // Simulate submitting to backend
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            Add New Item
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search StockX..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && results.length > 0 && (
              <div className="mt-2 max-h-60 overflow-y-auto border rounded-md bg-white shadow z-10">
                {results.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedItem(item);
                      setPrice(item.price.replace(/[^\d.]/g, '')); // Strip out $ sign
                      setSearch('');
                      setResults([]);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-muted flex items-center gap-2"
                  >
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-md" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Inputs */}
          {selectedItem && (
            <>
              <div>
                <Label>Price (R)</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <Label>Commission Rate (%)</Label>
                <Input
                  type="number"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                />
              </div>
              <div>
                <Label>Upload Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-md border"
                  />
                )}
              </div>
              <Button onClick={handleAdd} className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Item to Inventory
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewItem;

