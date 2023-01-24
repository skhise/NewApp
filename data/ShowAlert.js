import { SnackbarAlert } from "../components/ALERTS"
import COLORS from "../config/COLORS"

export default ShowAlert ={

    ShowAlert:(message,color)=> {
            SnackbarAlert(
              message,
              COLORS.white,
              color,
              'Got it',
              COLORS.white,
            )
          }

}

