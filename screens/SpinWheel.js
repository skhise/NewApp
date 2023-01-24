// Importing
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
//import WheelOfFortune from 'react-native-wheel-of-fortune';
import GLOBAL_STYLES from '../styles/GLOBAL_STYLES';
import SPIN_WHEEL_STYLES from '../styles/screens/SPIN_WHEEL_STYLES';
import Modal from 'react-native-modal';
import COLORS from '../config/COLORS';
import LottieView from 'lottie-react-native';
import FA5_Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// Constant
const participants = ['0', '10', '20', '30', '40', '50'];

// Class component
class SpinWheel extends Component {
  // Class constructor
  constructor(props) {
    // Super method
    super(props);
    // Local states
    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
      isModalVisible: false,
    };
    this.child = null;
  }

  // Method to spin the wheel
  buttonPress = () => {
    // Updating state
    this.setState({
      started: true,
    });
    this.child._onPress();
  };

  // Rendering
  render() {
    // Constant
    const wheelOptions = {
      rewards: participants,
      knobSize: scale(30),
      borderWidth: scale(5),
      borderColor: COLORS.primary,
      innerRadius: scale(30),
      duration: 6000,
      backgroundColor: 'transparent',
      textAngle: 'horizontal',
      knobSource: require('../assets/images/knob.png'),
      onRef: ref => (this.child = ref),
    };

    // Returning
    return (
      <View style={[SPIN_WHEEL_STYLES.container, GLOBAL_STYLES.xyCenter]}>
        {/* <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState({
              winnerValue: value,
              winnerIndex: index,
              isModalVisible: !this.state.isModalVisible,
            });
          }}
        /> */}
        {!this.state.started && (
          <View style={SPIN_WHEEL_STYLES.startButtonView}>
            <TouchableOpacity
              onPress={() => this.buttonPress()}
              style={SPIN_WHEEL_STYLES.startButton}>
              <Text style={SPIN_WHEEL_STYLES.startButtonText}>
                Spin to win!
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.winnerIndex != null && (
          <View>
            <Modal
              isVisible={this.state.isModalVisible}
              backdropColor={COLORS.fontDark}
              backdropOpacity={0.9}
              style={SPIN_WHEEL_STYLES.modalMargin}>
              <View
                style={[
                  SPIN_WHEEL_STYLES.modalContentContainer,
                  GLOBAL_STYLES.xyCenter,
                ]}>
                <View style={GLOBAL_STYLES.lottieViewContainer}>
                  {/* Lottie view */}
                  <LottieView
                    source={require('../assets/lottie/trophy-with-sprinkles.json')}
                    loop
                    autoPlay
                    resizeMode="cover"
                  />
                </View>
                <Text style={SPIN_WHEEL_STYLES.congratsLabel}>
                  Many Congratulations!
                </Text>
                <Text style={SPIN_WHEEL_STYLES.congratsMessage}>
                  Hey Jhon,You have won
                </Text>
                <View style={[GLOBAL_STYLES.xyCenter, GLOBAL_STYLES.flexRow]}>
                  <FA5_Icon
                    name="rupee-sign"
                    size={scale(35)}
                    color={COLORS.primary}
                  />
                  <Text style={SPIN_WHEEL_STYLES.winningValue}>
                    {this.state.winnerValue}
                  </Text>
                </View>
                {/* Modal close icon */}
                <View style={GLOBAL_STYLES.modalCloseIconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        isModalVisible: !this.state.isModalVisible,
                      })
                    }>
                    <MaterialIcon
                      name="close"
                      size={scale(20)}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View>
    );
  }
}

// Exporting
export default SpinWheel;
