"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Eye, EyeOff, UserPlus } from "lucide-react";
import { Role } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DialogAddUser = () => {
  const [selectedRol, setSelectedRol] = useState<Role>(Role.ESTUDIANTE);
  const [isOpen, setIsOpen] = useState(false);
  const initialFormData = {
    name: "",
    email: "",
    dni: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "ESTUDIANTE",
    accountStatus: true,
  };
  const [formData, setFormData] = useState(initialFormData);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo usuario:", formData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Agregar Usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agregar Usuario</DialogTitle>
          <DialogDescription>
            Completa los datos para registrar un nuevo usuario en el sistema
            académico.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Ej: Juan Pérez"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ej: juan@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dni">DNI</Label>
              <Input
                id="dni"
                placeholder="Ej: 12345678"
                value={formData.dni}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                placeholder="Ej: +54 381 1234567"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              placeholder="Ej: Av. Siempre Viva 742"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative flex items-center">
              <Input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {isPasswordVisible ? (
                <EyeOff
                  className="absolute top-3 right-3 h-4 w-4 cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <Eye
                  className="top- absolute right-3 h-4 w-4 cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
            <div className="relative flex items-center">
              <Input
                id="confirmPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {isConfirmPasswordVisible ? (
                <EyeOff
                  className="absolute top-3 right-3 h-4 w-4 cursor-pointer"
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              ) : (
                <Eye
                  className="absolute top-3 right-3 h-4 w-4 cursor-pointer"
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Elegir rol</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width]"
                  align="start"
                >
                  <DropdownMenuLabel>Rol</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={selectedRol}
                    onValueChange={(e) => setSelectedRol(e as Role)}
                  >
                    {[Role.ESTUDIANTE, Role.ADMIN, Role.PROFESOR].map((rol) => (
                      <DropdownMenuRadioItem key={rol} value={rol}>
                        {rol}{" "}
                        {rol === selectedRol && <Check className="ml-auto" />}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="accountStatus">Estado de cuenta</Label>
            <div className="flex items-center gap-2">
              <Switch
                id="accountStatus"
                checked={formData.accountStatus}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, accountStatus: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="reset"
              onClick={() => {
                setIsOpen(false);
                //resetForm();
                setFormData(initialFormData);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
