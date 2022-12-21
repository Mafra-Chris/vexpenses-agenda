import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Name, Number, Card, Letter } from './Style';
export default function Contacts() {
  return (
    <div>
      <Letter>C</Letter>
      <ol>
        <Card>
          <div>
            <Name>Chris Mafra</Name>
            <Number>+55 22 92217-5833</Number>
          </div>

          <button>
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </Card>
        <Card>
          <div>
            <Name>Chris Mafra</Name>
            <Number>+55 22 92217-5833</Number>
          </div>

          <button>
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </Card>
        <Card>
          <div>
            <Name>Chris Mafra</Name>
            <Number>+55 22 92217-5833</Number>
          </div>

          <button>
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </Card>
      </ol>
    </div>
  );
}
