import axios from "axios";

const predictFruit = async (formData: any) => {
  const result = await axios.post("http://19b06e3153ee.ngrok.io", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return result.data;
};

export default predictFruit;
