import "./topbar.css";

export default function Topbar() {
  return(
      <div className="topbarContainer flex flex-row justify-center text-center">
        <h3 className="topbarLogo">Logo</h3>
        <button className="addPost">Add Post</button>
      </div>
  );
}
