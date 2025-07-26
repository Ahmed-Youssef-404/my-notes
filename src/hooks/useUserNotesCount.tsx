import { useEffect, useState } from "react";
import { numOfUserNotes } from "../services/notesService";

const useUserNotesCount = () => {

    const [userNotesCount, setUserNotesCount] = useState<number>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                setLoading(true);
                const total = await numOfUserNotes();
                setUserNotesCount(Number(total));
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCount();
    }, []);

    return { userNotesCount, loading, error };
};

export default useUserNotesCount;
