import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const PreferencesScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [preferences, setPreferences] = useState([
    'uci ics',
    'uci ics clubs',
    'funny reels',
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearchSubmit = () => {
    Keyboard.dismiss()
  };

  const handleSearchResultPress = () => {
    if (searchText.trim()) {
      setPreferences(prevPreferences => [...prevPreferences, searchText.trim()]);
      setSearchText('');
    }
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
            onSubmitEditing={handleSearchSubmit}
            clearButtonMode="always"
        />
        </View>
      </View>
      <View style={styles.content}>
        {searchText ? (
          <TouchableOpacity onPress={handleSearchResultPress}>
            <View style={styles.searchResult}>
                <Ionicons name="search" size={24} color="black" style={styles.searchIconResult} />
                <Text style={styles.searchText}>{searchText}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.preferenceListContainer}>
            <Text style={styles.preferenceListHeader}>Preference List:</Text>
            <View style={styles.preferenceList}>
            {preferences.map((item, index) => (
              <Text key={index} style={styles.preferenceItem}>{item}</Text>
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
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchIconResult: {
    marginRight: 10,
  },
  searchText: {
    fontSize: 18,
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
  preferenceItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginBottom: 40
  },
  bottomBarItem: {
    alignItems: 'center',
  },
});

export default PreferencesScreen;
