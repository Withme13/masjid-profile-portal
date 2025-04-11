
import React, { useState, useEffect } from 'react';
import { Eye, Trash2, MailOpen, Mail, Calendar, Search, Check } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import { ContactMessage } from '@/types/adminTypes';
import { toast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format, parseISO } from 'date-fns';

const MessagesManagement = () => {
  const { messages, updateMessageReadStatus, deleteMessage } = useData();
  
  // Message detail view
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isMessageDrawerOpen, setIsMessageDrawerOpen] = useState(false);
  
  // Delete dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsMessageDrawerOpen(true);
    
    if (!message.isRead) {
      updateMessageReadStatus(message.id, true);
    }
  };

  const handleDeleteClick = (message: ContactMessage) => {
    setMessageToDelete(message);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;
    
    setIsSubmitting(true);
    
    try {
      await deleteMessage(messageToDelete.id);
      
      if (selectedMessage?.id === messageToDelete.id) {
        setSelectedMessage(null);
        setIsMessageDrawerOpen(false);
      }
      
      toast({
        title: "Success",
        description: "Message deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete the message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  // Filter messages
  const filteredMessages = messages
    .filter(message => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          message.name.toLowerCase().includes(searchLower) ||
          message.email.toLowerCase().includes(searchLower) ||
          message.subject.toLowerCase().includes(searchLower) ||
          message.message.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter(message => {
      // Apply unread filter
      if (showUnreadOnly) {
        return !message.isRead;
      }
      return true;
    })
    // Sort by date (most recent first)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const countUnreadMessages = messages.filter(message => !message.isRead).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
            <p className="text-muted-foreground">
              Manage messages submitted through the contact form.
            </p>
          </div>
          {countUnreadMessages > 0 && (
            <Badge variant="default" className="self-start">
              {countUnreadMessages} unread {countUnreadMessages === 1 ? 'message' : 'messages'}
            </Badge>
          )}
        </div>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant={showUnreadOnly ? "default" : "outline"}
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className="flex-shrink-0"
          >
            {showUnreadOnly ? <MailOpen className="mr-2 h-4 w-4" /> : <Mail className="mr-2 h-4 w-4" />}
            {showUnreadOnly ? "Showing Unread" : "Show All"}
          </Button>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]"></TableHead>
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    {searchTerm || showUnreadOnly ? "No messages match your filters." : "No messages received yet."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message) => (
                  <TableRow key={message.id} className={!message.isRead ? "bg-primary/5" : undefined}>
                    <TableCell>
                      {!message.isRead && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {message.name}
                      <div className="text-xs text-muted-foreground">{message.email}</div>
                    </TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="mr-1 h-3 w-3" />
                        {format(parseISO(message.date), 'MMM d, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewMessage(message)}
                          title="View message"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        {!message.isRead && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => updateMessageReadStatus(message.id, true)}
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteClick(message)}
                          title="Delete message"
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

        {/* Message Detail Drawer */}
        <Drawer open={isMessageDrawerOpen} onOpenChange={(open) => !open && setIsMessageDrawerOpen(false)}>
          <DrawerContent className="p-4 max-h-[80vh]">
            {selectedMessage && (
              <>
                <DrawerHeader className="px-0">
                  <DrawerTitle>Message from {selectedMessage.name}</DrawerTitle>
                  <DrawerDescription>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{selectedMessage.email}</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{format(parseISO(selectedMessage.date), 'MMM d, yyyy h:mm a')}</span>
                      <span className="text-muted-foreground">•</span>
                      <span>
                        {selectedMessage.isRead ? (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Check className="h-3 w-3" /> Read
                          </Badge>
                        ) : (
                          <Badge variant="default" className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> Unread
                          </Badge>
                        )}
                      </span>
                    </div>
                  </DrawerDescription>
                </DrawerHeader>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Subject</h3>
                    <p className="text-lg font-medium">{selectedMessage.subject}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Message</h3>
                    <div className="p-4 border rounded-md bg-background whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsMessageDrawerOpen(false)}
                    >
                      Close
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        setMessageToDelete(selectedMessage);
                        setIsMessageDrawerOpen(false);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DrawerContent>
        </Drawer>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          title="Delete Message"
          description={`Are you sure you want to delete this message from ${messageToDelete?.name}? This action cannot be undone.`}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          isConfirming={isSubmitting}
        />
      </div>
    </AdminLayout>
  );
};

export default MessagesManagement;
