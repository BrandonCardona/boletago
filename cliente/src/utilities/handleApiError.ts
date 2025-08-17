import { toast } from "react-toastify";

export interface ApiError {
    status: number;
    message: string;
    fieldErrors?: Record<string, string>;
}

export const handleApiError = (error: unknown): ApiError => {
    let apiError: ApiError = {
        status: 500,
        message: "Los datos no son válidos, inténtelo de nuevo",
    };

    if (typeof error === "object" && error !== null && "response" in error) {
        const e = error as any;
        const status = e.response?.status ?? 500;
        const backendData = e.response?.data;

        let userMessage = "Los datos no son válidos, inténtelo de nuevo";
        let fieldErrors: Record<string, string> = {};

        if (Array.isArray(backendData)) {

            backendData.forEach((item: any) => {
                const field = (item.field || "").toLowerCase();

                if (field === "email") {
                    fieldErrors.email = "El correo no es válido";
                }
                if (field === "password") {
                    fieldErrors.password =
                        "La contraseña debe tener al menos 8 caracteres";
                }
            });

            if (Object.keys(fieldErrors).length > 0) {
                userMessage = Object.values(fieldErrors).join(", ");
            }
        } else if (status === 409) {
            fieldErrors.email = "El correo ya está registrado";
            userMessage = fieldErrors.email;
        }

        apiError = { status, message: userMessage, fieldErrors };
    }

    toast.error(apiError.message);
    return apiError;
};
