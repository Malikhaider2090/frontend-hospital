import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db'; // Adjust this import based on your database connection logic

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Connect to your database
  const db = await connectToDatabase();

  if (req.method === 'PUT') {
    try {
      const updatedData = req.body; // Ensure this contains the correct fields
      console.log('Updating doctor with ID:', id);
      console.log('Updated data:', updatedData);
      const result = await db.collection('doctors').updateOne(
        { _id: id }, // Adjust based on your database structure
        { $set: updatedData }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Doctor not found or no changes made' });
      }

      return res.status(200).json({ message: 'Doctor updated successfully' });
    } catch (error) {
      console.error('Error updating doctor:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
} 