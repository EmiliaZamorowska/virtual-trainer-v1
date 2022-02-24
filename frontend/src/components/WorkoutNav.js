import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function WorkoutNav() {
  const location = useLocation();
  function checkLink(link) {
    if (location.pathname === link) return true;
    else return false;
  }
  return (
    <div className="subNav">
      <ul>
        <li className="subNavLi">
          {checkLink("/trening-wyciskanie") ? (
            <span className="disabled">Wyciskanie nad głowę</span>
          ) : (
            <Link to="/trening-wyciskanie">Wyciskanie nad głowę</Link>
          )}
        </li>
        <li className="subNavLi">
          {checkLink("/trening-biceps") ? (
            <span className="disabled">Uginanie ramion</span>
          ) : (
            <Link to="/trening-biceps">Uginanie ramion</Link>
          )}
        </li>
        <li className="subNavLi">
          {checkLink("/trening-wznosy") ? (
            <span className="disabled">Wznosy bokiem</span>
          ) : (
            <Link to="/trening-wznosy">Wznosy bokiem</Link>
          )}
        </li>
        <li className="subNavLi">
          {checkLink("/trening-triceps") ? (
            <span className="disabled">
              Prostowanie przedramienia w opadzie
            </span>
          ) : (
            <Link to="/trening-triceps">
              Prostowanie przedramienia w opadzie
            </Link>
          )}
        </li>
        <li className="subNavLi">
          {checkLink("/trening-wioslowanie") ? (
            <span className="disabled">Wiosłowanie w opadzie</span>
          ) : (
            <Link to="/trening-wioslowanie">Wiosłowanie w opadzie</Link>
          )}
        </li>
      </ul>
    </div>
  );
}
export default WorkoutNav;
