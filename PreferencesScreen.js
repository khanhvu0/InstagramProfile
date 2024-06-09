import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PreferencesScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [preferences, setPreferences] = useState([
    'ucibrenics',
    'hackatuci',
    'swe.uci',
    'wicsuci'
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [newPreference, setNewPreference] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearchResultPress = () => {
    if (searchText.trim()) {
      setNewPreference(searchText.trim());
      setAddModalVisible(true);
    }
  };

  const addPreference = () => {
    setPreferences(prevPreferences => [...prevPreferences, newPreference]);
    setSearchText('');
    setNewPreference('');
    setAddModalVisible(false);
  };

  const handleDeletePreference = () => {
    if (deleteIndex !== null) {
      setPreferences(prevPreferences => prevPreferences.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
      setModalVisible(false);
    }
  };

  const confirmDeletePreference = (index) => {
    setDeleteIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSpace} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchBar} 
            placeholder="Search Preference" 
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            clearButtonMode="always"
          />
        </View>
      </View>
      <View style={styles.content}>
        {searchText ? (
          <View style={styles.searchResultContainer}>
            <TouchableOpacity onPress={handleSearchResultPress}>
              <View style={styles.searchResult}>
                <Ionicons name="search" size={24} color="black" style={styles.searchIconResult} />
                <Text style={styles.searchText}>{searchText}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSearchResultPress}>
              <View style={styles.searchResult}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  style={styles.profilePicture}
                />
                <Text style={styles.searchText}>dataatuci</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.preferenceListContainer}>
            <Text style={styles.preferenceListHeader}>Preference List:</Text>
            <View style={styles.preferenceList}>
              {preferences.map((item, index) => (
                <View key={index} style={styles.preferenceItemContainer}>
                  <View style={styles.preferenceItem}>
                    <Text style={styles.preferenceItemText}>{item}</Text>
                    <TouchableOpacity onPress={() => confirmDeletePreference(index)}>
                      <Ionicons name="close" size={24} color="black" style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarItem}>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem}>
          <AntDesign name="plussquareo" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem}>
          <AntDesign name="playcircleo" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem}>
          <Ionicons name="person" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmation</Text>
            <Text style={styles.modalMessage}>Are you sure you want to delete this to your preference list?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonDelete]} onPress={handleDeletePreference}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="slide"
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmation</Text>
            <Text style={styles.modalMessage}>Are you sure you want to add this to your preference list?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setAddModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonAdd]} onPress={addPreference}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSpace: {
    height: 70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchResultContainer: {
    flexDirection: 'column',
  },
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  searchIconResult: {
    marginRight: 10,
  },
  searchText: {
    fontSize: 18,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  preferenceListHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  preferenceListContainer: {
    flex: 1,
  },
  preferenceList: {
    flex: 1,
  },
  preferenceItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  preferenceItem: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    width: width * 0.75,
    marginBottom: 10,
  },
  preferenceItemText: {
    fontSize: 16,
  },
  deleteIcon: {
    marginRight: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginBottom: 40,
  },
  bottomBarItem: {
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  modalButtonDelete: {
    backgroundColor: '#ff4d4d',
  },
  modalButtonAdd: {
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default PreferencesScreen;
