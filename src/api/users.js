import axios from "axios";

const users = {
    getList: async (topic_id=null, role=null, page=1) => {
        let params = {
            page: page
        };

        if (!!topic_id) params.user_topic__topic_id = topic_id;
        if (!!role) params.user_topic__role = role;

        let data = await axios.get('/api/users/',
        {
            params: params,
        });

        if (data.status === 200) {
            return [true, data.data];
        }

        return [false, null];
    },
}

export default users;