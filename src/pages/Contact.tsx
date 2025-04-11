
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

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact = () => {
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
      await addMessage(values);
      
      // Reset the form
      form.reset();
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      details: [
        "+1 (555) 123-4567",
        "+1 (555) 987-6543"
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      details: [
        "info@alhikmamosque.org",
        "admin@alhikmamosque.org"
      ]
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Address",
      details: [
        "Jl. Ganggeng VII No.2 3, RT.4/RW.7,",
        "Sungai Bambu, Kec. Tj. Priok,",
        "Jkt Utara, Daerah Khusus Ibukota Jakarta 14330"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 5:00 PM",
        "Saturday: 10:00 AM - 2:00 PM",
        "Sunday: Closed"
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
    { value: "general", label: "General Inquiry" },
    { value: "prayer", label: "Prayer Times" },
    { value: "activities", label: "Activities & Events" },
    { value: "donation", label: "Donations" },
    { value: "volunteer", label: "Volunteering" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with new background image */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://lh3.googleusercontent.com/gps-cs-s/AB5caB9I2ai2ccpAlGiqXUsOeH7UPJKr8EtIOWiCZipuk7k6KIR7AiY298B8xc-OVb5bVPKawUIOv8irP4LjlnvSyH967NPzXCfan5Bvxy9VY0_e5vb-c9HrleJT8oHjyCIvclDCI-cG=s1360-w1360-h1020")',
            filter: 'brightness(0.4)'
          }}
        />
        
        <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white font-heading mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            We're here to answer any questions you may have about our mosque, services, or community activities.
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">How to Reach Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out through any of these channels. We strive to respond to all inquiries within 24 hours.
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
                  <h3 className="text-xl font-bold font-heading">Our Location</h3>
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
                  <h3 className="text-xl font-bold font-heading">Send Us a Message</h3>
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
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
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
                          <FormLabel>Subject</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
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
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Type your message here..." 
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
                        "Processing..."
                      ) : (
                        <>
                          Send Message
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
          <h2 className="section-title mb-4 after:left-1/4 after:w-1/2 mx-auto">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find quick answers to common questions about our mosque and services.
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
              <h3 className="text-lg font-bold mb-2">What are the prayer times?</h3>
              <p className="text-muted-foreground">
                Prayer times vary throughout the year based on the position of the sun. You can check our website's prayer times section or download our mobile app for accurate, up-to-date prayer times.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">Do you offer tours of the mosque?</h3>
              <p className="text-muted-foreground">
                Yes, we offer guided tours for individuals and groups. Please contact us at least 48 hours in advance to schedule a tour.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">How can I donate to the mosque?</h3>
              <p className="text-muted-foreground">
                Donations can be made in person, by mail, or online through our secure donation portal. All donations are tax-deductible.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">Can non-Muslims visit the mosque?</h3>
              <p className="text-muted-foreground">
                Absolutely! We welcome visitors of all faiths who wish to learn about Islam and our community. We ask that visitors dress modestly out of respect.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
