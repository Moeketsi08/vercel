
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Check,
  X,
  FilterX
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const fetchInventory = async () => {
  const res = await fetch('http://localhost:5000/api/shopify/inventory');
  if (!res.ok) throw new Error('Failed to fetch inventory');
  return res.json();
};


const ConsignorInventory: React.FC = () => {
  const { inventory, deleteInventoryItem } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Filter items based on search query and filter
  const filteredItems = inventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.consigneeName.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (filter === 'all') return matchesSearch;
    if (filter === 'consigned') return matchesSearch && item.isConsigned;
    if (filter === 'store') return matchesSearch && !item.isConsigned;
    if (filter === 'active') return matchesSearch && item.isActive;
    if (filter === 'inactive') return matchesSearch && !item.isActive;
    
    return matchesSearch;
  });


  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteInventoryItem(id);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilter('all');
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory,
  });

    // Filter items based on search query and filter
/*     const filteredItems1 = data.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tracked.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.created_at.toLowerCase().includes(searchQuery.toLowerCase());
        
      if (filter === 'all') return matchesSearch;
      if (filter === 'consigned') return matchesSearch && item.isConsigned;
      if (filter === 'store') return matchesSearch && !item.isConsigned;
      if (filter === 'active') return matchesSearch && item.isActive;
      if (filter === 'inactive') return matchesSearch && !item.isActive;
      
      return matchesSearch;
    }); */
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading inventory: {(error as Error).message}</p>;


  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Manage all store and consignment inventory
          </p>
        </div>
        <Link to="/consignor/inventory/add">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>All Items</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inventory..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="consigned">Consigned Only</SelectItem>
                  <SelectItem value="store">Store Only</SelectItem>
                  <SelectItem value="active">Active Items</SelectItem>
                  <SelectItem value="inactive">Inactive Items</SelectItem>
                </SelectContent>
              </Select>
              {(searchQuery || filter !== 'all') && (
                <Button variant="outline" size="icon" onClick={clearFilters}>
                  <FilterX className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <CardDescription>
            You have {inventory.length} items in total inventory ({inventory.filter(i => i.isConsigned).length} consigned)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredItems.length > 0 ? (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Consignee</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.consigneeName || 'Store Inventory'}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {item.isConsigned ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                            Consigned
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
                            Store
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.isActive ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            <Check className="mr-1 h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
                            <X className="mr-1 h-3 w-3" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>{item.isConsigned ? `${item.commissionRate}%` : '-'}</TableCell>
                      <TableCell>{new Date(item.dateAdded).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link to={`/consignor/inventory/${item.id}`}>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                            </Link>
                            <Link to={`/consignor/inventory/${item.id}/edit`}>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Item
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => handleDeleteItem(item.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No items found</h3>
              <p className="text-muted-foreground">
                {inventory.length === 0 
                  ? "You haven't added any inventory items yet." 
                  : "No items match your search criteria."}
              </p>
              {inventory.length === 0 && (
                <Link to="/consignor/inventory/add">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Item
                  </Button>
                </Link>
              )}
              {inventory.length > 0 && (
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  <FilterX className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Store Inventory</h1>

      {isLoading ? (
        <p>Loading inventory...</p>
      ) : data.length === 0 ? (
        <p>No inventory available.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Item</th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">SKU</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Tracked</th>
              <th className="p-2 border">Requires Shipping</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.sku || '—'}</td>
                <td className="p-2 border">{item.price || '—'}</td>
                <td className="p-2 border">{item.tracked ? '✅' : '❌'}</td>
                <td className="p-2 border">{item.requires_shipping ? '✅' : '❌'}</td>
                <td className="p-2 border">{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

// Import missing components
import { Package } from 'lucide-react';

export default ConsignorInventory;
