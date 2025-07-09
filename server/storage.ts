import { 
  users, 
  waitlistSignups, 
  contactMessages,
  type User, 
  type InsertUser,
  type WaitlistSignup,
  type InsertWaitlistSignup,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlistSignup(signup: InsertWaitlistSignup): Promise<WaitlistSignup>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getWaitlistSignups(): Promise<WaitlistSignup[]>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlistSignups: Map<number, WaitlistSignup>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentWaitlistId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.waitlistSignups = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentWaitlistId = 1;
    this.currentContactId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWaitlistSignup(insertSignup: InsertWaitlistSignup): Promise<WaitlistSignup> {
    const id = this.currentWaitlistId++;
    const signup: WaitlistSignup = { 
      ...insertSignup, 
      id,
      createdAt: new Date()
    };
    this.waitlistSignups.set(id, signup);
    return signup;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getWaitlistSignups(): Promise<WaitlistSignup[]> {
    return Array.from(this.waitlistSignups.values());
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
