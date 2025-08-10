import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const mallIcon = require('../assets/markers/mall.png');
const gasIcon = require('../assets/markers/gas.png');

const API_KEY = '0bc987b6cc0149c088a96234201d1edd';

export default function HomeScreen() {
  const [pois, setPOIs] = useState([]);

  useEffect(() => {
    const fetchPOIs = async () => {
      try {
        const url = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,service.vehicle.fuel&conditions=named&filter=circle:-79.3871,43.6426,12500&limit=20&apiKey=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        setPOIs(data.features);
      } catch (error) {
        console.error('Failed to load POIs:', error);
      }
    };

    fetchPOIs();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.6426,
          longitude: -79.3871,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {pois.map((poi, index) => {
          const [lon, lat] = poi.geometry.coordinates;
          const categories = poi.properties.categories || [];
          const icon = categories.includes('commercial.shopping_mall')
            ? mallIcon
            : categories.includes('service.vehicle.fuel')
            ? gasIcon
            : null;

          if (!icon) return null;

          return (
            <Marker key={index} coordinate={{ latitude: lat, longitude: lon }}>
              <View style={styles.iconWrapper}>
                <Image source={icon} style={styles.iconImage} />
              </View>
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{poi.properties.name}</Text>
                  <Text style={styles.calloutText}>{poi.properties.address_line2}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  callout: {
    width: 200,
    padding: 8,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calloutText: {
    flexWrap: 'wrap',
  },
});