import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {postLogout} from '../../redux/actions/auth';
import {connect} from 'react-redux';
// import {persistor} from '../../redux/store';
import {API_URL} from '@env';
import {Right, Switch, Thumbnail, Icon, Button, Toast} from 'native-base';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Axios from 'axios';
function Profile(props) {
  const {user, navigation} = props;
  const [notifStatus, setNotifStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (success) {
      setSuccess(false);
      props.getUser(`${API_URL}/v1/users`, props.auth.token);
    }
  }, [success]);
  const toggleSwitch = () => setNotifStatus(previousState => !previousState);
  const choosePhotoHandler = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };
  const launchCameraHandler = () => {
    launchCamera({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };
  const uploadHandler = e => {
    let formData = new FormData();
    formData.append('image', {
      name: !photo.fileName ? photo.assets[0].fileName : photo.fileName,
      type: !photo.type ? photo.assets[0] : photo.type,
      uri: !photo.uri ? photo.assets[0].uri : photo.uri,
    });
    console.log(API_URL);
    Axios.patch(`${API_URL}/v1/users`, formData, {
      headers: {
        Authorization: `Bearer ${props.auth.token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        setMessage(res.data.message);
        setSuccess(true);
        setIsLoading(false);
        setPhoto(null);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
    e.preventDefault();
  };
  // console.log(photo.assets[0].uri);
  return (
    <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
      {modalVisible ? (
        <Modal
          animationType="slide"
          fullscreen={true}
          transparent={true}
          visible={modalVisible}>
          <View
            style={{
              ...styles.centeredView,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 20,
                height: 400,
                padding: 20,
              }}>
              <Icon
                style={{
                  alignSelf: 'flex-end',
                  fontSize: 34,
                }}
                onPress={() => {
                  setModalVisible(false);
                  setPhoto(null);
                }}
                name="close"
              />

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {!photo ? (
                  <Thumbnail
                    square
                    large
                    style={{borderRadius: 20}}
                    source={
                      !user.avatar
                        ? require('../../assets/img/blank-profile.png')
                        : {...{uri: `${API_URL}/images/${user.avatar}`}}
                    }
                  />
                ) : (
                  <Thumbnail
                    square
                    large
                    style={{borderRadius: 20}}
                    source={
                      !photo
                        ? {...{uri: `${API_URL}/images/${user.avatar}`}} ||
                          require('../../assets/img/blank-profile.png')
                        : !photo.uri
                        ? {uri: photo.assets[0].uri}
                        : {uri: photo.uri}
                    }
                  />
                )}
              </View>
              <View style={{flexDirection: 'row', width: 250, marginTop: 50}}>
                <Button
                  style={{
                    backgroundColor: '#6379F4',
                    width: '50%',
                    borderRadius: 14,
                    margin: 14,
                  }}
                  onPress={choosePhotoHandler}>
                  <Text
                    style={{
                      color: 'white',
                      width: '100%',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 15,
                    }}>
                    Gallery
                  </Text>
                </Button>
                <Button
                  style={{
                    backgroundColor: '#6379F4',
                    width: '50%',
                    borderRadius: 14,
                    margin: 14,
                  }}
                  onPress={launchCameraHandler}>
                  <Text
                    style={{
                      color: 'white',
                      width: '100%',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 15,
                    }}>
                    Camera
                  </Text>
                </Button>
              </View>

              <Button
                style={
                  !photo
                    ? {
                        backgroundColor: '#e6e6e6',
                        width: '80%',
                        borderRadius: 14,
                        margin: 14,
                      }
                    : {
                        backgroundColor: '#6379F4',
                        width: '80%',
                        borderRadius: 14,
                        margin: 14,
                      }
                }
                disabled={!photo || isLoading ? true : false}
                onPress={uploadHandler}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={
                      !photo
                        ? {
                            color: '#6379F4',
                            width: '100%',
                            textAlign: 'center',
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: 15,
                          }
                        : {
                            color: '#fff',
                            width: '100%',
                            textAlign: 'center',
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: 15,
                          }
                    }>
                    Save
                  </Text>
                )}
              </Button>
            </View>
          </View>
        </Modal>
      ) : null}
      <View style={styles.header}>
        <Icon
          onPress={() => props.navigation.goBack()}
          type="MaterialCommunityIcons"
          name="arrow-left"
          style={{color: '#4D4B57'}}
        />
        {/* <Image
          style={styles.backIcon}
          source={require('../../assets/img/arrow-left-black.png')}
        /> */}
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Thumbnail
            square
            large
            style={styles.profilePic}
            source={
              !user.avatar
                ? require('../../assets/img/blank-profile.png')
                : {uri: `${API_URL}/images/${user.avatar}`}
            }
          />
          <TouchableOpacity>
            <Text style={styles.textEdit} onPress={() => setModalVisible(true)}>
              Edit
            </Text>
          </TouchableOpacity>
          <Text style={styles.textUsername}>{user.username}</Text>
          {!user.phone_number ? (
            <Text
              style={{...styles.textEdit, color: '#6379F4'}}
              onPress={() => navigation.navigate('AddPhoneNumber')}>
              add phone number
            </Text>
          ) : (
            <Text style={styles.textEdit}>
              {`+62 ${user.phone_number.slice(1, 4)}-${user.phone_number.slice(
                5,
                9,
              )}-${user.phone_number.slice(10, 14)}`}
            </Text>
          )}
        </View>
        <View style={{marginTop: 40}}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => props.navigation.navigate('PersonalInformation')}>
            <Text style={styles.textInCard}>Personal Information</Text>
            <Image
              style={styles.arrow}
              source={require('../../assets/img/arrow-right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => props.navigation.navigate('ChangePassword')}>
            <Text style={styles.textInCard}>Change Password</Text>
            <Image source={require('../../assets/img/arrow-right.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => props.navigation.navigate('ChangePin')}>
            <Text style={styles.textInCard}>Change PIN</Text>
            <Image source={require('../../assets/img/arrow-right.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => props.navigation.navigate('Notification')}>
            <Text style={styles.textInCard}>Notification</Text>
            <Right>
              <Switch
                onValueChange={toggleSwitch}
                thumbColor={notifStatus ? '#FFFFFF' : '#FFFFFF'}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                value={notifStatus}
              />
            </Right>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              props.postLogout(`${API_URL}/v1/auth/logout`, props.auth.token);
              // persistor.purge();
            }}>
            <Text style={styles.textInCard}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  container: {
    alignItems: 'center',
  },
  profilePic: {
    marginBottom: 20,
  },
  textEdit: {
    fontFamily: 'NunitoSans',
    fontSize: 16,
    color: '#7A7886',
    marginBottom: 20,
  },
  textUsername: {
    fontFamily: 'NunitoSans',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#4D4B57',
  },
  card: {
    backgroundColor: '#E5E8ED',
    width: '90%',
    height: 60,
    borderRadius: 10,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  textInCard: {
    fontFamily: 'NunitoSans',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 28,
    color: '#4D4B57',
    textAlignVertical: 'center',
    width: '90%',
  },
});

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth.results,
  user: state.user.results,
});
const mapDispatchToProps = dispatch => ({
  postLogout: (url, data) => {
    dispatch(postLogout(url, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
