import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  DatePickerAndroid,
  Platform,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native'
import { Header } from '../../components/Header'
import { TextRegular, TextBold } from '../../components/ui/Text'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import screenManager from '../../store/screenManager'
import abitsTimetable from '../../store/abitsTimetable'
import { THEME } from '../../theme'

export const TimetableScreen = () => {
  const institutTitle = screenManager.getParam('institutTitle')
  const groupTitle = screenManager.getParam('groupTitle')
  const TLTitle = screenManager.getParam('item')
  const [date, setDate] = useState(new Date(Date.now()))
  const [timetable, setTimetable] = useState(
    abitsTimetable
      .getTimetable(TLTitle, institutTitle, groupTitle)
      .filter(el => {
        return (
          el.date.getDate() === date.getDate() &&
          el.date.getMonth() === date.getMonth() &&
          el.date.getFullYear() === date.getFullYear()
        )
      })
  )
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ]
  const month = [
    'Января',
    'Февраля',
    'Март',
    'Апреля',
    'Май',
    'Июня',
    'Июля',
    'Август',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ]

  const showDatePicker = async () => {
    if (Platform.OS === 'android') {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date,
        })
        if (action !== DatePickerAndroid.dismissedAction) {
          setDate(new Date(year, month, day))
          setTimetable(
            abitsTimetable
              .getTimetable(TLTitle, institutTitle, groupTitle)
              .filter(el => {
                return (
                  el.date.getDate() === day &&
                  el.date.getMonth() === month &&
                  el.date.getFullYear() === year
                )
              })
          )
        }
      } catch ({ code, message }) {
        Alert.alert(
          'Что-то пошло не так..',
          'Ошибка при открытии или введении данных: ' + message,
          [
            {
              text: 'Закрыть',
              style: 'cancel',
            },
          ]
        )
      }
    }
  }

  return (
    <ScrollView style={{ backgroundColor: THEME.GRAY_COLOR }}>
      <Header
        title='Расписание'
        prevLink='AbitsGroup'
        headerRight={
          <TouchableOpacity activeOpacity={0.8}>
            <AntDesign name='staro' size={25} color='white' />
          </TouchableOpacity>
        }
      />
      <View style={styles.titleContainer}>
        <TextRegular style={styles.title}>
          {date.getDate()} {month[date.getMonth()]}, {days[date.getDay()]}
        </TextRegular>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={showDatePicker}
        >
          <MaterialIcons name='date-range' size={24} color='white' />
        </TouchableOpacity>
      </View>
      <View style={styles.timetableContainer}>
        <FlatList
          data={timetable}
          keyExtractor={item => `${item.title}${Math.random()}`}
          renderItem={({ item }) => {
            return (
              <View style={styles.timetable}>
                <View style={styles.left}>
                  <View style={styles.textLeft}>
                    <TextBold style={{ color: '#fff' }}>
                      {item.startTime}
                    </TextBold>
                    <TextRegular style={{ color: '#fff' }}>
                      {item.endTime}
                    </TextRegular>
                  </View>
                </View>
                <View style={styles.right}>
                  <TextRegular style={styles.type}>{item.type}</TextRegular>
                  <TextRegular style={styles.ttTitle}>{item.title}</TextRegular>
                  <View style={styles.footer}>
                    <TextRegular style={{ fontSize: 12 }}>
                      {item.teacher}
                    </TextRegular>
                    <TextRegular style={{ fontSize: 12 }}>
                      {item.place}
                    </TextRegular>
                  </View>
                </View>
              </View>
            )
          }}
        />
      </View>
      <View style={{ height: 20 }}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 20,
  },

  button: {
    backgroundColor: THEME.MAIN_COLOR,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  timetableContainer: {
    marginTop: 8,
    backgroundColor: THEME.GRAY_COLOR,
    height: '100%',
  },

  timetable: {
    flexDirection: 'row',
    marginTop: 8,
    height: 138,
    paddingHorizontal: 16,
  },

  left: {
    backgroundColor: THEME.MAIN_COLOR,
    width: 70,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLeft: {
    flexDirection: 'column',
  },

  right: {
    width: Dimensions.get('window').width - 70 - 32,
    backgroundColor: '#fff',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },

  type: {
    color: '#fff',
    backgroundColor: THEME.SECONDARY_COLOR,
    fontSize: 11,
    width: 70,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },

  ttTitle: {
    marginTop: 2,
    marginLeft: 16,
    width: 220,
  },

  footer: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
})