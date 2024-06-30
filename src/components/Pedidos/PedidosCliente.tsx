import React, { useEffect, useState } from "react";
import { useAuth } from "../ControlAcceso/AuthContext";
import { Pedido } from "../../types/Pedido";
import { getPedidosByClienteId } from "../../services/ClienteService";
import { format } from "date-fns";
import { Box, Button, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Estado } from "../../types/enums/Estado";
import { descargarFactura } from "../../services/PedidoService";
import PedidoEnCursoDialog from './PedidoEnCursoDialog'; // Ajusta la ruta según la estructura de tu proyecto

const PedidosCliente: React.FC = () => {
    const { cliente } = useAuth();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [pedidoDetalleVisible, setPedidoDetalleVisible] = useState<number | null>(null);
    const [filtroFecha, setFiltroFecha] = useState<string>("");
    const [filtroCodigo, setFiltroCodigo] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null); // Nuevo estado para el pedido seleccionado

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                if (cliente?.id) {
                    const pedidosByCliente = await getPedidosByClienteId(cliente.id);
                    setPedidos(pedidosByCliente);
                }
            } catch (error) {
                console.error("Error al obtener los pedidos:", error);
            }
        };
        fetchPedidos();
    }, [cliente]);

    const togglePedidoDetalle = (pedidoId: number) => {
        if (pedidoDetalleVisible === pedidoId) {
            setPedidoDetalleVisible(null);
        } else {
            setPedidoDetalleVisible(pedidoId);
        }
    };

    const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltroFecha(event.target.value);
    };

    const handleCodigoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltroCodigo(event.target.value);
    };

    const handleAbrirDialog = (pedido: Pedido) => {
        setPedidoSeleccionado(pedido);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setPedidoSeleccionado(null);
    };

    return (
        <Box p={3}>
            <Box mb={4}>
                <Typography variant="h4" gutterBottom>
                    Pedidos de {cliente?.nombre}
                </Typography>

                <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                        id="filtro-fecha"
                        label="Filtrar por Fecha"
                        variant="outlined"
                        size="small"
                        value={filtroFecha}
                        onChange={handleFechaChange}
                        style={{ marginRight: 10 }}
                    />
                    <TextField
                        id="filtro-codigo"
                        label="Filtrar por Código"
                        variant="outlined"
                        size="small"
                        value={filtroCodigo}
                        onChange={handleCodigoChange}
                    />
                </Box>

                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: 8,
                        width: "100%",
                        marginTop: 2,
                        bgcolor: "#eee",
                        boxShadow: 2,
                        maxHeight: '74vh',
                        overflow: 'auto',
                    }}
                >
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead sx={{ bgcolor: "#aaa" }}>
                            <TableRow>
                                <TableCell align="center">Código</TableCell>
                                <TableCell align="center">Total</TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Tipo Envío</TableCell>
                                <TableCell align="center">Fecha</TableCell>
                                <TableCell align="center">Detalles</TableCell>
                                <TableCell align="center">Operaciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pedidos.map((pedido) => (
                                <React.Fragment key={pedido.id}>
                                    <TableRow>
                                        <TableCell align="center">{pedido.id}</TableCell>
                                        <TableCell align="center">${pedido.total}</TableCell>
                                        <TableCell align="center">{pedido.estado}</TableCell>
                                        <TableCell align="center">{pedido.tipoEnvio}</TableCell>
                                        <TableCell align="center">{format(new Date(pedido.fechaPedido), "dd/MM/yyyy")}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => togglePedidoDetalle(pedido.id)}
                                            >
                                                {pedidoDetalleVisible === pedido.id ? (
                                                    <KeyboardArrowUp />
                                                ) : (
                                                    <KeyboardArrowDown />
                                                )}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="center">
                                            {pedido.estado !== Estado.FACTURADO && (
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleAbrirDialog(pedido)}
                                                >
                                                    Ver Estado
                                                </Button>
                                            )}
                                            {pedido.estado === Estado.FACTURADO && (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => descargarFactura(pedido)}
                                                    style={{ marginLeft: 8 }}
                                                >
                                                    Descargar factura
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                                            <Collapse
                                                in={pedidoDetalleVisible === pedido.id}
                                                timeout="auto"
                                                unmountOnExit
                                            >
                                                <Box margin={1}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        Detalles del Pedido
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>Nombre Cliente:</TableCell>
                                                                <TableCell>{pedido.cliente.nombre} {pedido.cliente.apellido}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Dirección:</TableCell>
                                                                <TableCell>{pedido.domicilio.calle} {pedido.domicilio.numero},
                                                                    {pedido.domicilio.localidad.nombre},
                                                                    {pedido?.domicilio?.localidad?.provincia?.nombre}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Artículos:</TableCell>
                                                                <TableCell>
                                                                    <Table size="small" aria-label="detalle-pedido">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>Denominación</TableCell>
                                                                                <TableCell>Cantidad</TableCell>
                                                                                <TableCell>Precio Unitario</TableCell>
                                                                                <TableCell>Sub-Total</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {pedido.pedidoDetalles.map((detalle) => (
                                                                                <TableRow key={detalle.articulo.id}>
                                                                                    <TableCell>{detalle.articulo.denominacion}</TableCell>
                                                                                    <TableCell>{detalle.cantidad}</TableCell>
                                                                                    <TableCell>${detalle.articulo.precioVenta}</TableCell>
                                                                                    <TableCell>${detalle.articulo.precioVenta * detalle.cantidad}</TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                            <TableRow>
                                                                                <TableCell />
                                                                                <TableCell />
                                                                                <TableCell>Total:</TableCell>
                                                                                <TableCell>${pedido.total}</TableCell>
                                                                            </TableRow>
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Dialog para mostrar el estado del pedido */}
            <PedidoEnCursoDialog open={dialogOpen} onClose={handleCloseDialog} pedido={pedidoSeleccionado} />
        </Box>
    );
};

export default PedidosCliente;
