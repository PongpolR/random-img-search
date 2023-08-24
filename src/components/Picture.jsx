/* eslint-disable react/prop-types */
import "./Picture.css";
export default function Picture(props) {
  return (
    <>
      <a href={props.urls.raw}>
        <img className="image" src={props.urls.small} alt={props.description} />
      </a>
    </>
  );
}
