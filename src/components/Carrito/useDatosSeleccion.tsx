import { useEffect, useState } from 'react';
import { Sucursal } from '../../types/Sucursal';
import { Cliente } from '../../types/Cliente';
import { TipoEnvio } from '../../types/enums/TipoEnvio';
import { FormaPago } from '../../types/enums/FormaPago';
import { Domicilio } from '../../types/Domicilio';
import { Empleado } from '../../types/Empleado';
import { getSucursales } from '../../services/SucursalService';
import { getClientes } from '../../services/ClienteService';
import { obtenerPrimerEmpleado } from '../../services/EmpleadoService';

export function useDatosSeleccion() {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tipoEnvio, setTipoEnvio] = useState<TipoEnvio>(TipoEnvio.DELIVERY);
  const [formaPago, setFormaPago] = useState<FormaPago>(FormaPago.EFECTIVO);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<Sucursal | null>(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [domicilioSeleccionado, setDomicilioSeleccionado] = useState<Domicilio | null>(null);
  const [empleado, setEmpleado] = useState<Empleado | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const sucursalesData = await getSucursales();
      const clientesData = await getClientes();
      const empleadoData = await obtenerPrimerEmpleado();  // Obtener el empleado
      setSucursales(sucursalesData);
      setClientes(clientesData);
      setEmpleado(empleadoData);  // Establecer el empleado
    };

    fetchData();
  }, []);

  return {
    sucursales,
    clientes,
    tipoEnvio,
    setTipoEnvio,
    formaPago,
    setFormaPago,
    sucursalSeleccionada,
    setSucursalSeleccionada,
    clienteSeleccionado,
    setClienteSeleccionado,
    domicilioSeleccionado,
    setDomicilioSeleccionado,
    empleado  // Devolver el empleado
  };
}

export default useDatosSeleccion;
