import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { storage } from '../server/storage';
import { insertWaitlistSignupSchema, insertContactMessageSchema } from '../shared/schema';
import { z } from 'zod';

const app = express();
app.use(express.json());

// Waitlist signup endpoint
app.post('/api/waitlist', async (req, res) => {
  try {
    const validatedData = insertWaitlistSignupSchema.parse(req.body);
    
    // Check if email already exists
    const existingSignups = await storage.getWaitlistSignups();
    const existingSignup = existingSignups.find(signup => signup.email === validatedData.email);
    
    if (existingSignup) {
      return res.status(400).json({ message: "Email already registered for waitlist" });
    }

    const signup = await storage.createWaitlistSignup(validatedData);
    res.status(201).json(signup);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid input data", errors: error.errors });
    }
    console.error("Waitlist signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const validatedData = insertContactMessageSchema.parse(req.body);
    const message = await storage.createContactMessage(validatedData);
    res.status(201).json(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid input data", errors: error.errors });
    }
    console.error("Contact message error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get waitlist signups (for admin/testing purposes)
app.get('/api/waitlist', async (req, res) => {
  try {
    const signups = await storage.getWaitlistSignups();
    res.json(signups);
  } catch (error) {
    console.error("Get waitlist error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get contact messages (for admin/testing purposes)
app.get('/api/contact', async (req, res) => {
  try {
    const messages = await storage.getContactMessages();
    res.json(messages);
  } catch (error) {
    console.error("Get contact messages error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};