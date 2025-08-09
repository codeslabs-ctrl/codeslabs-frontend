import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ChatbotConfig {
  webhookUrl: string;
  enabled: boolean;
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  initialMessages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private defaultConfig: ChatbotConfig = {
    webhookUrl: 'http://localhost:5678/webhook/7d6e3f08-e868-4d95-a148-49933ff1be57/chat',
    enabled: true,
    title: 'Asistente Virtual CodesLabs',
    subtitle: 'Estoy aquí para ayudarte con cualquier consulta sobre nuestros servicios',
    inputPlaceholder: 'Escribe tu pregunta...',
    initialMessages: [
      '¡Hola! 👋',
      '¿Cómo puedo ayudarte hoy?',
      'Puedo responder preguntas sobre nuestros servicios de IA, desarrollo y transformación digital.'
    ]
  };

  private configSubject = new BehaviorSubject<ChatbotConfig>(this.defaultConfig);
  public config$ = this.configSubject.asObservable();

  constructor() {
    // Load config from localStorage if available
    const savedConfig = localStorage.getItem('chatbot-config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        this.configSubject.next({ ...this.defaultConfig, ...parsedConfig });
      } catch (error) {
        console.warn('Error parsing saved chatbot config:', error);
      }
    }
  }

  updateConfig(config: Partial<ChatbotConfig>): void {
    const currentConfig = this.configSubject.value;
    const newConfig = { ...currentConfig, ...config };
    this.configSubject.next(newConfig);
    localStorage.setItem('chatbot-config', JSON.stringify(newConfig));
  }

  getCurrentConfig(): ChatbotConfig {
    return this.configSubject.value;
  }

  resetToDefault(): void {
    this.configSubject.next(this.defaultConfig);
    localStorage.removeItem('chatbot-config');
  }
}
