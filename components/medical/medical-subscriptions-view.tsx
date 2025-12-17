"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Calendar, Award, Video, MessageCircle } from "lucide-react";
import { useState } from "react";

// Datos de doctores
const DOCTORS = [
  {
    id: "1",
    name: "Dr. Carlos Mendoza",
    specialty: "Medicina General",
    experience: "15 años de experiencia",
    rating: 4.9,
    reviews: 234,
    price: 50.00,
    availability: "Disponible hoy",
    image: "👨‍⚕️",
    description: "Especialista en medicina general con amplia experiencia en diagnóstico y tratamiento de enfermedades comunes.",
    languages: ["Español", "Inglés"],
  },
  {
    id: "2",
    name: "Dra. María Fernández",
    specialty: "Pediatría",
    experience: "12 años de experiencia",
    rating: 5.0,
    reviews: 189,
    price: 60.00,
    availability: "Disponible mañana",
    image: "👩‍⚕️",
    description: "Pediatra certificada especializada en el cuidado integral de niños y adolescentes.",
    languages: ["Español"],
  },
  {
    id: "3",
    name: "Dr. Roberto Silva",
    specialty: "Cardiología",
    experience: "20 años de experiencia",
    rating: 4.8,
    reviews: 312,
    price: 80.00,
    availability: "Disponible hoy",
    image: "👨‍⚕️",
    description: "Cardiólogo experto en prevención y tratamiento de enfermedades cardiovasculares.",
    languages: ["Español", "Inglés", "Portugués"],
  },
  {
    id: "4",
    name: "Dra. Ana Torres",
    specialty: "Dermatología",
    experience: "10 años de experiencia",
    rating: 4.9,
    reviews: 156,
    price: 70.00,
    availability: "Disponible hoy",
    image: "👩‍⚕️",
    description: "Dermatóloga especializada en tratamientos de piel, acné y enfermedades dermatológicas.",
    languages: ["Español", "Inglés"],
  },
  {
    id: "5",
    name: "Dr. Luis Ramírez",
    specialty: "Nutrición",
    experience: "8 años de experiencia",
    rating: 4.7,
    reviews: 98,
    price: 55.00,
    availability: "Disponible mañana",
    image: "👨‍⚕️",
    description: "Nutricionista clínico experto en planes alimenticios personalizados y control de peso.",
    languages: ["Español"],
  },
  {
    id: "6",
    name: "Dra. Patricia Gómez",
    specialty: "Psicología",
    experience: "14 años de experiencia",
    rating: 5.0,
    reviews: 267,
    price: 65.00,
    availability: "Disponible hoy",
    image: "👩‍⚕️",
    description: "Psicóloga clínica especializada en terapia cognitivo-conductual y manejo de ansiedad.",
    languages: ["Español", "Inglés"],
  },
];

const SPECIALTIES = ["Todas", "Medicina General", "Pediatría", "Cardiología", "Dermatología", "Nutrición", "Psicología"];

export function MedicalSubscriptionsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Todas");

  const filteredDoctors = DOCTORS.filter((doctor) => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "Todas" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Suscripciones Médicas</h1>
        <p className="mt-3 text-lg opacity-90">
          Consulta con profesionales certificados desde la comodidad de tu hogar
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar doctores por nombre o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Specialty Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {SPECIALTIES.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Benefits Banner */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-teal-500 bg-teal-50 p-4">
          <div className="flex items-center gap-3">
            <Video className="h-6 w-6 text-teal-600" />
            <div>
              <p className="font-semibold text-teal-900">Videoconsultas</p>
              <p className="text-xs text-teal-700">Atención en línea</p>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-cyan-500 bg-cyan-50 p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-cyan-600" />
            <div>
              <p className="font-semibold text-cyan-900">Agenda Flexible</p>
              <p className="text-xs text-cyan-700">Horarios disponibles</p>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-blue-500 bg-blue-50 p-4">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-900">Certificados</p>
              <p className="text-xs text-blue-700">Profesionales verificados</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Doctors Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden hover:shadow-xl transition-shadow">
            {/* Doctor Image */}
            <div className="h-48 bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
              <div className="text-8xl">{doctor.image}</div>
            </div>

            {/* Doctor Info */}
            <div className="p-6">
              {/* Specialty Badge */}
              <div className="mb-3">
                <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                  {doctor.specialty}
                </span>
                {doctor.availability === "Disponible hoy" && (
                  <span className="ml-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    ✓ {doctor.availability}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{doctor.experience}</p>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{doctor.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({doctor.reviews} reseñas)</span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                {doctor.description}
              </p>

              {/* Languages */}
              <div className="mt-3 flex flex-wrap gap-1">
                {doctor.languages.map((lang) => (
                  <span key={lang} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    {lang}
                  </span>
                ))}
              </div>

              {/* Price and Action */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <div>
                  <p className="text-sm text-gray-500">Consulta desde</p>
                  <p className="text-2xl font-bold text-teal-600">
                    S/ {doctor.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredDoctors.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">
            No se encontraron doctores que coincidan con tu búsqueda
          </p>
        </Card>
      )}

      {/* Info Section */}
      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Cómo funcionan las consultas médicas?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
              <span className="text-xl font-bold text-teal-600">1</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Elige tu doctor</h3>
            <p className="text-sm text-gray-600">
              Selecciona al profesional que mejor se adapte a tus necesidades
            </p>
          </div>

          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100">
              <span className="text-xl font-bold text-cyan-600">2</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Agenda tu cita</h3>
            <p className="text-sm text-gray-600">
              Escoge el horario que más te convenga para tu consulta
            </p>
          </div>

          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <span className="text-xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Consulta en línea</h3>
            <p className="text-sm text-gray-600">
              Conéctate desde cualquier lugar y recibe atención profesional
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
