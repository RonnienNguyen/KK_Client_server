module.exports = {
  getToken: () => {
    try {
      return JSON.parse(localStorage.getItem("token"));
    } catch (error) {
      console.log(error);
    }
  },
};
