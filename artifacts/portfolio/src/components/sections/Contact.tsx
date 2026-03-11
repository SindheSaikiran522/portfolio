import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, SectionHeading, Button, Input, Textarea } from "@/components/ui/design-system";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const { toast } = useToast();
  const mutation = useSubmitContact({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Transmission Sent",
          description: "Your message has been successfully received.",
        });
        reset();
      },
      onError: (error) => {
        toast({
          title: "Transmission Failed",
          description: error.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    }
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate({ data });
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Open to opportunities, collaborations, and discussions.">
          Initiate Contact
        </SectionHeading>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-display text-muted-foreground mb-2">IDENTIFICATION</label>
                  <Input 
                    placeholder="Your Name" 
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-display text-muted-foreground mb-2">COMM LINK</label>
                  <Input 
                    placeholder="Your Email" 
                    type="email"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-display text-muted-foreground mb-2">PAYLOAD</label>
                <Textarea 
                  placeholder="Your Message..." 
                  {...register("message")}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Transmitting...</>
                ) : (
                  <><Send className="w-5 h-5" /> Send Message</>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
