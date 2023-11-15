import { useMemo } from "react";
import { useRouter } from 'next/router';

const useChat = () => {
    const router = useRouter();

    const chatID = useMemo(() => {
        if (!router.query?.chatID) {
            return '';
        }

        return router.query.chatID;
    }, [router.query?.chatID]);

    const isOpen = useMemo(() => !!chatID, [chatID]);

    return useMemo(() => ({
        isOpen,
        chatID
    }), [isOpen, chatID]);
};

export default useChat;