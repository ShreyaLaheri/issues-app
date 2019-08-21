import { API, cond, and } from 'space-api';

class Service {
  constructor(projectId, url) {
    this.api = new API(projectId, url);
    this.db = this.api.Mongo();
    this.isLoggedIn = false
  }

  async login(username, pass) {
    // Fire the sign in request
    const res = await this.db.signIn(username, pass);

    // Check if login was successfull
    if (res.status !== 200) {
      return { ack: false };
    }

    // Set the token with the API object for authentication
    this.api.setToken(res.data.token);

    // Store the userId for further operation
    this.userId = res.data.user._id;

    this.isLoggedIn = true;
    return { ack: true };
  }

  async signUp(username, name, pass) {
    // Fire the sign up request
    const res = await this.db.signUp(username, name, pass, 'default');

    // Check if sign up was successfull
    if (res.status !== 200) {
      return { ack: false };
    }

    // Set the token with the API object for authentication
    this.api.setToken(res.data.token);

    // Store the userId for further operation
    this.userId = res.data.user._id;

    this.isLoggedIn = true;
    return { ack: true };
  }

  async addIssue(title, desc, tags) {
    const obj = { _id: this.generateId(), title: title, desc: desc, tags: tags, userId: this.userId }

    // Fire the insert query
    const res = await this.db.insert('issues').doc(obj).apply();

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }

    return { ack: true, doc: obj };
  }

  async deleteIssue(id) {
    const condition = and(cond('_id', '==', id), cond('userId', '==', this.userId));

    // Fire the query to delete the todo
    const res = await this.db.delete('issues').where(condition).apply()

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }
    return { ack: true };
  }

  async getIssues() {
    const condition = cond('userId', '==', this.userId);

    // Fire the query to get the issues
    const res = await this.db.get('issues').where(condition).apply()

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }

    return { ack: true, issues: res.data.result };
  }

  async searchIssue(value){
    const condition = cond('tags', '==', value);

    const res = await this.db.get('issues').where(condition).apply()

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }
    return { ack: true, issues: res.data.result };
  }

  generateId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
}

export default Service