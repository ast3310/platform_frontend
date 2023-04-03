import axios from "axios";

const chat = {
    getMessagesList: async (taskId, page=1) => {
        let params = {
            page: page
        };


        let data = await axios.get(`/api/chat/messages/${taskId}/`,
        {
            params: params,
        });

        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };
    },
}

export default chat;