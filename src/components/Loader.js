import "../css/loader.css";

const Loader = ({ isDM }) => {
  return (
    <div className="loader">
      <div className={`${isDM ? "gooeydark" : ""} gooey`}>
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
