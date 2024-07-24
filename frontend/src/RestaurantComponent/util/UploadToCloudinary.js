// const upload_preset = "fitEats"
// const cloud_name = "dcn4xelie"
// const api_url = "https:/api.cloudinary.com/v1_1/demo/image/upload"

// export const uploadImageToCloudinary = async(file) => {
//     const data = new FormData();
//     data.append("file",file);
//     data.append("upload_preset",upload_preset);
//     data.append("cloud_name",cloud_name);

//     const res = await fetch(api_url, {
//         method:"post",
//         body:data
//     }); 

//     const fileData = await res.json();
//     return fileData.url
// }

const upload_preset = "fitEats";
const cloud_name = "dcn4xelie";
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloudinary = async (file) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(api_url, {
      method: "post",
      body: data
    });

    if (!res.ok) {
      throw new Error('Failed to upload image');
    }

    const fileData = await res.json();
    return fileData.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};


