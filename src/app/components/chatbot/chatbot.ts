import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatbotConfig } from '../../services/chatbot.service';
import { Subscription } from 'rxjs';

declare global {
  interface Window {
    createChat?: any;
  }
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class ChatbotComponent implements OnInit, OnDestroy {
  config: ChatbotConfig;
  isConfigOpen = false;
  isChatbotLoaded = false;
  isMinimized = true;
  private configSubscription?: Subscription;

  constructor(
    private chatbotService: ChatbotService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.config = this.chatbotService.getCurrentConfig();
  }

  ngOnInit(): void {
    this.configSubscription = this.chatbotService.config$.subscribe(config => {
      this.config = config;
      if (this.isChatbotLoaded && isPlatformBrowser(this.platformId)) {
        this.reinitializeChatbot();
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.loadChatbotScript();
    }
  }

  ngOnDestroy(): void {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  private loadChatbotScript(): void {
    // Load CSS
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load JavaScript module
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      window.createChat = createChat;
      window.dispatchEvent(new CustomEvent('n8nChatLoaded'));
    `;
    document.head.appendChild(script);

    // Listen for script load
    window.addEventListener('n8nChatLoaded', () => {
      this.isChatbotLoaded = true;
      this.initializeChatbot();
    });
  }

  private initializeChatbot(): void {
    if (!window.createChat || !this.config.enabled) return;

    // Clear previous chat instance
    const chatContainer = document.getElementById('n8n-chat');
    if (chatContainer) {
      chatContainer.innerHTML = '';
    }

    try {
      window.createChat({
        webhookUrl: this.config.webhookUrl,
        webhookConfig: {
          method: 'POST',
          headers: {}
        },
        target: '#n8n-chat',
        mode: 'window',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        loadPreviousSession: true,
        metadata: {},
        showWelcomeScreen: false,
        defaultLanguage: 'es',
        initialMessages: this.config.initialMessages,
        i18n: {
          es: {
            title: this.config.title,
            subtitle: this.config.subtitle,
            footer: '',
            getStarted: 'Nueva conversación',
            inputPlaceholder: this.config.inputPlaceholder,
          },
        },
        enableStreaming: false,
      });
    } catch (error) {
      console.error('Error initializing chatbot:', error);
    }
  }

  private reinitializeChatbot(): void {
    this.initializeChatbot();
  }

  toggleChatbot(): void {
    this.isMinimized = !this.isMinimized;
    if (!this.isMinimized && this.isChatbotLoaded && !document.getElementById('n8n-chat')?.innerHTML) {
      this.initializeChatbot();
    }
  }

  toggleConfig(): void {
    this.isConfigOpen = !this.isConfigOpen;
  }

  updateWebhookUrl(url: string): void {
    this.chatbotService.updateConfig({ webhookUrl: url });
  }

  updateTitle(title: string): void {
    this.chatbotService.updateConfig({ title });
  }

  updateSubtitle(subtitle: string): void {
    this.chatbotService.updateConfig({ subtitle });
  }

  updateInputPlaceholder(placeholder: string): void {
    this.chatbotService.updateConfig({ inputPlaceholder: placeholder });
  }

  toggleEnabled(): void {
    this.chatbotService.updateConfig({ enabled: !this.config.enabled });
  }

  addInitialMessage(message: string): void {
    if (message.trim()) {
      const messages = [...this.config.initialMessages, message.trim()];
      this.chatbotService.updateConfig({ initialMessages: messages });
    }
  }

  removeInitialMessage(index: number): void {
    const messages = this.config.initialMessages.filter((_, i) => i !== index);
    this.chatbotService.updateConfig({ initialMessages: messages });
  }

  resetConfig(): void {
    this.chatbotService.resetToDefault();
  }

  testConnection(): void {
    if (!this.config.webhookUrl) {
      alert('Por favor, configura la URL del webhook primero');
      return;
    }

    fetch(this.config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'test connection' })
    })
    .then(response => {
      if (response.ok) {
        alert('✅ Conexión exitosa con n8n');
      } else {
        alert('❌ Error de conexión. Verifica la URL del webhook');
      }
    })
    .catch(error => {
      console.error('Connection test failed:', error);
      alert('❌ Error de conexión. Verifica la URL del webhook y que n8n esté ejecutándose');
    });
  }
}
