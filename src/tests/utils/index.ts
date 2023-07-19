import axios from 'axios';

export const fetchUserData = async (userId: string) => {
  const endPoint = `https://jsonplaceholder.typicode.com/todos/${userId}`;
  const res = await axios.get(endPoint);
  return res.data;
};
