import React, { useEffect, useState } from "react"

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';


export default function App() {
  const [cardSetValue, setCardValue] = useState()
  const [matchFound, setMatchFound] = useState(0)
  const [totalAttempted, setTotalAttempted] = useState(0)
  const [lastCardSelected, setLastCardSelected] = useState(null)
  const [onPressAbled, setOnpressAbled] = useState(true)

  useEffect(() => {
    setLastCardSelected(null)
    let initialValue = "AABBCCDDEEFFGGHH"

    //converting string into array and providing individual state to each character.
    const tempArr = initialValue.split("").map(([label, isShown = 0]) => ({ label, isShown }))

    // shuffle the array
    for (var i = tempArr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      let temp = tempArr[i]
      tempArr[i] = tempArr[j];
      tempArr[j] = temp
    }
    // console.log("working", tempArr)

    setCardValue(tempArr)
  }, [])

  const handleOnpress = (i) => {
    setOnpressAbled(false)
    //  0=>false,1=>true,2=>matched
    // checking is any card is pre selected
    if (lastCardSelected != null) {
      cardSetValue[i].isShown = 1

      // checking if the pre-selected card is same as current selected card
      let checked = cardSetValue[i].label == cardSetValue[lastCardSelected].label
      if (checked) {
        cardSetValue[i].isShown = 2
        cardSetValue[lastCardSelected].isShown = 2
        setMatchFound(matchFound + 1)
        setOnpressAbled(true)
        setTotalAttempted(totalAttempted + 1)

      } else {
        setTimeout(() => {
          cardSetValue[i].isShown = 0
          cardSetValue[lastCardSelected].isShown = 0
          setTotalAttempted(totalAttempted + 1)
          setOnpressAbled(true)

        }, 1000);

      }
      setLastCardSelected(null)

    }
    else if (!lastCardSelected) {
      // should be called first
      cardSetValue[i].isShown = 1
      setLastCardSelected(i)
      setOnpressAbled(true)
      
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ width: "100%", height: "100%", }}>
        <View style={{ marginTop: "30%" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text> Total Attempted = {totalAttempted}</Text>
            </View>
            <View>
              <Text>  MatchFound = {matchFound}</Text>
            </View>
          </View>

          {matchFound == 8 ?
            <View style={{ marginTop: "10%", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "green" }}>You have completed in total {totalAttempted} attempted.</Text>
            </View> :
            <FlatList
              numColumns={4}
              data={cardSetValue}
              keyExtractor={(item, i) => i}
              renderItem={({ item, index }) => {
                // layoput for label
                return <TouchableWithoutFeedback onPress={onPressAbled && item.isShown == 0 ? () => handleOnpress(index) : null}><View style={{
                  borderColor: "red",
                  borderWidth: 2,
                  height: 120,
                  width: 120 / 2,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center", marginTop: 20,
                  backgroundColor: item.isShown == 1 ? "yellow" : item.isShown == 0 ? "teal" : item.isShown == 2 ? "green" : null
                }}>
                  <Text style={{ fontSize: 20, fontWeight: '900' }}>{item.isShown == 1 ? item.label : item.isShown == 0 ? "Tap" : item.isShown == 2 ? "Matched" : null}</Text>
                </View>
                </TouchableWithoutFeedback>

              }}
            />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
});
