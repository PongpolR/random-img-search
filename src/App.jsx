import { useEffect, useState } from "react";
import "./App.css";
// import Picture from "./components/Picture";

function App() {
  const [word, setWord] = useState("");
  const [image, setImage] = useState([]);
  const [randomItem, setRandomItem] = useState("");
  const [fullImg, setFullImg] = useState("");
  useEffect(() => {
    console.log("test");
  }, [randomItem]);
  const getRandomItem = (img) => {
    console.log(img);
    const randomIndex = Math.floor(Math.random() * img.length);
    const selectedRandomItem = img[randomIndex];
    const randomImage = selectedRandomItem.urls.small;
    const fullImage = selectedRandomItem.urls.full;
    setRandomItem(randomImage);
    setFullImg(fullImage);
  };
  function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("ลืมพิมพ์หรือเปล่าคั้บ");
    } else {
      // call API
      setWord("");
      fetchImageFromAPI();
    }
  }
  async function fetchImageFromAPI() {
    const url = `${
      import.meta.env.VITE_API_URL
    }?page=1&query=${word}&client_id=${
      import.meta.env.VITE_API_KEY
    }&per_page=25`;

    const res = await fetch(url);
    const data = await res.json();
    const result = data.results;
    if (result.length == 0) {
      alert("No data");
      setWord("");
    } else {
      setImage(result);
      getRandomItem(result);
    }
  }
  return (
    <>
      <h1>
        Random Image <span style={{ color: "#a32cc4" }}>Search</span>
      </h1>
      <form onSubmit={searchImage}>
        <input
          type="text"
          placeholder="Type..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">
          <div style={{ fontWeight: "700" }}>Search</div>
        </button>
      </form>
      {/* <div className="search-result">
        {image.map((data, index) => {
          // return <Picture key={data.id} {...data} />;
          return <Picture key={index} {...data} />;
        })}
      </div> */}
      <div className="random">
        {randomItem && (
          <a href={fullImg}>
            <img src={randomItem} alt="img" />
          </a>
        )}
      </div>
    </>
  );
}

export default App;
