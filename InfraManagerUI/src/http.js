import axios from "axios";

// Настройка axios для работы с куки
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:49744/";
// axios.defaults.baseURL = window.location.origin;
