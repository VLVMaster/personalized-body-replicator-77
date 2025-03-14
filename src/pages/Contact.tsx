
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-10 text-center">
          Have questions or want to learn more about VLV? We'd love to hear from you.
        </p>
        
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
