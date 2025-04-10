
import React, { useState, ChangeEvent } from 'react';
import { uploadFile } from '@/utils/fileUpload';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FormDialog from '@/components/admin/FormDialog';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import { Facility } from '@/types/adminTypes';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const FacilitiesManagement = () => {
  const { facilities, addFacility, updateFacility, deleteFacility } = useData();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentFacility, setCurrentFacility] = useState<Facility | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsSubmitting(true);
      try {
        const uploadedImageUrl = await uploadFile(file);
        if (uploadedImageUrl) {
          setFormData(prev => ({
            ...prev,
            imageUrl: uploadedImageUrl
          }));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const openAddDialog = () => {
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
    });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (facility: Facility) => {
    setCurrentFacility(facility);
    setFormData({
      name: facility.name,
      description: facility.description,
      imageUrl: facility.imageUrl,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (facility: Facility) => {
    setCurrentFacility(facility);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addFacility(formData);
    } catch (error) {
      console.error("Error adding facility:", error);
    } finally {
      setIsSubmitting(false);
      setIsAddDialogOpen(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFacility) return;
    
    setIsSubmitting(true);
    
    try {
      await updateFacility({
        ...formData,
        id: currentFacility.id
      });
    } catch (error) {
      console.error("Error updating facility:", error);
    } finally {
      setIsSubmitting(false);
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!currentFacility) return;
    
    setIsSubmitting(true);
    
    try {
      await deleteFacility(currentFacility.id);
    } catch (error) {
      console.error("Error deleting facility:", error);
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Facilities Management</h1>
            <p className="text-muted-foreground">
              Manage the mosque facilities that appear on the website.
            </p>
          </div>
          <Button onClick={openAddDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Facility
          </Button>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facilities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No facilities found. Add your first facility!
                  </TableCell>
                </TableRow>
              ) : (
                facilities.map((facility) => (
                  <TableRow key={facility.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded overflow-hidden">
                        <img 
                          src={facility.imageUrl} 
                          alt={facility.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{facility.name}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                      {facility.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(facility)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => openDeleteDialog(facility)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Add Dialog */}
        <FormDialog
          title="Add New Facility"
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Add Facility"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Facility Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facilityImage">Facility Image</Label>
              <Input
                id="facilityImage"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="flex-grow"
              />
              <p className="text-xs text-muted-foreground">
                Upload a facility image (recommended size: 800x600 pixels)
              </p>
            </div>
            
            {formData.imageUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="h-16 w-20 rounded overflow-hidden border">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </FormDialog>

        {/* Edit Dialog */}
        <FormDialog
          title="Edit Facility"
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Update Facility"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Facility Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-facilityImage">Facility Image</Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="edit-facilityImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="flex-grow"
                />
                {formData.imageUrl && (
                  <Input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL will appear here after upload"
                    readOnly
                    className="bg-gray-50"
                  />
                )}
              </div>
            </div>
            
            {formData.imageUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="h-16 w-20 rounded overflow-hidden border">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </FormDialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          title="Delete Facility"
          description={`Are you sure you want to delete the ${currentFacility?.name} facility? This action cannot be undone.`}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          isConfirming={isSubmitting}
        />
      </div>
    </AdminLayout>
  );
};

export default FacilitiesManagement;
