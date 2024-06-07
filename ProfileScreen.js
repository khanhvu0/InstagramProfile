import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import PreferencesScreen from './PreferencesScreen';

const profileData = {
  username: 'name',
  bio: 'This is the user bio. 📷✨\n#hashtag @mention\nThreads',
  posts: 9,
  followers: '340',
  following: 180,
  profilePicture: 'https://via.placeholder.com/150',
  stories: [
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100',
    'https://via.placeholder.com/100',
  ],
  photos: [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ]
};

const ProfileScreen = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(3);
  const handleAddPreferences = () => {
    navigation.navigate('Preferences');
  };

  const renderPhoto = ({ item }) => (
    <Image source={{ uri: item }} style={styles.photo} />
  );

  const renderStory = ({ item }) => (
    <View style={styles.story}>
      <Image source={{ uri: item }} style={styles.storyImage} />
    </View>
  );

  const keyExtractor = (item, index) => `${numColumns}-${index}`;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topSpace} />
        <View style={styles.userHeader}>
          <Text style={styles.userHeaderText}> Username</Text>
          <View style={styles.userIcons}>
            <TouchableOpacity style={styles.iconContainer}>
              <FontAwesome6 name="threads" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <AntDesign name="plussquareo" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="reorder-three" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header}>
          <Image source={{ uri: profileData.profilePicture }} style={styles.profilePicture} />
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{profileData.posts}</Text>
              <Text style={styles.statTitle}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{profileData.followers}</Text>
              <Text style={styles.statTitle}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{profileData.following}</Text>
              <Text style={styles.statTitle}>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.bio}>
          <Text style={styles.username}>{profileData.username}</Text>
          <Text style={styles.bioText}>{profileData.bio}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.additionalButton}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton} onPress={handleAddPreferences}>
            <Text style={styles.buttonText}>Add Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton}>
            <Text style={styles.buttonText}>Share Profile</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          key={`${numColumns}-stories`}
          data={profileData.stories}
          renderItem={renderStory}
          keyExtractor={keyExtractor}
          horizontal
          style={styles.stories}
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          key={`${numColumns}-photos`}
          data={profileData.photos}
          renderItem={renderPhoto}
          keyExtractor={keyExtractor}
          numColumns={numColumns}
          style={styles.photoGrid}
          scrollEnabled={false}
        />
      </ScrollView>
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
    height: 75,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userIcons: {
    flexDirection: 'row',
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  statTitle: {
    color: '#888',
  },
  bio: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 15
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  bioText: {
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  additionalButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    width: '30%',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stories: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  story: {
    marginRight: 10,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#c13584',
  },
  photoGrid: {
    flex: 1,
  },
  photo: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
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


export default ProfileScreen;
