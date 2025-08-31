import { type Analytics, type InsertAnalytics, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Analytics methods
  trackPageView(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalyticsSummary(): Promise<{
    todayVisits: number;
    totalVisits: number;
    formSubmissions: number;
  }>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private analytics: Map<string, Analytics>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.analytics = new Map();
    this.contacts = new Map();
  }

  async trackPageView(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = randomUUID();
    const analytics: Analytics = {
      ...insertAnalytics,
      id,
      timestamp: new Date(),
    };
    this.analytics.set(id, analytics);
    return analytics;
  }

  async getAnalyticsSummary(): Promise<{
    todayVisits: number;
    totalVisits: number;
    formSubmissions: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayVisits = Array.from(this.analytics.values()).filter(
      (a) => a.timestamp >= today
    ).length;
    
    const totalVisits = this.analytics.size;
    const formSubmissions = this.contacts.size;

    return {
      todayVisits,
      totalVisits,
      formSubmissions,
    };
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      timestamp: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }
}

export const storage = new MemStorage();
