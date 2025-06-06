
import React, { useState, useEffect } from 'react';
import { Map, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import MapComponent from '@/components/MapComponent';
import { useData } from '@/contexts/DataContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus minimal 2 karakter." }),
  email: z.string().email({ message: "Mohon masukkan alamat email yang valid." }),
  subject: z.string().min(1, { message: "Mohon pilih subjek." }),
  message: z.string().min(10, { message: "Pesan harus minimal 10 karakter." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { addMessage } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize react-hook-form with zod validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Pass the values directly - all fields are required by the schema
      // Explicitly cast or create a new object that matches the expected type
      const messageData = {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message
      };
      
      await addMessage(messageData);
      
      // Reset the form
      form.reset();
      
      toast({
        title: "Pesan Terkirim!",
        description: "Kami akan menghubungi Anda sesegera mungkin.",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Terjadi masalah saat mengirim pesan Anda. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Telepon",
      details: [
        "+62 812-8484-2334 (GIBRAN)",
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      details: [
        "attauhidglgg@gmail.com"
      ]
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Alamat",
      details: [
        "Jl. Ganggeng VII No.2 3, RT.4/RW.7,",
        "Sungai Bambu, Kec. Tj. Priok,",
        "Jkt Utara, Daerah Khusus Ibukota Jakarta 14330"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Jam Operasional",
      details: [
        "Senin - Jumat: 09:00 - 17:00",
        "Sabtu: 10:00 - 14:00",
        "Minggu: Tutup"
      ]
    }
  ];

  // Define the actual mosque address
  const mosqueAddress = "Jl. Ganggeng VII No.2 3, RT.4/RW.7, Sungai Bambu, Kec. Tj. Priok, Jkt Utara, Daerah Khusus Ibukota Jakarta 14330";

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Available subject options
  const subjectOptions = [
    { value: "general", label: "Pertanyaan Umum" },
    { value: "prayer", label: "Waktu Shalat" },
    { value: "activities", label: "Aktivitas & Acara" },
    { value: "donation", label: "Donasi" },
    { value: "volunteer", label: "Volunteer" },
    { value: "other", label: "Lainnya" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with new background image */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("/lovable-uploads/9933a85b-542f-49b9-80d1-3dc25f397d71.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.9)'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/5 z-1"></div>
        
        <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6"
            style={{ color: '#69443c' }}
          >
            {t('contact.hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl mx-auto bg-white/70 backdrop-blur-sm py-2 px-4 rounded-lg"
          >
            {t('contact.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Hubungi Kami
          </span>
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">Cara Menghubungi Kami</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jangan ragu untuk menghubungi kami melalui salah satu saluran ini. Kami berusaha merespons semua pertanyaan dalam 24 jam.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="glass-panel p-6 text-center hover-scale"
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">{item.title}</h3>
              <div className="space-y-1">
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-muted-foreground">{detail}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map & Contact Form */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="glass-panel rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b">
                <div className="flex items-center">
                  <Map className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-bold font-heading">Lokasi Kami</h3>
                </div>
              </div>
              <div className="h-[400px] relative">
                <MapComponent address={mosqueAddress} />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="glass-panel rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-bold font-heading">Kirim Pesan</h3>
                </div>
              </div>
              <div className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Anda</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan nama Anda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan email Anda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subjek</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih subjek" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjectOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pesan</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Ketik pesan Anda di sini..." 
                              rows={4} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full btn-primary flex items-center justify-center" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Memproses..."
                      ) : (
                        <>
                          Kirim Pesan
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban cepat untuk pertanyaan umum tentang masjid dan layanan kami.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">Kapan waktu shalat?</h3>
              <p className="text-muted-foreground">
                Waktu shalat bervariasi sepanjang tahun berdasarkan posisi matahari. Anda dapat memeriksa bagian waktu shalat di website kami atau mengunduh aplikasi mobile kami untuk mendapatkan waktu shalat yang akurat dan terkini.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">Apakah ada tur masjid?</h3>
              <p className="text-muted-foreground">
                Ya, kami menawarkan tur terpandu untuk individu dan kelompok. Mohon hubungi kami setidaknya 48 jam sebelumnya untuk menjadwalkan tur.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">Bagaimana cara berdonasi ke masjid?</h3>
              <p className="text-muted-foreground">
                Donasi dapat dilakukan secara langsung, melalui pos, atau online melalui portal donasi aman kami. Semua donasi dapat dikurangkan dari pajak.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">Bisakah non-Muslim mengunjungi masjid?</h3>
              <p className="text-muted-foreground">
                Tentu saja! Kami menyambut pengunjung dari semua agama yang ingin belajar tentang Islam dan komunitas kami. Kami meminta pengunjung berpakaian sopan sebagai bentuk penghormatan.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
