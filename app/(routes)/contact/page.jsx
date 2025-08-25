"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Import the new component
import { toast } from "sonner";
import GlobalApi from "@/app/_utils/GlobalApi";
import { LoaderCircle, Mail } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { prenom, nom, email, message } = formData;
    if (!prenom || !nom || !email || !message) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    try {
      const response = await GlobalApi.sendFeedback(formData);
      toast.success(response.msg);
      setFormData({ prenom: '', nom: '', email: '', message: '' }); // Clear form
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contactez-nous
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Une question ou une suggestion ? N'hésitez pas à nous laisser un message.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="prenom" className="block text-sm font-semibold leading-6 text-gray-900">
                Prénom
              </label>
              <div className="mt-2.5">
                <Input
                  type="text"
                  name="prenom"
                  id="prenom"
                  placeholder="Votre prénom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="nom" className="block text-sm font-semibold leading-6 text-gray-900">
                Nom
              </label>
              <div className="mt-2.5">
                <Input
                  type="text"
                  name="nom"
                  id="nom"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Votre adresse e-mail"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <Textarea
                name="message"
                id="message"
                rows={4}
                placeholder="Votre message..."
                value={formData.message}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
            </div>
          </div>
          <div className="mt-8">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Envoyer le message"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}