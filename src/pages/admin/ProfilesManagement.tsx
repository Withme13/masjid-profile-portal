
import React, { useState } from 'react';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FormDialog from '@/components/admin/FormDialog';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import { LeadershipMember } from '@/types/adminTypes';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ProfilesManagement = () => {
  const { leadership, addLeadershipMember, updateLeadershipMember, deleteLeadershipMember } = useData();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMember, setCurrentMember] = useState<LeadershipMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    education: '',
    imageUrl: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openAddDialog = () => {
    setFormData({
      name: '',
      position: '',
      education: '',
      imageUrl: '',
    });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (member: LeadershipMember) => {
    setCurrentMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      education: member.education,
      imageUrl: member.imageUrl,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (member: LeadershipMember) => {
    setCurrentMember(member);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addLeadershipMember(formData);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding leadership member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMember) return;
    
    setIsSubmitting(true);
    
    try {
      await updateLeadershipMember({
        ...formData,
        id: currentMember.id
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating leadership member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!currentMember) return;
    
    setIsSubmitting(true);
    
    try {
      await deleteLeadershipMember(currentMember.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting leadership member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leadership Profiles</h1>
            <p className="text-muted-foreground">
              Manage the leadership team profiles that appear on the website.
            </p>
          </div>
          <Button onClick={openAddDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Profile
          </Button>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="hidden md:table-cell">Education</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadership.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No leadership profiles found. Add your first profile!
                  </TableCell>
                </TableRow>
              ) : (
                leadership.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img 
                          src={member.imageUrl} 
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                      {member.education}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(member)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => openDeleteDialog(member)}
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
          title="Add New Leadership Profile"
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Add Profile"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="education">Education Background</Label>
              <Textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter the URL of the profile image. Recommended size: 200x200 pixels.
              </p>
            </div>
          </div>
        </FormDialog>

        {/* Edit Dialog */}
        <FormDialog
          title="Edit Leadership Profile"
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Update Profile"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-position">Position</Label>
              <Input
                id="edit-position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-education">Education Background</Label>
              <Textarea
                id="edit-education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-imageUrl">Image URL</Label>
              <Input
                id="edit-imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {formData.imageUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="h-16 w-16 rounded-full overflow-hidden border">
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
          title="Delete Profile"
          description={`Are you sure you want to delete ${currentMember?.name}'s profile? This action cannot be undone.`}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          isConfirming={isSubmitting}
        />
      </div>
    </AdminLayout>
  );
};

export default ProfilesManagement;
