
import React, { useState } from 'react';
import { X, User, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type ActivityRegistrationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  activityName: string;
  activityId: string;
};

const ActivityRegistrationModal: React.FC<ActivityRegistrationModalProps> = ({
  isOpen,
  onClose,
  activityName,
  activityId,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Nomor telepon wajib diisi';
    } else if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Nomor telepon harus minimal 10 digit angka';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!formData.email.endsWith('@gmail.com')) {
      newErrors.email = 'Email harus menggunakan domain @gmail.com';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('activity_registrations')
        .insert({
          full_name: formData.fullName.trim(),
          phone_number: formData.phoneNumber.replace(/\s/g, ''),
          email: formData.email.trim().toLowerCase(),
          activity_name: activityName,
          activity_id: activityId,
        });

      if (error) {
        console.error('Registration error:', error);
        toast.error('Gagal mendaftar. Silakan coba lagi.');
      } else {
        toast.success('Pendaftaran berhasil!');
        setFormData({ fullName: '', phoneNumber: '', email: '' });
        setErrors({});
        onClose();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Daftar Kegiatan</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-4 p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center text-primary">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="font-medium">{activityName}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="flex items-center mb-2">
                <User className="h-4 w-4 mr-2" />
                Nama Lengkap
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                disabled={isSubmitting}
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="flex items-center mb-2">
                <Phone className="h-4 w-4 mr-2" />
                Nomor Telepon Aktif
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="08xxxxxxxxxx"
                disabled={isSubmitting}
                className={errors.phoneNumber ? 'border-red-500' : ''}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center mb-2">
                <Mail className="h-4 w-4 mr-2" />
                Alamat Gmail
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="nama@gmail.com"
                disabled={isSubmitting}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivityRegistrationModal;
