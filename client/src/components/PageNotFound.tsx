import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div>
      <h1>PAGE NOT FOUND!</h1>
      <section>
        <span>
          <span>4</span>
        </span>
        <span>
          <span>0</span>
        </span>
        <span>
          <span>4</span>
        </span>
      </section>
      <div>
        <Link to="/">Visit Home Page</Link>
      </div>
    </div>
  );
}
