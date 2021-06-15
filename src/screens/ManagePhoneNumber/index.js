import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Card, Icon, Right} from 'native-base';
import CustomModal from '../../components/Modal/CustomModal';
import {connect} from 'react-redux';
import Axios from 'axios';
import {API_URL} from '@env';
function ManagePhoneNumber(props) {
  const [contact, setContact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFulfilled, setIsFulfilled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [updateKey, setUpdateKey] = useState(false);
  const [isErr, setIsErr] = useState(false);
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
  useEffect(() => {
    Axios.get(`${API_URL}/v1/users/phone-number`, {
      headers: {
        Authorization: `Bearer ${props.auth.token}`,
      },
    })
      .then(res => {
        setContact(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (props.route.params && props.route.params.updatePhone) {
      Axios.get(`${API_URL}/v1/users/phone-number`, {
        headers: {
          Authorization: `Bearer ${props.auth.token}`,
        },
      })
        .then(res => {
          setContact(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [props.route.params]);
  useEffect(() => {
    if (isFulfilled) {
      Axios.get(`${API_URL}/v1/users/phone-number`, {
        headers: {
          Authorization: `Bearer ${props.auth.token}`,
        },
      })
        .then(res => {
          setContact(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
      setModalVisible(true);
    }
  }, [isFulfilled]);
  const handleDelete = idContact => {
    setIsLoading(true);
    Axios.delete(`${API_URL}/v1/users/phone-number/${idContact}`, {
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
  };
  const handleKey = idContact => {
    setIsLoading(true);
    Axios.patch(
      `${API_URL}/v1/users/phone-number/${idContact}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${props.auth.token}`,
        },
      },
    )
      .then(res => {
        setIsFulfilled(true);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setIsErr(true);
      });
  };
  return (
    <KeyboardAvoidingView>
      <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
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

              setModalVisible(false);
            }}
            message="Update Success"
          />
        ) : updateKey && modalVisible ? (
          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={choice => setModalVisible(choice)}
            accHandler={() => {
              handleKey(selectedItem);
              setModalVisible(false);
              setUpdateKey(false);
              setSelectedItem(0);
            }}
            decHandler={() => {
              setUpdateKey(false);
              setModalVisible(false);
            }}
            phoneNumber={true}
            keyPhoneNumber={true}
            message={contact.map(item => {
              if (item.id === selectedItem) {
                return `+62 ${item.phone_number.slice(
                  1,
                  4,
                )}-${item.phone_number.slice(5, 9)}-${item.phone_number.slice(
                  10,
                  14,
                )}`;
              }
            })}
          />
        ) : modalVisible ? (
          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={choice => setModalVisible(choice)}
            accHandler={() => {
              handleDelete(selectedItem);
              setModalVisible(false);
              setSelectedItem(0);
            }}
            decHandler={() => {
              setModalVisible(false);
            }}
            phoneNumber={true}
            message={contact.map(item => {
              if (item.id === selectedItem) {
                return `+62 ${item.phone_number.slice(
                  1,
                  4,
                )}-${item.phone_number.slice(5, 9)}-${item.phone_number.slice(
                  10,
                  14,
                )}`;
              }
            })}
          />
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 20,
          }}>
          <Icon
            onPress={() => props.navigation.goBack()}
            type="MaterialCommunityIcons"
            name="arrow-left"
            style={{color: '#4D4B57'}}
          />
          <Text style={Styles.pagename}>Manage Phone Number</Text>
        </View>
        <Text style={Styles.caption}>
          You can only delete the phone number and then you must add another
          phone number.
        </Text>
        <Text
          onPress={() =>
            props.navigation.navigate('AddPhoneNumber', {phone: true})
          }
          style={{color: 'blue', fontSize: 18, marginLeft: 22, marginTop: 60}}>
          Add
        </Text>
        {!contact || contact.length === 0 ? (
          <ActivityIndicator size="large" color="#6379F4" />
        ) : (
          contact.map(item => (
            <Card
              key={item.id}
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderRadius: 10,
              }}>
              <View>
                <Text style={Styles.primary}>
                  {item.primary ? 'Primary' : 'phone number'}
                </Text>
                <Text style={Styles.number}>{`+62 ${item.phone_number.slice(
                  1,
                  4,
                )}-${item.phone_number.slice(5, 9)}-${item.phone_number.slice(
                  10,
                  14,
                )}`}</Text>
              </View>
              <Right>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <Icon
                      name="key"
                      style={
                        item.primary ? {color: '#6379F4'} : {color: '#7A7886'}
                      }
                      onPress={() => {
                        setModalVisible(true);
                        setUpdateKey(true);
                        setSelectedItem(item.id);
                      }}
                    />
                    <Icon
                      name="trash-outline"
                      style={{color: '#7A7886'}}
                      onPress={() => {
                        setModalVisible(true);
                        setSelectedItem(item.id);
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </Right>
            </Card>
          ))
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
const Styles = StyleSheet.create({
  pagename: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#4D4B57',
    marginLeft: 20,
  },
  caption: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    color: '#7A7886',
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  primary: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: '#7A7886',
  },
  number: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#514F5B',
    marginTop: 10,
  },
});
const mapStateToProps = state => {
  return {
    auth: state.auth.results,
    user: state.user.results,
  };
};

export default connect(mapStateToProps)(ManagePhoneNumber);
