"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { School, Bell, Mail, Smartphone, Save, RefreshCw, AlertTriangle, Trash2, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [schoolInfo, setSchoolInfo] = useState({
    schoolName: "École scolariX",
    email: "contact@scolarix.com",
    phone: "+221 77 123 4567",
    address: "Dakar, Senegal",
    whatsapp: "+221 77 123 4567",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    whatsappNotifications: true,
    smsNotifications: false,
  });

  const handleSchoolInfoChange = (field: string, value: string) => {
    setSchoolInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof notificationSettings],
    }));
  };

  const handleSaveSettings = () => {
    toast.success("Paramètres sauvegardés avec succès!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold neon">Paramètres</h1>
        <p className="muted">Configurer votre école et notifications</p>
      </div>

      {/* School Information */}
      <Card>
        <CardHeader title="Informations de l'École" icon={<School className="w-5 h-5" />} />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Nom de l'École</label>
              <input
                type="text"
                value={schoolInfo.schoolName}
                onChange={(e) => handleSchoolInfoChange("schoolName", e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={schoolInfo.email}
                onChange={(e) => handleSchoolInfoChange("email", e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Téléphone</label>
              <input
                type="tel"
                value={schoolInfo.phone}
                onChange={(e) => handleSchoolInfoChange("phone", e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">WhatsApp</label>
              <input
                type="tel"
                value={schoolInfo.whatsapp}
                onChange={(e) => handleSchoolInfoChange("whatsapp", e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white text-sm font-medium mb-2">Adresse</label>
              <input
                type="text"
                value={schoolInfo.address}
                onChange={(e) => handleSchoolInfoChange("address", e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button variant="primary" onClick={handleSaveSettings}>
              <Save className="w-4 h-4 inline mr-2" />Sauvegarder
            </Button>
            <Button variant="secondary">
              <RefreshCw className="w-4 h-4 inline mr-2" />Annuler
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader title="Notifications" icon={<Bell className="w-5 h-5" />} />
        <CardBody>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
              <div>
                <h4 className="text-white font-medium"><Mail className="w-4 h-4 inline mr-2" />Notifications Email</h4>
                <p className="text-gray-400 text-sm">Recevoir les notifications par email</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={() => handleNotificationChange("emailNotifications")}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.emailNotifications ? "bg-primary-600" : "bg-dark-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      notificationSettings.emailNotifications ? "translate-x-6" : "translate-x-0.5"
                    } mt-0.5`}
                  />
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
              <div>
                <h4 className="text-white font-medium"><Smartphone className="w-4 h-4 inline mr-2" />Notifications WhatsApp</h4>
                <p className="text-gray-400 text-sm">Recevoir les notifications sur WhatsApp</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.whatsappNotifications}
                  onChange={() => handleNotificationChange("whatsappNotifications")}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.whatsappNotifications ? "bg-primary-600" : "bg-dark-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      notificationSettings.whatsappNotifications ? "translate-x-6" : "translate-x-0.5"
                    } mt-0.5`}
                  />
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
              <div>
                <h4 className="text-white font-medium"><MessageSquare className="w-4 h-4 inline mr-2" />Notifications SMS</h4>
                <p className="text-gray-400 text-sm">Recevoir les notifications par SMS</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.smsNotifications}
                  onChange={() => handleNotificationChange("smsNotifications")}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.smsNotifications ? "bg-primary-600" : "bg-dark-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      notificationSettings.smsNotifications ? "translate-x-6" : "translate-x-0.5"
                    } mt-0.5`}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button variant="primary" onClick={handleSaveSettings}>
              <Save className="w-4 h-4 inline mr-2" />Sauvegarder
            </Button>
            <Button variant="secondary">
              <RefreshCw className="w-4 h-4 inline mr-2" />Annuler
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Danger Zone */}
      <Card className="border border-red-600/30">
        <CardHeader title="Zone Dangereuse" icon={<AlertTriangle className="w-5 h-5" />} />
        <CardBody>
          <div className="space-y-3">
            <Button variant="danger" size="lg" className="w-full">
              <Trash2 className="w-4 h-4 inline mr-2" />Supprimer la Base de Données
            </Button>
            <p className="text-gray-400 text-sm">Cette action est irréversible.</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
