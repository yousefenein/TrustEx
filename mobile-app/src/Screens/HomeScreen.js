import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState(''); 



  const newsUpdates = [
    { 
      id: '1', 
      title: 'Bitcoin Conference 2024', 
      summary: 'Join us for the annual Bitcoin conference this weekend! Explore the latest trends and network with industry leaders.', 
      image: require('../../assets/bitcoin-conference.png') 
    },
    { 
      id: '2', 
      title: 'Ethereum 2.0 Rollout', 
      summary: 'Ethereum is upgrading! Dive into what Ethereum 2.0 means for the future of decentralized apps.', 
      image: require('../../assets/ethereum-update.png') 
    },
  ];
  

  

  const renderNewsCard = ({ item }) => (
    <TouchableOpacity style={styles.newsCard}>
      <Image source={item.image} style={styles.newsImage} />
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSummary}>{item.summary}</Text>
    </TouchableOpacity>
  );

  


  const fetchUserProfile = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (!storedToken) return;
      

    const url = 'http://192.168.2.13:3000/profile';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
          if (data.role === 'publicUser') {
              setUser('Hi, ' + data.firstName + '!');
          }
      } else {
          console.error('Failed to fetch profile:', data.message);
      }
  } catch (error) {
      console.error('Error fetching profile:', error);
  }
};

useEffect(() => {
  const fetchOnNavigate = navigation.addListener('focus', () => {
    fetchUserProfile();
  });

  return fetchOnNavigate;
}, [navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}> {user || 'Welcome to TrustEx!'} </Text> 
      {/* will dynamically adjust once login is working  */}

      <Text style={styles.sectionTitle}>Latest News & Updates</Text>
      <FlatList
        data={newsUpdates}
        renderItem={renderNewsCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flex: 1,
    backgroundColor: "#FFF"
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
  },
  amenityContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  amenityImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  amenityText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  newsCard: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 150,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 0,
  },
  newsSummary: {
    fontSize: 16,
    padding: 10,
    paddingTop: 5,
    color: '#666',
  },
  quickAccessButton: {
    alignItems: 'center',
    marginRight: 20,
  },
  quickAccessText: {
    marginTop: 5,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  }, 
});

export default HomeScreen;
