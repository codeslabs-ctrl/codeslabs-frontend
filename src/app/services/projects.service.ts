import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Project {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
  tecnologias: string[];
  url?: string;
  imagen?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects: Project[] = [
    {
      id: '1',
      nombre: 'E-commerce Platform',
      descripcion: 'Plataforma de comercio electrónico con IA para recomendaciones personalizadas',
      estado: 'completado',
      tecnologias: ['Angular', 'Node.js', 'MongoDB', 'Machine Learning'],
      url: 'https://example.com/ecommerce',
      imagen: 'assets/project1.svg',
      fechaInicio: '2023-01-15',
      fechaFin: '2023-06-30'
    },
    {
      id: '2',
      nombre: 'Sistema de Gestión Empresarial',
      descripcion: 'ERP completo con automatización de procesos y análisis predictivo',
      estado: 'en progreso',
      tecnologias: ['React', 'Python', 'PostgreSQL', 'TensorFlow'],
      url: 'https://example.com/erp',
      imagen: 'assets/project2.svg',
      fechaInicio: '2023-03-01'
    },
    {
      id: '3',
      nombre: 'App Móvil de Salud',
      descripcion: 'Aplicación móvil para monitoreo de salud con IA diagnóstica',
      estado: 'en pausa',
      tecnologias: ['React Native', 'Firebase', 'TensorFlow Lite'],
      imagen: 'assets/project3.svg',
      fechaInicio: '2023-02-15'
    },
    {
      id: '4',
      nombre: 'Chatbot Inteligente',
      descripcion: 'Asistente virtual con procesamiento de lenguaje natural avanzado',
      estado: 'pendiente',
      tecnologias: ['Python', 'OpenAI GPT', 'FastAPI', 'Redis'],
      imagen: 'assets/project4.svg'
    }
  ];

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    // In a real application, this would make an HTTP request to your API
    // return this.http.get<Project[]>('/api/projects');
    
    // For now, returning mock data
    return of(this.projects);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }
}
