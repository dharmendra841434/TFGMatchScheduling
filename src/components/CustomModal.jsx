import {View, Modal, StyleSheet} from 'react-native';

const CustomModal = ({onRequestClose, children, modalVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '3%',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default CustomModal;
