"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/basic/button"
import { Input } from "@/components/ui/basic/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/basic/table"

interface Machine {
  id: number
  lat: number
  long: number
  name: string
  version: string
}

export default function MachineManagement() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [newMachine, setNewMachine] = useState({
    lat: "",
    long: "",
    name: "",
    version: "",
  })

  useEffect(() => {
    fetchMachines()
  }, [])

  const fetchMachines = async () => {
    try {
      const response = await fetch("/api/machines")
      const data = await response.json()
      setMachines(data)
    } catch (error) {
      console.error("Error fetching machines:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMachine({
      ...newMachine,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    try {
      await fetch("/api/machines", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          lat: newMachine.lat,
          long: newMachine.long,
          name: newMachine.name,
          version: parseInt(newMachine.version),
        }]),
      })
      setNewMachine({ lat: "", long: "", name: "", version: "" })
      fetchMachines()
    } catch (error) {
      console.error("Error adding machine:", error)
    }
  }

  const openInGoogleMaps = (lat: number, long: number) => {
    const url = `https://www.google.com/maps?q=${lat},${long}`
    window.open(url, '_blank')
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Latitude"
          name="lat"
          value={newMachine.lat}
          onChange={handleInputChange}
          type="number"
          step="0.000001"
        />
        <Input
          placeholder="Longitude"
          name="long"
          value={newMachine.long}
          onChange={handleInputChange}
          type="number"
          step="0.000001"
        />
        <Input
          placeholder="Name"
          name="name"
          value={newMachine.name}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Version"
          name="version"
          value={newMachine.version}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit}>Add Machine</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {machines.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell>{machine.id}</TableCell>
              <TableCell>{machine.lat}</TableCell>
              <TableCell>{machine.long}</TableCell>
              <TableCell>{machine.name}</TableCell>
              <TableCell>{machine.version}</TableCell>
              <TableCell>
                <Button onClick={() => openInGoogleMaps(machine.lat, machine.long)}>
                  Open in Google Maps
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}