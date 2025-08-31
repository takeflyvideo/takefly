import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnalyticsSchema, insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analytics tracking endpoint
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const analyticsData = insertAnalyticsSchema.parse(req.body);
      const result = await storage.trackPageView(analyticsData);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Invalid analytics data" });
    }
  });

  // Get analytics summary for admin dashboard
  app.get("/api/analytics/summary", async (req, res) => {
    try {
      const summary = await storage.getAnalyticsSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to get analytics summary" });
    }
  });

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const result = await storage.createContact(contactData);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  // Get all contacts (admin only)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
