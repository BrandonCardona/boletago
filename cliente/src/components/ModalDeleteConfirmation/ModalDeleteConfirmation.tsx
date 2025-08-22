import React, { useEffect } from "react";
import { useModalContext } from "../../Modal/context/ModalContext";
import styles from "../../Modal/Modal.module.css";
import stylesCss from "./ModalDeleteConfirmation.module.css";
import { deleteEvento } from "../../services/eventos";
import { toast } from "react-toastify";

export const ModalDeleteConfirmation: React.FC = () => {
    const { stateDelete, setStateDelete, eventToDelete } = useModalContext();

    useEffect(() => {
        if (eventToDelete) setStateDelete(true);
    }, [eventToDelete, setStateDelete]);

    if (!stateDelete) return null;

    const handleCancel = () => {
        setStateDelete(false);
    };

    const handleConfirm = async () => {
        if (!eventToDelete) return;

        try {
            const result = await deleteEvento(String(eventToDelete));
            if (!result) {
                toast.error("Error al eliminar el evento");
                return;
            }
            toast.success("Evento eliminado");
            window.location.reload();
        } catch (error) {
            toast.error("Hubo un error al eliminar");
        } finally {
            setStateDelete(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={handleCancel}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button onClick={handleCancel} className={styles.close_button}>
                    X
                </button>
                <p>¿Estás seguro de que deseas eliminar este evento?</p>
                <div className={stylesCss.buttonGroup}>
                    <button onClick={handleConfirm} className={stylesCss.buttonConfirm}>
                        Confirmar
                    </button>
                    <button onClick={handleCancel} className={stylesCss.buttonCancel}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};
