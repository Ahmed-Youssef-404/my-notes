import { useEffect, useState } from "react";
import { numOfTagNotes } from "../services/notesService";

const useTagNotesCount = (tag_id: string) => {

    const [tagNotesCount, setTagNotesCount] = useState<number>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                setLoading(true);
                const total = await numOfTagNotes(tag_id);
                setTagNotesCount(Number(total));
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCount();
    }, []);

    return { tagNotesCount, loading, error };
};

export default useTagNotesCount;
