import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  authHeader: {paddingTop: 40, paddingBottom: 40},
  textHeader: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 36,
    textAlign: 'center',
    color: '#6379F4',
    paddingTop: 20,
    paddingBottom: 20,
  },
  subTextHeader: {
    fontFamily: 'NutinoSans',
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  rightSide: {
    borderBottomWidth: 0,
    justifyContent: 'flex-end',
  },
  eyeIcon: {
    paddingTop: 0,
    marginTop: 0,
    color: '#5c5c5c',
    justifyContent: 'flex-start',
  },
  footer: {
    backgroundColor: '#ffffff',
    borderColor: '#fff',
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyLink: {
    color: '#ADA9BB',
  },
  link: {
    color: '#6379F4',
    fontFamily: 'NunitoSans-Bold',
  },
  linkSmall: {
    fontSize: 14,
  },
  formContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#fff',
    paddingRight: 15,
    flex: 1,
  },
  authContainer: {
    height: '100%',
    backgroundColor: '#e5e5e5',
  },
  textBlack: {
    color: '#000',
  },
  button2: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    height: 45,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6e6',
    fontFamily: 'Kanit-SemiBold',
  },
  button2Confirmed: {
    backgroundColor: '#6379F4',
  },
  textWhite: {
    color: '#fff',
  },
  boxButton: {
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  semiBold: {
    fontFamily: 'Kanit-SemiBold',
    color: '#000',
  },
  fontHeaderSmall: {
    fontSize: 26,
  },
});

export default styles;
