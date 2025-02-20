import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/index';
import { machinesTable } from '@/db/schema';
import { MachinesRequest } from '@/models/machine.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const orders = await db.select().from(machinesTable);
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching machines:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;

      if (!Array.isArray(body)) {
        return res.status(400).json({ message: 'Request body must be an array' });
      }

      // Validate each order in the array
      const machines: MachinesRequest[] = body;
      if (!machines.every(machine => 
        typeof machine === 'object' && 
        machine !== null
      )) {
        return res.status(400).json({ message: 'Invalid machine format' });
      }

      const mappedMachines = machines.map(machine => ({
        lat: machine.lat.toString(),
        long: machine.long.toString(),
        name: machine.name,
        version: machine.version,
      }));

      // Ensure lat and long are floats
      const result = await db.insert(machinesTable).values(mappedMachines);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error creating orders:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}