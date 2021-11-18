import axios from "axios";

//const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const BASE_URL = "https://tombal-chores.herokuapp.com/api/v1"

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ChoresApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${ChoresApi.token}` };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    };

    /////TEAM
    /** Get the current user. */
    static async getCurrentTeam(id) {
        let res = await this.request(`teams/${id}`);
        return res.data;
    };

    /////USERS
    /** Get the current user. */
    static async getCurrentUser(id) {
        let res = await this.request(`users/${id}`);
        return res.data;
    };

    /** Update users points. */
    static async updateUserPoints(id, data) {
        let res = await this.request(`users/points/${id}`, { ...data }, "patch");
        return res.data;
    };


    /** Get rewards fileted by team */
    static async getAllTeamUsers() {
        let res = await this.request(`users/`);
        return res.data;
    };

    /////CHORES
    /** Get chores filtered by team */
    static async getTeamChores() {
        let res = await this.request(`chores`);
        return res.data;
    };

    /** Get chores filtered by team */
    static async getCurrentUserChores(userId) {
        let res = await this.request(`chores/user/${userId}`);
        return res.data;
    };

    /** Get chores filtered by team */
    static async getCurrentUnclaimedChores() {
        let res = await this.request(`chores/unclaimed`);
        return res.data;
    };

    /** Get chores filtered by team */
    static async createChore(data) {
        let res = await this.request(`chores/`, { ...data }, "post");
        return res.chores;
    };

    /** Get chores filtered by team */
    static async getChore(id) {
        let res = await this.request(`chores/${id}`);
        return res.data;
    };

    /** Update chore status **/
    static async updateChoreStatus(id, data) {
        let res = await this.request(`chores/status/${id}`, { ...data }, "patch");
        return res.data;
    };

    /** Update chore status **/
    static async updateChore(id, data) {
        let res = await this.request(`chores/${id}`, { ...data }, "patch");
        return res.data;
    };

    /////CHORE COMMENTS
    static async getChoreComments(id) {
        let res = await this.request(`comments/chore/${id}`);
        return res.data;
    }

    static async postChoreComment(id, data) {
        let res = await this.request(`comments/chore/${id}`, { ...data }, "post");
        return res.data;
    }

    //////REWARDS
    /** Get rewards fileted by team */
    static async getTeamRewards() {
        let res = await this.request(`rewards`);
        return res;
    };

    static async createReward(data) {
        let res = await this.request(`rewards`, { ...data }, "post");
        return res;
    };

    /** Get rewards fileted by team */
    static async getReward(id) {
        let res = await this.request(`rewards/${id}`);
        console.log("get reward", res.data)
        return res.data;
    };

    /** Get rewards fileted by team */
    static async getCurrentUserRewards(userId) {
        let res = await this.request(`rewards/user/${userId}`);
        return res.data;
    };

    /** Update chore status **/
    static async updateRewardStatus(id, data) {
        let res = await this.request(`rewards/status/${id}`, { ...data }, "patch");
        return res.data;
    };

    ///////Auth API

    /** Get token for login from username and password */
    static async login(data) {
        let res = await this.request("auth/token", data, "post");
        return res.token;
    };

    /** Signup for site */
    static async signup(data) {
        let res = await this.request("auth/register", data, "post");
        return res.token;
    };

    /** Create a Team */
    static async createTeam(data) {
        let res = await this.request("auth/create-team", data, "post");
        console.log(res.token)
        return res.token;
    };

    /** Join a team */
    static async joinTeam(data) {
        let res = await this.request("auth/join-team", data, "post");
        return res.token;
    };


    /** Save user profile */
    static async saveProfile(userId, data) {
        let res = await this.request(`users/${userId}`, data, "patch");
        return res.user;
    };
};



export default ChoresApi;
