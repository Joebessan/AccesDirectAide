import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { isAuthenticated } from "./replit_integrations/auth";
import { 
  insertUserProfileSchema, 
  insertAppointmentSchema, 
  insertDocumentSchema,
  insertMessageSchema 
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getUserProfile(userId);
      res.json(profile || null);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post("/api/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertUserProfileSchema.parse({ ...req.body, userId });
      
      const existing = await storage.getUserProfile(userId);
      if (existing) {
        const updated = await storage.updateUserProfile(userId, data);
        return res.json(updated);
      }
      
      const profile = await storage.createUserProfile(data);
      res.status(201).json(profile);
    } catch (error) {
      console.error("Error creating profile:", error);
      res.status(500).json({ message: "Failed to create profile" });
    }
  });

  app.patch("/api/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.updateUserProfile(userId, req.body);
      res.json(profile);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.get("/api/appointments", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const appointments = await storage.getAppointments(userId);
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  app.get("/api/appointments/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const appointment = await storage.getAppointmentById(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      if (appointment.userId !== userId && appointment.professionalId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      res.json(appointment);
    } catch (error) {
      console.error("Error fetching appointment:", error);
      res.status(500).json({ message: "Failed to fetch appointment" });
    }
  });

  app.post("/api/appointments", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertAppointmentSchema.parse({ ...req.body, userId });
      const appointment = await storage.createAppointment(data);
      res.status(201).json(appointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  app.patch("/api/appointments/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const existing = await storage.getAppointmentById(req.params.id);
      if (!existing) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      if (existing.userId !== userId && existing.professionalId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      const appointment = await storage.updateAppointment(req.params.id, req.body);
      res.json(appointment);
    } catch (error) {
      console.error("Error updating appointment:", error);
      res.status(500).json({ message: "Failed to update appointment" });
    }
  });

  app.get("/api/documents", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const documents = await storage.getDocuments(userId);
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.post("/api/documents", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertDocumentSchema.parse({ ...req.body, userId });
      const document = await storage.createDocument(data);
      res.status(201).json(document);
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ message: "Failed to create document" });
    }
  });

  app.patch("/api/documents/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const existing = await storage.getDocumentById(req.params.id);
      if (!existing) {
        return res.status(404).json({ message: "Document not found" });
      }
      if (existing.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      const document = await storage.updateDocument(req.params.id, req.body);
      res.json(document);
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).json({ message: "Failed to update document" });
    }
  });

  app.delete("/api/documents/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const existing = await storage.getDocumentById(req.params.id);
      if (!existing) {
        return res.status(404).json({ message: "Document not found" });
      }
      if (existing.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      await storage.deleteDocument(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ message: "Failed to delete document" });
    }
  });

  app.get("/api/messages", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const messages = await storage.getMessages(userId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertMessageSchema.parse({ ...req.body, senderId: userId });
      const message = await storage.createMessage(data);
      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Failed to create message" });
    }
  });

  app.patch("/api/messages/:id/read", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const messages = await storage.getMessages(userId);
      const message = messages.find(m => m.id === req.params.id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      if (message.receiverId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      await storage.markMessageAsRead(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });

  app.get("/api/help/categories", async (_req, res) => {
    try {
      const categories = await storage.getHelpCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching help categories:", error);
      res.status(500).json({ message: "Failed to fetch help categories" });
    }
  });

  app.get("/api/help/articles", async (req, res) => {
    try {
      const categoryId = req.query.categoryId as string | undefined;
      const articles = await storage.getHelpArticles(categoryId);
      res.json(articles);
    } catch (error) {
      console.error("Error fetching help articles:", error);
      res.status(500).json({ message: "Failed to fetch help articles" });
    }
  });

  app.get("/api/help/articles/:id", async (req, res) => {
    try {
      const article = await storage.getHelpArticleById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      console.error("Error fetching help article:", error);
      res.status(500).json({ message: "Failed to fetch help article" });
    }
  });

  return httpServer;
}
