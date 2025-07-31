import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  tecnologias: string[];
  imagen: string;
  url?: string;
  estado: string;
  fechaInicio?: string;
  fechaFin?: string;
}

export interface ApiResponse {
  success: boolean;
  data: ApiProject[];
  message: string;
}

export interface ApiProject {
  id: number;
  created_at: string;
  project_name: string;
  project_description: string;
  init_date: string;
  end_date: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = 'http://localhost:3001/api/proyectos';

  // Mock data for testing
  private mockProjects: Project[] = [
    {
      id: 1,
      nombre: "Rediseño Web Principal",
      descripcion: "Optimización de la interfaz de usuario y experiencia del cliente para el sitio web principal.",
      tecnologias: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
      imagen: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      estado: "Completado",
      fechaInicio: "2024-02-01T13:00:00+00:00",
      fechaFin: "2024-06-30T21:00:00+00:00"
    },
    {
      id: 2,
      nombre: "Desarrollo App Móvil V2",
      descripcion: "Incorporación de nuevas funcionalidades y mejoras de rendimiento en la aplicación móvil.",
      tecnologias: ["React Native", "TypeScript", "Firebase", "Redux"],
      imagen: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      estado: "En Progreso",
      fechaInicio: "2024-04-10T14:00:00+00:00",
      fechaFin: "2025-01-31T22:00:00+00:00"
    },
    {
      id: 3,
      nombre: "Implementación ERP",
      descripcion: "Migración del sistema de gestión empresarial a una nueva plataforma ERP.",
      tecnologias: ["Java", "Spring Boot", "PostgreSQL", "Angular"],
      imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      estado: "En Pausa",
      fechaInicio: "2024-07-15T12:00:00+00:00",
      fechaFin: "2025-04-30T21:00:00+00:00"
    },
    {
      id: 4,
      nombre: "Campaña Marketing Digital",
      descripcion: "Lanzamiento de una campaña de marketing integral para aumentar la visibilidad de la marca.",
      tecnologias: ["Google Analytics", "Facebook Ads", "SEO", "Content Marketing"],
      imagen: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop",
      estado: "Pendiente",
      fechaInicio: "2024-09-01T13:00:00+00:00",
      fechaFin: "2024-12-15T20:00:00+00:00"
    },
    {
      id: 5,
      nombre: "Migración a la Nube",
      descripcion: "Traslado de la infraestructura y servicios a un entorno de nube AWS.",
      tecnologias: ["AWS", "Docker", "Kubernetes", "Terraform"],
      imagen: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      estado: "En Progreso",
      fechaInicio: "2025-07-20T13:00:00+00:00",
      fechaFin: "2026-03-15T21:00:00+00:00"
    },
    {
      id: 6,
      nombre: "Desarrollo CRM Personalizado",
      descripcion: "Creación de un sistema CRM a medida para gestionar clientes y ventas.",
      tecnologias: ["Python", "Django", "React", "PostgreSQL"],
      imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      estado: "Pendiente",
      fechaInicio: "2025-08-01T14:00:00+00:00",
      fechaFin: "2026-06-30T22:00:00+00:00"
    }
  ];

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    console.log('Fetching projects from API...');
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => {
        console.log('API Response:', response);
        if (response.success && response.data) {
          const mappedProjects = response.data.map(apiProject => this.mapApiProjectToProject(apiProject));
          console.log('Mapped projects:', mappedProjects);
          return mappedProjects;
        }
        console.log('Using mock projects');
        return this.mockProjects;
      }),
      catchError(error => {
        console.warn('API not available, using mock data:', error);
        return of(this.mockProjects);
      })
    );
  }

  private mapApiProjectToProject(apiProject: ApiProject): Project {
    return {
      id: apiProject.id,
      nombre: apiProject.project_name,
      descripcion: apiProject.project_description,
      tecnologias: this.getTechnologiesForProject(apiProject.project_name),
      imagen: this.getImageForProject(apiProject.project_name),
      estado: apiProject.status,
      fechaInicio: apiProject.init_date,
      fechaFin: apiProject.end_date
    };
  }

  private getTechnologiesForProject(projectName: string): string[] {
    const techMap: { [key: string]: string[] } = {
      'Rediseño Web Principal': ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'],
      'Desarrollo App Móvil V2': ['React Native', 'TypeScript', 'Firebase', 'Redux'],
      'Implementación ERP': ['Java', 'Spring Boot', 'PostgreSQL', 'Angular'],
      'Campaña Marketing Digital': ['Google Analytics', 'Facebook Ads', 'SEO', 'Content Marketing'],
      'Actualización Base Datos': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
      'Migración a la Nube': ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      'Desarrollo CRM Personalizado': ['Python', 'Django', 'React', 'PostgreSQL'],
      'Auditoría de Seguridad IT': ['Nessus', 'Wireshark', 'Metasploit', 'Nmap'],
      'Lanzamiento Nuevo Producto': ['Product Management', 'Market Research', 'UX/UI Design'],
      'Optimización de Servidores': ['Linux', 'Docker', 'Nginx', 'Apache'],
      'Capacitación de Empleados': ['Training Platforms', 'Video Conferencing', 'LMS'],
      'Actualización de Sistema Operativo': ['Windows', 'Linux', 'macOS', 'SCCM'],
      'Análisis de Datos Big Data': ['Python', 'Apache Spark', 'Hadoop', 'Tableau'],
      'Desarrollo API Externa': ['Node.js', 'Express', 'Swagger', 'PostgreSQL'],
      'Reestructuración Organizacional': ['Project Management', 'Change Management', 'HR Systems']
    };
    
    return techMap[projectName] || ['Tecnología General'];
  }

  private getImageForProject(projectName: string): string {
    const imageMap: { [key: string]: string } = {
      'Rediseño Web Principal': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'Desarrollo App Móvil V2': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      'Implementación ERP': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'Campaña Marketing Digital': 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop',
      'Actualización Base Datos': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'Migración a la Nube': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'Desarrollo CRM Personalizado': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'Auditoría de Seguridad IT': 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop',
      'Lanzamiento Nuevo Producto': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      'Optimización de Servidores': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'Capacitación de Empleados': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      'Actualización de Sistema Operativo': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'Análisis de Datos Big Data': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'Desarrollo API Externa': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'Reestructuración Organizacional': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
    };
    
    return imageMap[projectName] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop';
  }

  getMockProjects(): Observable<Project[]> {
    return of(this.mockProjects);
  }
} 