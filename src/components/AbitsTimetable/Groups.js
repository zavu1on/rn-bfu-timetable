import React from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { TextRegular } from '../../components/ui/Text'
import { THEME } from '../../theme'
import screenManager from '../../store/screenManager'

export const Groups = ({ _item }) => {
  const institutTitle = _item.title
  const item = Object.entries(_item).filter(el => {
    if (el[0] === 'idx') return false
    if (el[0] === 'active') return false
    if (el[0] === 'title') return false
    return el
  })

  const clickHandler = groupTitle => {
    screenManager.navigate('AbitsTimetable', {
      institutTitle,
      groupTitle,
    })
  }

  const rows = []
  item.forEach((el, idx) => {
    if (idx % 2 === 0) rows.push([])
    const res = {
      title: el[0],
      groups: el[1],
    }
    rows[rows.length - 1].push(res)
  })

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              {item.map(el => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.item}
                    key={`${el.title}`}
                    onPress={() => clickHandler(el.title)}
                  >
                    <TextRegular style={styles.title}>{el.title}</TextRegular>
                  </TouchableOpacity>
                )
              })}
            </View>
          )
        }}
        keyExtractor={item => item.title}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  item: {
    backgroundColor: THEME.SECONDARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    width: 156,
    height: 40,
    marginTop: 8,
  },

  title: {
    fontSize: 16,
    color: '#fff',
    width: 156,
    textAlign: 'center',
    margin: 2,
  },

  container: {
    marginTop: 22,
  },
})
