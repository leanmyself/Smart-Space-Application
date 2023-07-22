import { relativeTimeRounding } from 'moment/moment';
import { StyleSheet, Dimensions } from 'react-native';
const numColumns = 2;

const roomStyle = StyleSheet.create({
  barHeader: {
    backgroundColor: '#FFF',
    borderBottomColor: '#BA94D1',
    borderBottomWidth: 0.5,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  greeting: {
    fontFamily: 'FiraSans-Medium',
    fontSize: 20,
    marginVertical: 10,
    color: '#544C91',
  },
  headerText: {
    fontFamily: 'FiraSans-Light',
    fontSize: 16,
    color: '#544C91',
    marginBottom: 10
  },
  subContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subContentText: {
    fontFamily: 'FiraSans-Light',
    fontSize: 15,
    color: '#975C8D',
    alignSelf: 'flex-end'
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(234, 208, 245, 0.3)',
    margin: 10,
  },
  card: {
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: 'rgba(242, 242, 242, 0.1)',
    borderColor: 'rgba(220, 188, 234, 0.2)'
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginHorizontal: 10
  },
  itemIcon: {
    fontSize: 30,
    color: '#7F669D',
    margin: 10,
    textAlign: 'center'
  },
  itemModal: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    width: '100%',
  },
  itemModalHeader: {
    fontFamily: 'FiraSans-Regular',
    fontSize: 20,
    marginBottom: 10
  },
  FlatlistView: {
    height: 120,
    width: 180,
    marginVertical: 10,
    margin: 5,
    backgroundColor: 'rgba(242, 242, 242, 0.1)',
    borderColor: 'rgba(220, 188, 234, 0.2)',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  FlatlistDashboard: {
    height: 150,
    width: 160,
    marginVertical: 10,
    margin: 5,
    backgroundColor: 'rgba(160, 132, 202, 0.07)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStyle: {
    flexWrap: 'wrap',
    alignContent: 'space-between',
  },
  item: {
    backgroundColor: 'rgba(242, 242, 242, 0.1)',
    borderColor: 'rgba(220, 188, 234, 0.2)',
    borderWidth: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 15,
    margin: 5,
    height: Dimensions.get('window').width / numColumns,
    borderRadius: 20
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: 'transparent',
  },
  itemImage: {
    resizeMode: 'contain',
    width: 80,
    height: 80
  },
  itemValue: {
    fontFamily: 'FiraSans-Medium',
    fontSize: 20,
    color: '#544C91',
    justifyContent: 'flex-end',
  },
  itemDescription: {
    fontFamily: 'FiraSans-Regular',
    fontSize: 15,
  },
  itemText: {
    fontFamily: 'FiraSans-Light',
    fontSize: 15,
    color: '#413F42',
    textAlign: 'justify'
  },
  switchText: {
    fontFamily: 'FiraSans-ExtraLight',
    fontSize: 12,
    color: '#7B69B2'
  },


  /*LOGIN SCREEN */
  flashMessageTitle: {
    alignItems: 'center',
    fontFamily: 'FiraSans-Medium'
  },
  flashMessageText: {
    alignItems: 'center',
    fontFamily: 'FiraSans-Light'
  },
  loginContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  loginLogo: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  loginHeader: {
    fontFamily: 'FiraSans-Medium',
    color: "#7B69B2",
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20
  },
  loginTitle: {
    fontFamily: 'FiraSans-Regular',
    color: "#7B69B2",
    fontSize: 22,
    textAlign: 'center'
  },
  loginButton: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'center'
  },
  loginText: {
    fontFamily: 'FiraSans-Regular',
    fontSize: 15,
    color: '#434242'
  },
  link: {
    fontFamily: 'FiraSans-Medium',
    color: "#624F82"
  },
  errorTextStyle: {
    color: '#850000',
    textAlign: "center",
    fontSize: 14,
    padding: 5
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalHeading: {
    fontFamily: 'FiraSans-Medium',
    color: '#850000',
    fontSize: 15
  },
  modalText: {
    fontFamily: 'FiraSans-Regular',
    textAlign: 'center',
    padding: 15,
  },

  /*USER SCREEN */
  userModal: {
    backgroundColor: '#FFFFFF',
    borderColor: '#544C91',
    borderWidth: 1
  },
  userTitle: {
    fontFamily: 'FiraSans-Medium',
    color: '#624F82',
    textAlign: 'center'
  },
  userContent: {
    flexDirection: 'column',
  },
  userInput: {
    height: 40,
    margin: 10,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 120,
  },
  avatar: {
    backgroundColor: '#FFF',
    borderColor: '#EDEDED',
    borderWidth: 0.5,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  userName: {
    fontSize: 25,
    fontFamily: 'FiraSans-Medium',
    marginTop: 10,
    textTransform: 'uppercase',
    color: '#645CAA'
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  userBtn: {
    borderColor: '#917FB3',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#645CBB',
  },
  emailVerified: {
    fontFamily: 'FiraSans-Regular',
    color: '#379237',
    textAlign: 'center'
  },
  emailnotVerified: {
    fontFamily: 'FiraSans-Regular',
    color: '#B33030',
    textAlign: 'center'
  },
  resendLink: {
    textAlign: 'center',
    fontFamily: 'FiraSans-Medium',
    color: '#144272'
  },
  columnContainer: {
    flexDirection: 'row',
  },
  rowContainer: {
    flex: 1,
    margin: 2
  },

  /*WEATHER */
  headingText: {
    fontSize: 15,
    fontFamily: 'FiraSans-Medium',
    color: '#624F82',
  },
  containerDate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  cityName: {
    fontFamily: 'FiraSans-Medium',
    color: '#544C91',
    fontSize: 20,
  },
  time: {
    fontSize: 20,
    fontFamily: 'FiraSans-Regular',
    color: '#544C91',
  },
  date: {
    fontSize: 15,
    fontFamily: 'FiraSans-Regular',
    color: '#544C91',
  },
  weatherIcon: {
    height: 50,
  },
  weatherDescription: {
    color: '#544C91',
    fontFamily: 'FiraSans-Regular',
  },
  containerWeather: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10
  },
  icon: {
    fontSize: 23,
    color: '#544C91',
  },
  iconDescription: {
    fontFamily: 'FiraSans-Regular',
    color: '#413F42',
  },
})



export { roomStyle };