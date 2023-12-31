import React, { useState } from "react";
export default function RemoveBg() {
  const [remove, setRemove] = useState<any>();
  const [image, setImage] = useState<any>();

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      console.error("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("image_file", image, image?.name);
    formData.append("size", "auto");
    // console.log(image.name)
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "X-api-key": apiKey,
          //   'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => setRemove(reader.result);
      reader.readAsDataURL(data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(remove)
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              setImage(selectedFile);
            }
          }}
        />
      </div>
      {image && (
        <div>
          <img
            src={image ? URL.createObjectURL(image) : ""}
            alt="my image"
            width={"100px"}
          />
        </div>
      )}

      {remove && <img src={remove} alt="remove bg" />}
      {remove && (
        <a href={remove} download="dipak.png">
          Download
        </a>
      )}
      <div>
        <button type="submit">Remove Background</button>
      </div>
    </form>
  );
}
