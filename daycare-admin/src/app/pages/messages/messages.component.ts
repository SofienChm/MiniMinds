import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Message {
  id: number;
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isSentByMe: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Parent' | 'Teacher' | 'Admin';
  profilePicture?: string;
}

interface Conversation {
  id: number;
  user: User;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  conversations: Conversation[] = [];
  filteredConversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  searchTerm = '';
  
  // User search functionality
  users: User[] = [];
  filteredUsers: User[] = [];
  userSearchTerm = '';
  showUserDropdown = false;
  
  newMessageContent = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadConversations();
    this.loadUsers();
  }

  loadConversations(): void {
    this.http.get<any[]>(`${environment.apiUrl}/messages/conversations`).subscribe({
      next: (data) => {
        this.conversations = data.map(conv => ({
          id: conv.userId,
          user: {
            id: conv.user.id,
            name: conv.user.firstName + ' ' + conv.user.lastName,
            email: conv.user.email,
            role: 'Admin' as 'Parent' | 'Teacher' | 'Admin'
          },
          lastMessage: conv.lastMessage.content,
          lastMessageTime: new Date(conv.lastMessage.sentAt),
          unreadCount: conv.unreadCount,
          messages: []
        }));
        this.filteredConversations = this.conversations;
      },
      error: (error) => {
        console.error('Error loading conversations:', error);
        // Fallback to empty state when API is not available
        this.conversations = [];
        this.filteredConversations = [];
      }
    });
  }

  loadUsers(): void {
    this.http.get<any[]>(`${environment.apiUrl}/messages/users`).subscribe({
      next: (data) => {
        this.users = data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as 'Parent' | 'Teacher' | 'Admin'
        }));
        this.filteredUsers = this.users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        // Fallback to sample users when API is not available
        this.users = [
          { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@daycare.com', role: 'Teacher' },
          { id: 2, name: 'Michael Davis', email: 'michael.davis@daycare.com', role: 'Teacher' },
          { id: 3, name: 'Lisa Brown', email: 'lisa.brown@parent.com', role: 'Parent' }
        ];
        this.filteredUsers = this.users;
      }
    });
  }

  filterConversations(): void {
    if (!this.searchTerm) {
      this.filteredConversations = this.conversations;
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredConversations = this.conversations.filter(conv =>
      conv.user.name.toLowerCase().includes(term) ||
      conv.lastMessage.toLowerCase().includes(term)
    );
  }

  searchConversations(): void {
    this.filterConversations();
  }

  selectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
    this.loadConversationMessages(conversation.user.id.toString());
  }

  loadConversationMessages(userId: string): void {
    this.http.get<any[]>(`${environment.apiUrl}/messages/conversation/${userId}`).subscribe({
      next: (messages) => {
        if (this.selectedConversation) {
          this.selectedConversation.messages = messages.map(msg => ({
            id: msg.id,
            sender: msg.sender?.firstName + ' ' + msg.sender?.lastName || 'Unknown',
            recipient: msg.recipient?.firstName + ' ' + msg.recipient?.lastName || 'Unknown',
            content: msg.content,
            timestamp: new Date(msg.sentAt),
            isRead: msg.isRead,
            isSentByMe: msg.senderId === 'admin@daycare.com'
          }));
        }
      },
      error: (error) => {
        console.error('Error loading messages:', error);
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessageContent.trim() || !this.selectedConversation) {
      return;
    }

    const messageData = {
      recipientId: this.selectedConversation.user.id.toString(),
      content: this.newMessageContent
    };

    this.http.post<any>(`${environment.apiUrl}/messages`, messageData).subscribe({
      next: (response) => {
        // Reload conversation messages
        this.loadConversationMessages(this.selectedConversation!.user.id.toString());
        
        // Update conversation list
        this.selectedConversation!.lastMessage = this.newMessageContent;
        this.selectedConversation!.lastMessageTime = new Date();
        
        this.newMessageContent = '';
      },
      error: (error) => {
        console.error('Error sending message:', error);
        alert('Failed to send message');
      }
    });
  }

  startNewConversation(user: User): void {
    // Check if conversation already exists
    const existingConv = this.conversations.find(conv => conv.user.id === user.id);
    if (existingConv) {
      this.selectedConversation = existingConv;
      this.showUserDropdown = false;
      this.userSearchTerm = '';
      return;
    }

    // Create new conversation
    const newConversation: Conversation = {
      id: Date.now(),
      user: user,
      lastMessage: 'Start a conversation...',
      lastMessageTime: new Date(),
      unreadCount: 0,
      messages: []
    };

    this.conversations.unshift(newConversation);
    this.filteredConversations = this.conversations;
    this.selectedConversation = newConversation;
    this.showUserDropdown = false;
    this.userSearchTerm = '';
  }

  formatTimestamp(timestamp: Date): string {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString();
    }
  }

  getTotalUnreadCount(): number {
    return this.conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  }

  // User search methods
  searchUsers(): void {
    if (!this.userSearchTerm.trim()) {
      this.filteredUsers = this.users;
      return;
    }
    const term = this.userSearchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  onUserSearchFocus(): void {
    this.showUserDropdown = true;
    this.searchUsers();
  }

  onUserSearchInput(): void {
    this.searchUsers();
    this.showUserDropdown = this.userSearchTerm.length > 0;
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case 'Teacher': return 'fas fa-chalkboard-teacher';
      case 'Parent': return 'fas fa-user-friends';
      default: return 'fas fa-user';
    }
  }
}