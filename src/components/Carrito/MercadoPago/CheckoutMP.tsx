import { useEffect, useState } from "react";
import PreferenceMP from "../../../types/PreferenceMP";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { createPreferenceMP } from "../../../services/MercadoPagoService";
import { Pedido } from "../../../types/Pedido";

interface CheckoutMPProps {
    montoCarrito: number;
    pedido: Pedido;
    onPagoCompleto?: () => void; // Esta función es opcional
}

function CheckoutMP({ montoCarrito, pedido }: CheckoutMPProps) {
    const [idPreference, setIdPreference] = useState<string>('');

    // Public Key, generalmente utilizada en el frontend
    useEffect(() => {
        initMercadoPago('TEST-18c092bd-f68f-451d-a689-08da4f78d7d3', { locale: 'es-AR' });

        // Obtener la preferencia de Mercado Pago al cargar el componente
        const fetchPreferenceMP = async () => {
            try {
                const response: PreferenceMP = await createPreferenceMP(pedido);
                console.log("Preference id: " + response.id);
                if (response) {
                    setIdPreference(response.id);
                } else {
                    alert("Agregue al menos un artículo al carrito");
                }
            } catch (error) {
                console.error("Error al obtener la preferencia de Mercado Pago:", error);
                alert("Hubo un error al obtener la preferencia de Mercado Pago");
            }
        };

        // Llamar a la función para obtener la preferencia de Mercado Pago
        fetchPreferenceMP();
    }, [pedido]); // Dependencia de useEffect para asegurar que se actualice cuando cambia el pedido

    // Si el carrito está vacío, no renderizar el botón
    if (montoCarrito === 0) {
        return null;
    }

    // redirectMode es optativo y puede ser self, blank o modal
    return (
        <div>
            <div className={idPreference ? 'divVisible' : 'divInvisible'}>
                <Wallet initialization={{ preferenceId: idPreference, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
            </div>
        </div>
    );
}

export default CheckoutMP;
