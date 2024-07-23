import { MongoClient, ObjectId } from 'mongodb';
import { GridFSBucket } from 'mongodb';
import multer from 'multer';
import { Readable } from 'stream';
import nextConnect from 'next-connect';
import { getAuth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import Document from '../../../models/document.model'; // Adjust the path as necessary

const uri = process.env.MONGODB_URI;

// Extract database name from the MongoDB URI
const dbName = new URL(uri).pathname.substr(1);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.use(async (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).end("Unauthorized");
  }
  req.userId = userId;
  next();
});

handler.get(async (req, res) => {
  const { id } = req.query;

  if (id) {
    // Streaming a specific file
    try {
      await client.connect();
      const db = client.db(dbName);
      const bucket = new GridFSBucket(db);

      const document = await Document.findOne({ _id: id, uploader: req.userId });
      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      const downloadStream = bucket.openDownloadStream(document.gridFSId);

      res.setHeader('Content-Type', document.mimeType);
      res.setHeader('Content-Disposition', `inline; filename="${document.originalName}"`);

      downloadStream.pipe(res);
    } catch (error) {
      console.error('Error streaming document:', error);
      res.status(500).json({ error: 'Error streaming document' });
    } finally {
      await client.close();
    }
  } else {
    // Fetching all documents
    try {
      const documents = await Document.find({ uploader: req.userId }).exec();
      res.json(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ error: 'Error fetching documents' });
    }
  }
});

handler.post(multer().single('file'), async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db);

    const file = req.file;
    const fileStream = Readable.from(file.buffer);
    const uploadStream = bucket.openUploadStream(file.originalname);

    fileStream.pipe(uploadStream);

    uploadStream.on('error', () => {
      res.status(500).json({ error: 'Error uploading to GridFS' });
    });

    uploadStream.on('finish', async () => {
      const document = new Document({
        filename: uploadStream.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        uploader: req.userId,
        gridFSId: uploadStream.id,
      });

      try {
        await document.save();
        res.status(200).json(document);
      } catch (error) {
        console.error('Error saving document to MongoDB:', error);
        res.status(500).json({ error: 'Error saving document information' });
      }
    });
  } catch (error) {
    console.error('Error in file upload:', error);
    res.status(500).json({ error: 'Error processing file upload' });
  } finally {
    await client.close();
  }
});

handler.delete(async (req, res) => {
  const { id } = req.query;

  try {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db);

    const document = await Document.findOne({ _id: id, uploader: req.userId });
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    await bucket.delete(document.gridFSId);
    await Document.deleteOne({ _id: id });

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Error deleting document' });
  } finally {
    await client.close();
  }
});

export default handler;