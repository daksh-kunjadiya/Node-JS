import { useState } from "react";
import axios from "axios";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !cover) return alert("Please fill all field.");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("cover", cover);
    try {
      await axios.post("http://localhost:5050/books/upload", formData);
      setTitle("");
      setCover(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col  justify-center items-center h-screen">
        <h1>BookForm</h1>
        <form
          className="border-2 border-black flex flex-col p-4"
          onSubmit={handleUpload}
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="add title"
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border-2 p-2"
          />
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => setCover(e.target.files[0])}
            required
            className="btn my-4"
          />
          <button className="btn" type="submit">
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default BookForm;
