import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Card,
  CardItem,
  Left,
  Right,
  Icon,
  Input,
  Form,
  Item,
} from 'native-base';
import {connect} from 'react-redux';
import CustomModal from '../../components/Modal/CustomModal';
import {getUser} from '../../redux/actions/user';
import Axios from 'axios';
import {API_URL} from '@env';
function PersonalInformation(props) {
  const {user} = props;
  const [editF, setEditF] = useState(false);
  const [editL, setEditL] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFulfilled, setIsFulfilled] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isErr, setIsErr] = useState(false);
  const information = {
    firstName: !user.first_name
      ? 'please input your first name'
      : user.first_name,
    lastName: !user.last_name ? 'please input your last name' : user.last_name,
    email: !user.email ? 'please input your email' : user.email,
    phoneNumber: !user.phone_number
      ? 'please input your phone number'
      : `+62 ${user.phone_number.slice(1, 4)}-${user.phone_number.slice(
          5,
          9,
        )}-${user.phone_number.slice(10, 14)}`,
  };
  useEffect(() => {
    setFirstName(information.firstName);
    setLastName(information.lastName);
  }, []);
  useEffect(() => {
    if (isFulfilled) {
      props.getUser(`${API_URL}/v1/users`, props.auth.token);
      setModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFulfilled]);
  useEffect(() => {
    if (isErr) {
      setFirstName(information.firstName);
      setLastName(information.lastName);
      setModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErr]);
  useEffect(() => {
    if (isLoading) {
      setModalVisible(isLoading);
    }
  }, [isLoading]);
  const handleSubmit = event => {
    setIsLoading(true);
    let postData = {};
    if (firstName === information.firstName) {
      postData = {last_name: lastName};
    } else if (lastName === information.lastName) {
      postData = {first_name: firstName};
    }
    Axios.patch(`${API_URL}/v1/users`, postData, {
      headers: {
        Authorization: `Bearer ${props.auth.token}`,
      },
    })
      .then(res => {
        setIsFulfilled(true);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setIsErr(true);
      });
    event.preventDefault();
  };
  return (
    <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
      {isLoading ? (
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={choice => setModalVisible(choice)}
          isLoading={true}
        />
      ) : isErr && modalVisible ? (
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={choice => setModalVisible(choice)}
          isErr={true}
          accHandler={() => {
            setIsErr(false);
            setEditF(false);
            setEditL(false);
            setModalVisible(false);
          }}
          message="Update Failed"
        />
      ) : isFulfilled && modalVisible ? (
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={choice => setModalVisible(choice)}
          success={true}
          accHandler={() => {
            setIsFulfilled(false);
            setEditF(false);
            setEditL(false);
            setModalVisible(false);
          }}
          message="Update Success"
        />
      ) : modalVisible ? (
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={choice => setModalVisible(choice)}
        />
      ) : null}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <Icon
            onPress={() => props.navigation.goBack()}
            type="MaterialCommunityIcons"
            name="arrow-left"
            style={{color: '#4D4B57'}}
          />
        </TouchableOpacity>
        <Text style={styles.pageName}>Personal Information</Text>
      </View>
      <View style={{padding: 20}}>
        <Text style={styles.caption}>
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </Text>
      </View>
      <Card
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          paddingHorizontal: 15,
          paddingVertical: 15,
          borderRadius: 10,
          marginBottom: 30,
        }}>
        <View style={{lineHeight: 30, flex: 3}}>
          <Text style={styles.menuInCard}>First Name</Text>
          {editF ? (
            <Form>
              <Item style={{marginLeft: 0}}>
                <Input
                  style={styles.valueInCard}
                  value={firstName}
                  onChangeText={text => setFirstName(text)}
                />
              </Item>
            </Form>
          ) : (
            <Text style={styles.valueInCard}>{firstName}</Text>
          )}
        </View>
        <Right>
          {editF ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Icon
                type="FontAwesome"
                name="window-close"
                style={{color: 'red'}}
                onPress={() => setEditF(false)}
              />
              <Icon
                type="FontAwesome"
                name="check-square"
                style={{marginLeft: 5, color: '#6379F4'}}
                onPress={handleSubmit}
              />
            </View>
          ) : (
            <Icon
              type="FontAwesome"
              name="edit"
              style={{color: '#7A7886'}}
              onPress={() => setEditF(true)}
            />
          )}
        </Right>
      </Card>
      <Card
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          paddingHorizontal: 15,
          paddingVertical: 15,
          borderRadius: 10,
          marginBottom: 30,
        }}>
        <View style={{lineHeight: 30, flex: 3}}>
          <Text style={styles.menuInCard}>Last Name</Text>
          {editL ? (
            <Form>
              <Item style={{marginLeft: 0}}>
                <Input
                  style={styles.valueInCard}
                  value={lastName}
                  onChangeText={text => setLastName(text)}
                />
              </Item>
            </Form>
          ) : (
            <Text style={styles.valueInCard}>{lastName}</Text>
          )}
        </View>
        <Right>
          {editL ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Icon
                type="FontAwesome"
                name="window-close"
                style={{color: 'red'}}
                onPress={() => setEditL(false)}
              />
              <Icon
                type="FontAwesome"
                name="check-square"
                style={{marginLeft: 5, color: '#6379F4'}}
                onPress={handleSubmit}
              />
            </View>
          ) : (
            <Icon
              type="FontAwesome"
              name="edit"
              style={{color: '#7A7886'}}
              onPress={() => setEditL(true)}
            />
          )}
        </Right>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.menuInCard}>Verified E-mail</Text>
        <Text style={styles.valueInCard}>{information.email}</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.menuInCard}>Phone Number</Text>
        {user.phone_number ? (
          <Text
            onPress={() => props.navigation.navigate('ManagePhoneNumber')}
            style={{color: 'blue', marginLeft: '80%'}}>
            Manage
          </Text>
        ) : (
          <Text
            onPress={() => props.navigation.navigate('AddPhoneNumber')}
            style={{color: 'blue', marginLeft: '80%'}}>
            Add
          </Text>
        )}

        <Text style={styles.valueInCard}>{information.phoneNumber}</Text>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 15,
    flexDirection: 'row',
  },
  pageName: {
    marginLeft: 20,
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 30,
    color: '#4D4B57',
  },
  caption: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 27,
    color: '#7A7886',
    marginVertical: 15,
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
  },
  menuInCard: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 22,
    color: '#7A7886',
  },
  valueInCard: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 30,
    color: '#514F5B',
  },
});
const mapStateToProps = state => {
  return {
    auth: state.auth.results,
    user: state.user.results,
  };
};
const mapDispatchToProps = dispatch => ({
  getUser: (url, token) => {
    dispatch(getUser(url, token));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalInformation);
