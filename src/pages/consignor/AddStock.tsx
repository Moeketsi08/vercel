import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud } from 'lucide-react';

const categoryCommissionRates: Record<string, number> = {
  Sneakers: 10,
  Streetwear: 15,
  Accessories: 12,
  Collectibles: 8,
  'Luxury Items': 18,
};

const conditions = ['New', 'Like New', 'Used'];

const AddStock: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productName: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    condition: '',
    photos: [] as File[],
  });

  const [commissionRate, setCommissionRate] = useState<number | null>(null);

  useEffect(() => {
    if (form.category) {
      setCommissionRate(categoryCommissionRates[form.category]);
    }
  }, [form.category]);

  const handleInputChange = (key: keyof typeof form, value: string | number | File[] | undefined) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleInputChange('photos', Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate submission
    console.log('Submitting Product:', form);
    alert(`Product "${form.productName}" added!`);
    navigate('/consignor/inventory');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input
                value={form.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                placeholder="e.g., Air Jordan 1 Retro High"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(categoryCommissionRates).map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {commissionRate !== null && (
                <p className="text-sm text-muted-foreground">
                  Commission Rate: <span className="font-semibold">{commissionRate}%</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="e.g., 250"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="e.g., 5"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Provide a short description of the item..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Condition</Label>
              <Select onValueChange={(value) => handleInputChange('condition', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Upload Photos</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {form.photos.map((file, index) => (
                  <div key={index} className="w-24 h-24 bg-muted rounded overflow-hidden flex items-center justify-center">
                    <img src={URL.createObjectURL(file)} alt="preview" className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              <UploadCloud className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddStock;
// This code defines a React component for adding new stock items to a consignor's inventory.