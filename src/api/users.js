import axios from "axios";

const users = {
    getList: async ({ page, topic_id, role }) => {
        let params = {
            page: page,
            timestamp: new Date().getTime(),
        };

        if (!!topic_id) params.user_topic__topic_id = topic_id;
        if (!!role) params.user_topic__role = role;

        let data = await axios.get('/api/users/',
        {
            params: params,
        });

        if (data.status === 200) {
            return { isSuccess: true, data: data.data };
        } 

        return { isSuccess: false, data: null };
    },

    getTopics: async (id) => {
        let data = await axios.get(`/api/users/${id}/get_topics/`);

        if (data.status === 200) {
            return { isSuccess: true, data: data.data };
        } 

        return { isSuccess: false, data: null };
    },

    getUser: async (id, isProfile=false) => {
        let path = isProfile ? `/api/users/profile` : `/api/users/${id}`;

        let data = await axios.get(path);

        if (data.status === 200) {
            return { isSuccess: true, data: data.data };
        } 

        return { isSuccess: false, data: null };
    },

    setTopics: async (id, topics, sum) => {
        let data = await axios.patch(`/api/users/${id}/set_topics/`, { sum: sum, topics: topics });
        
        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };

    },

    updateUser: async (id, payload) => {
        let data = await axios.patch(`/api/users/${id}/`, payload);
        
        if (data.status === 200) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };

    },

    createUser: async ({ email, password, last_name, first_name, middle_name }) => {
        let data = await axios.post('/api/users/',
            {
                email: email,
                password: password, 
                last_name: last_name, 
                first_name: first_name, 
                middle_name: middle_name,
            });
        
        if (data.status === 201) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };

    },

    activateUser: async ({ token }) => {
        let data = await axios.post('/api/users/activate/', {
            token: token
        });

        if (data.status === 204) {
            return { isSuccess:true, data: data.data };
        }

        return { isSuccess: false, data: null };
    }
}

export default users;