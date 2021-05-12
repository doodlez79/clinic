import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';

export const styles = StyleSheet.create({
  greeting: {
    marginTop: perfectSize(28),
    marginBottom: perfectSize(28),
  },
  linearGradient: {
    borderRadius: perfectSize(12),
    position: 'absolute',
    width: '100%',
    height: perfectSize(64),
    opacity: 0.2,
  },
  recordBtn: {
    width: '100%',
    height: perfectSize(64),
    marginBottom: perfectSize(32),
    paddingTop: perfectSize(20),
    paddingBottom: perfectSize(20),
  },
  recordBtnContent: {
    width: perfectSize(203),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recordBtnIcon: {
    width: perfectSize(22),
    height: perfectSize(24),
    marginRight: perfectSize(12),
    marginBottom: perfectSize(4),
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: perfectSize(16),
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    height: perfectSize(268),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: perfectSize(16),
  },
  walletBtn: {
    // marginHorizontal: perfectSize(39),
    // height: perfectSize(48),
    width: perfectSize(265),
    height: perfectSize(48),
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
