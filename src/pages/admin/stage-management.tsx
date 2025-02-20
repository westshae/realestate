"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/basic/table";
import { Input } from "@/components/ui/basic/input";
import { Button } from "@/components/ui/basic/button";

interface OrderStage {
  clientId: number;
  id: number;
  stageNumber: number;
  stageMessage: string;
}

export default function StageManagement() {
  const [data, setData] = useState<OrderStage[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const orders: OrderStage[] = await response.json();
      const mappedOrders = orders
        .map(order => ({
        clientId: order.clientId,
        id: order.id,
        stageNumber: order.stageNumber,
        stageMessage: order.stageMessage
        }))
        .sort((a, b) => b.id - a.id);  // Sort in descending order by id
      setData(mappedOrders);
      } catch (error) {
      console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);



  const handleUpdate = (index: number, field: keyof OrderStage, value: string | number) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const handleSave = async (item: OrderStage) => {
    try {
      const requestBody = {
        order_id: item.id,
        stage_number: item.stageNumber,
        stage_message: item.stageMessage
      };

      const response = await fetch('/api/stages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Stage updated successfully');
    } catch (error) {
      console.error('Error updating stage:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Stage Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Stage Number</TableHead>
            <TableHead>Stage Message</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{item.clientId}</TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.stageNumber}
                  onChange={(e) =>
                    handleUpdate(index, "stageNumber", parseInt(e.target.value))
                  }
                  className="w-20"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={item.stageMessage}
                  onChange={(e) =>
                    handleUpdate(index, "stageMessage", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave(item)}
                >
                  Save Changes
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}