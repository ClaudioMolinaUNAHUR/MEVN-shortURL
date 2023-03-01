import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", () => {
  //variables de interpolacion
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      localStorage.setItem('user', "usuario Logeado")
      setTime();
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  };
  const register = async (email, password, repassword) => {
    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        repassword
      });
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      localStorage.setItem('user', "usuario Logeado")
      setTime();
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      localStorage.removeItem('user')
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
    }
  };
  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expiresIn.value * 1000 - 6000);
  };

  const refreshToken = async () => {
    console.log("refreshToken");
    try {
      const res = await api.get("/auth/refresh");
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      setTime();
    } catch (error) {
      if(error == 'Error: Request failed with status code 401') return console.log('Cliente no autorizado');
    }
  };
  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };
  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
    register
  };
});
