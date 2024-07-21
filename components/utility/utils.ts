import { Tutorials } from "./Interfaces";

export function selectTutorial(selected: Tutorials, setSelectedTutorial:any) {
    switch (selected) {
      case Tutorials.ACCOUNT:
        setSelectedTutorial(require('../assets/images/tut_account.png'));
        break;
      case Tutorials.POST_ACCOUNT:
        setSelectedTutorial(require('../assets/images/tut_account.png'));
        break;
      case Tutorials.MAIL:
        setSelectedTutorial(require('../assets/images/tut_mail.png'));
        break;
      case Tutorials.BONUS_MONEY:
        setSelectedTutorial(require('../assets/images/tut_money.png'));
        break;
      case Tutorials.REAL_MONEY:
        setSelectedTutorial(require('../assets/images/tut_money.png'));
        break;
      case Tutorials.ADD_MONEY:
        setSelectedTutorial(require('../assets/images/tut_add_money.png'));
        break;
      case Tutorials.WALLET:
        setSelectedTutorial(require('../assets/images/tut_withdrawl.png'));
        break;
      case Tutorials.EVENT:
        setSelectedTutorial(require('../assets/images/tut_event.png'));
        break;
      case Tutorials.GAME:
        setSelectedTutorial(require('../assets/images/tut_game.png'));
        break;
      default:
        setSelectedTutorial(null);
        break;
    }
  }