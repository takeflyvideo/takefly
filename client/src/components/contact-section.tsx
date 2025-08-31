import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Instagram, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  service: z.string().min(1, "Selecione um tipo de serviço"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Phone,
    title: "Telefone",
    value: "11 920566022",
    href: "tel:11920566022"
  },
  {
    icon: SiWhatsapp,
    title: "WhatsApp",
    value: "11 920566022",
    href: "https://wa.me/5511920566022"
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@takeflyvideo",
    href: "https://instagram.com/takeflyvideo"
  },
  {
    icon: Mail,
    title: "Email",
    value: "takeflyvideo@gmail.com",
    href: "mailto:takeflyvideo@gmail.com"
  },
  {
    icon: MapPin,
    title: "Localização",
    value: "Rio de Janeiro, RJ",
    href: "#"
  }
];

const serviceOptions = [
  { value: "fotografia", label: "Fotografia Aérea" },
  { value: "video", label: "Vídeo Aéreo" },
  { value: "evento", label: "Cobertura de Evento" },
  { value: "imovel", label: "Fotografia de Imóvel" },
  { value: "outro", label: "Outro" }
];

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Em breve retornaremos sua mensagem.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato pelos outros meios disponíveis.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitContactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 px-4" data-testid="contact-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 font-serif" data-testid="contact-title">
            Vamos Conversar
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-subtitle">
            Pronto para capturar seus momentos especiais? Entre em contato conosco
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
            data-testid="contact-info"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-xl"
                data-testid={`contact-info-${info.title.toLowerCase()}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{info.title}</h3>
                    {info.href !== "#" ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-xl"
            data-testid="contact-form-container"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} data-testid="input-name" />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(11) 99999-9999" {...field} data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Serviço</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-service">
                            <SelectValue placeholder="Selecione o serviço" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceOptions.map((option) => (
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
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Conte-nos sobre seu projeto..."
                          className="resize-none"
                          rows={4}
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full hover-scale"
                  disabled={submitContactMutation.isPending}
                  data-testid="button-submit"
                >
                  {submitContactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
