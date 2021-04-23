//REACT-NATIVE
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  viewContainer: {
    height: hp("60%"),
    marginHorizontal: wp("5%"),
    marginVertical: hp("10%"),
    justifyContent: "center",
    paddingVertical: hp("5%"),
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowRadius: 50,
    elevation: 55,
  },
  listContainer: {
    borderTopLeftRadius: 60,
  },
  list: {
    height: hp("55%"),
    marginVertical: hp("9.5%"),
  },
});

export default styles;
