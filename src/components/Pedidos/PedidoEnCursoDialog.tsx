import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Typography } from '@mui/material';
import { Pedido } from '../../types/Pedido';
import { Estado } from '../../types/enums/Estado';

interface PedidoEnCursoDialogProps {
  open: boolean;
  onClose: () => void;
  pedido: Pedido | null;
}

const PedidoEnCursoDialog: React.FC<PedidoEnCursoDialogProps> = ({ open, onClose, pedido }) => {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pedido?.estado === Estado.EN_DELIVERY) {
        setProgreso(100); // Si está en estado EN_DELIVERY, establece el progreso al 100%
      } else {
        setProgreso((prevProgreso) => prevProgreso + 20); // Simulación de progreso para otros estados
      }
    }, 1000); // Simula progreso cada segundo

    return () => clearInterval(interval);
  }, [pedido?.estado]);

  const renderEstadoPedido = () => {
    switch (pedido?.estado) {
      case Estado.PENDIENTE:
        return (
          <div>
            <Typography variant="h5">Pedido Pendiente</Typography>
            <CircularProgress variant="determinate" value={progreso} />
          </div>
        );
      case Estado.PREPARACION:
        return (
          <div>
            <Typography variant="h5">Pedido en Preparación</Typography>
            <CircularProgress variant="determinate" value={progreso} />
          </div>
        );
      case Estado.LISTO_PARA_ENTREGA:
        return (
          <div>
            <Typography variant="h5">Pedido Listo para Entrega</Typography>
            <CircularProgress variant="determinate" value={progreso} />
          </div>
        );
      case Estado.EN_DELIVERY:
        return (
          <div>
            <Typography variant="h5">Pedido en Delivery</Typography>
            <CircularProgress variant="determinate" value={progreso} />
          </div>
        );
      case Estado.ENTREGADO:
        return (
          <div>
            <Typography variant="h5">Pedido Entregado</Typography>
            <Typography variant="subtitle1">¡Gracias por tu compra!</Typography>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Estado del Pedido</DialogTitle>
      <DialogContent>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {renderEstadoPedido()}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PedidoEnCursoDialog;
