import { useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../utils";
import { numOfTags } from "../services/tagsService";

const useTagsCount = () => {
    const userData = getDataFromLocalStorage();
    const userId = userData?.id + "";

    const [tagCount, setCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                setLoading(true);
                const total = await numOfTags();
                setCount(Number(total));
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchCount();
    }, [userId]);

    return { tagCount, loading, error };
};

export default useTagsCount;
