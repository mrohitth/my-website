import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // For now, just log the contact form submission
      console.log('Contact form submission:', { name, email, message });
      
      // In a real app, you would send an email or save to database
      res.status(200).json({ success: true, message: 'Message received successfully' });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
