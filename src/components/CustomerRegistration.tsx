
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCustomerOperations } from '@/hooks/useCustomerOperations';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, User, Phone, Mail, MapPin, Calendar, Briefcase, Eye } from 'lucide-react';

const CustomerRegistration = () => {
  const { addCustomer } = useCustomerOperations();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    age: '',
    address: '',
    occupation: '',
    distribution: '',
    salesAgent: '',
    assignedDoctor: '',
    prescription: {
      od: '',
      os: '',
      ou: '',
      pd: '',
      add: ''
    },
    remarks: '',
    priorityType: 'Regular'
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('prescription.')) {
      const prescriptionField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        prescription: {
          ...prev.prescription,
          [prescriptionField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contactNumber) {
      toast({
        title: "Error",
        description: "Name and contact number are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const customerData = {
        name: formData.name,
        contactNumber: formData.contactNumber,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : 0,
        address: formData.address,
        occupation: formData.occupation,
        distribution: formData.distribution,
        salesAgent: formData.salesAgent,
        assignedDoctor: formData.assignedDoctor,
        prescription: formData.prescription,
        remarks: formData.remarks,
        priorityType: formData.priorityType,
        waitTime: 0,
        status: 'waiting' as const,
        orNumber: ''
      };

      await addCustomer(customerData);
      
      // Reset form
      setFormData({
        name: '',
        contactNumber: '',
        email: '',
        age: '',
        address: '',
        occupation: '',
        distribution: '',
        salesAgent: '',
        assignedDoctor: '',
        prescription: {
          od: '',
          os: '',
          ou: '',
          pd: '',
          add: ''
        },
        remarks: '',
        priorityType: 'Regular'
      });

      toast({
        title: "Success",
        description: "Customer registered successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register customer",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Customer Registration</h2>
        <p className="text-gray-600">Register new customers for queue management</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            New Customer Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter customer's full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Number *
                </Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  placeholder="Enter contact number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Enter age"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter complete address"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="occupation" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Occupation
                </Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  placeholder="Enter occupation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salesAgent">Sales Agent</Label>
                <Select value={formData.salesAgent} onValueChange={(value) => handleInputChange('salesAgent', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sales agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ace">Ace</SelectItem>
                    <SelectItem value="yhel">Yhel</SelectItem>
                    <SelectItem value="jil">Jil</SelectItem>
                    <SelectItem value="mel">Mel</SelectItem>
                    <SelectItem value="jeselle">Jeselle</SelectItem>
                    <SelectItem value="eric">Eric</SelectItem>
                    <SelectItem value="john">John</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignedDoctor">Assigned Doctor</Label>
                <Input
                  id="assignedDoctor"
                  value={formData.assignedDoctor}
                  onChange={(e) => handleInputChange('assignedDoctor', e.target.value)}
                  placeholder="Enter assigned doctor"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priorityType">Priority Type</Label>
                <Select value={formData.priorityType} onValueChange={(value) => handleInputChange('priorityType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Priority">Priority</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Prescription Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Prescription Details
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="od">OD (Right Eye)</Label>
                  <Input
                    id="od"
                    value={formData.prescription.od}
                    onChange={(e) => handleInputChange('prescription.od', e.target.value)}
                    placeholder="e.g., -2.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="os">OS (Left Eye)</Label>
                  <Input
                    id="os"
                    value={formData.prescription.os}
                    onChange={(e) => handleInputChange('prescription.os', e.target.value)}
                    placeholder="e.g., -1.75"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ou">OU (Both Eyes)</Label>
                  <Input
                    id="ou"
                    value={formData.prescription.ou}
                    onChange={(e) => handleInputChange('prescription.ou', e.target.value)}
                    placeholder="e.g., -2.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pd">PD</Label>
                  <Input
                    id="pd"
                    value={formData.prescription.pd}
                    onChange={(e) => handleInputChange('prescription.pd', e.target.value)}
                    placeholder="e.g., 63"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add">ADD</Label>
                  <Input
                    id="add"
                    value={formData.prescription.add}
                    onChange={(e) => handleInputChange('prescription.add', e.target.value)}
                    placeholder="e.g., +1.25"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                placeholder="Any additional notes or remarks"
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full">
              Register Customer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerRegistration;
