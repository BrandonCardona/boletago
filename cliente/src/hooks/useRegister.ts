import { useState } from "react";
import type { RegisterProps } from "../models/user";
import { registerUser } from "../services/auth";

export const useRegister = () => {
    const [data, setData] = useState<RegisterProps | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error>();

    const doRegister = async ({ name, email, password }: RegisterProps) => {
        setIsLoading(true);
        setError(undefined);

        try {
            const response = await registerUser({ name, email, password });
            setData(response);
            return true;
        } catch (err) {
            setError(err as Error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, doRegister };
};
