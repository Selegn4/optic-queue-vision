
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { User, UserPlus, Mail, Shield } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'sales_employee' | 'cashier';
  created_at: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'sales_employee' as 'admin' | 'sales_employee' | 'cashier',
    password: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockUsers: UserProfile[] = [
      { id: '1', email: 'admin@escaoptical.com', name: 'System Administrator', role: 'admin', created_at: '2025-01-01' },
      { id: '2', email: 'ace@escaoptical.com', name: 'Ace', role: 'sales_employee', created_at: '2025-01-02' },
      { id: '3', email: 'yhel@escaoptical.com', name: 'Yhel', role: 'sales_employee', created_at: '2025-01-02' },
      { id: '4', email: 'jil@escaoptical.com', name: 'Jil', role: 'sales_employee', created_at: '2025-01-02' },
      { id: '5', email: 'mel@escaoptical.com', name: 'Mel', role: 'sales_employee', created_at: '2025-01-02' },
      { id: '6', email: 'jeselle@escaoptical.com', name: 'Jeselle', role: 'sales_employee', created_at: '2025-01-02' },
      { id: '7', email: 'eric@escaoptical.com', name: 'Eric', role: 'sales_employee', created_at: '2025-01-02' },
      { id: '8', email: 'john@escaoptical.com', name: 'John', role: 'sales_employee', created_at: '2025-01-02' },
      { id: '9', email: 'cashier@escaoptical.com', name: 'Cashier', role: 'cashier', created_at: '2025-01-03' },
    ];
    setUsers(mockUsers);
  }, []);

  const updateUserRole = async (userId: string, newRole: 'admin' | 'sales_employee' | 'cashier') => {
    try {
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      toast({
        title: "Success",
        description: "User role updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  const createUser = async () => {
    if (!newUser.email || !newUser.password || !newUser.name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      const newUserData: UserProfile = {
        id: (users.length + 1).toString(),
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        created_at: new Date().toISOString().split('T')[0]
      };

      setUsers(prev => [...prev, newUserData]);

      toast({
        title: "Success",
        description: "User created successfully!"
      });

      setNewUser({ email: '', password: '', name: '', role: 'sales_employee' });
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'sales_employee': return 'default';
      case 'cashier': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'sales_employee': return 'Sales Employee';
      case 'cashier': return 'Cashier';
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600">Manage user accounts and roles</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value: 'admin' | 'sales_employee' | 'cashier') => setNewUser(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="sales_employee">Sales Employee</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={createUser} disabled={isCreating} className="w-full">
                {isCreating ? 'Creating...' : 'Create User'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            System Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading users...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(newRole: 'admin' | 'sales_employee' | 'cashier') => 
                          updateUserRole(user.id, newRole)
                        }
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="sales_employee">Sales Employee</SelectItem>
                          <SelectItem value="cashier">Cashier</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Account Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-red-600 mb-2">👑 Admin Account</h4>
              <p className="text-sm"><strong>Username:</strong> admin</p>
              <p className="text-sm"><strong>Password:</strong> admin</p>
              <p className="text-xs text-gray-500 mt-2">Full system access</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-blue-600 mb-2">👥 Sales Employees</h4>
              <p className="text-sm">Ace, Yhel, Jil, Mel, Jeselle, Eric, John</p>
              <p className="text-sm"><strong>Password:</strong> sales123</p>
              <p className="text-xs text-gray-500 mt-2">Customer & queue management</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-green-600 mb-2">💰 Cashier Account</h4>
              <p className="text-sm"><strong>Username:</strong> cashier</p>
              <p className="text-sm"><strong>Password:</strong> cashier123</p>
              <p className="text-xs text-gray-500 mt-2">View-only access</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
