import { View, Text, Platform, StatusBar, SafeAreaView, ScrollView, Touchable, TouchableOpacity, Image, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../styles/styles'
import { Headline, Searchbar } from 'react-native-paper'

const SearchModel = ({searchQuery, setSearchQuery, setActiveSearch, products =[]}) => {

    const navigate = useNavigation()

    const backAction = () => {
        setSearchQuery('');
        setActiveSearch(false);
        return true
    }

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction)
    
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction)
      }
    }, [])
    

  return (
    <View style={{
        width: "100%", 
        height: "100%", 
        position: "absolute",
        top: 0,
        zIndex: 100,
        backgroundColor: colors.color2,
        padding: 35,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}>
      {/* <Text>SearchModel</Text> */}
      <SafeAreaView>
        <Searchbar placeholder='Search...' onChange={(query) => setSearchQuery(query)} value={searchQuery} style={{marginTop: 20}}/>

        <ScrollView>
            <View style={{
                paddingHorizontal: 40,
                paddingVertical: 20
            }}>
                {
                    products.map((e) => (
                        <SearchItem key={e._id} imgSrc={e.images[0]?.url} name={e.name} price={e.price} handler={() => navigate.navigate("productdetails", {id: e._id})}/>
                    ))
                }
            </View>
        </ScrollView>

      </SafeAreaView>
    </View>
  )
}

const SearchItem = ({imgSrc, name, price, handler}) => (
    <TouchableOpacity onPress={handler}>
        <View style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.color2,
            elevation: 5,
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
            marginVertical: 30
        }}>
            <Image 
                source={{
                    uri: imgSrc
                }}
                style={{
                    width: 80,
                    height: 80,
                    position: "absolute",
                    resizeMode: "contain",
                    top: -15,
                    left: 10,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}
            />

            <View style={{
                width: "100%",
                paddingHorizontal: 30
            }}>
                <Text numberOfLines={1}>{name}</Text>
                <Headline 
                    style={{
                        fontWeight: "900"
                    }}
                    numberOfLines={1}
                    >
                        $ {price}
                </Headline>
            </View>
        </View>
    </TouchableOpacity>
)

export default SearchModel